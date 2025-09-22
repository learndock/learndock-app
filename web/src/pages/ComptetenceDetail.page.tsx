import { useEffect, useRef, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { CompetenceHeader } from "../components/custom/Content/Comptence/CompetenceHeader";
import SelfAssessmentCard from "../components/custom/Content/Comptence/SelfAssessmentCard";
import TopicsCard from "../components/custom/Content/Comptence/TopicsCard";
import { getCompetence, getTopics, updateCompetence } from "../service/content/Competence.service";
import { Competence, Topic } from "../types/Content.types";
import { validateNumberParam } from "../utils/URLParams.utils";
import ServerErrorPage from "./lib/ServerErrorPage";
import { useUser } from "../hooks/User.hooks";
import { RiLockUnlockFill } from "react-icons/ri";
import { useLang } from "../hooks/Language.hooks";
import ActionButton from "../components/lib/Buttons/Action.Button";
import { DeleteCompetenceModal } from "../components/custom/Content/Catalog/Modals/DeleteCompetenceModal";

export default function CompetenceDetailPage() {
    const navigate = useNavigate();
    const { user } = useUser();
    const lang = useLang();

    const { competenceIdParam, mode } = useParams();
    const competenceId = validateNumberParam("competenceId", competenceIdParam);
    const isEditMode = mode === "edit";

    const topicsCardRef = useRef<{ onParentSave: () => void }>(null);

    const { data: competenceData, isLoading: isCompetenceLoading, refetch: refetchCompetence } = useQuery<Competence>({
        queryKey: ["competence", competenceId],
        queryFn: () => getCompetence(competenceId)
    });
    const { data: topics, isLoading: isTopicLoading, refetch: refetchTopics } = useQuery<Topic[]>({
        queryKey: ["competence-topics", competenceId],
        queryFn: () => getTopics(competenceId)
    });

    const [competence, setCompetence] = useState<Competence | null>(null);
    const [originalCompetence, setOriginalCompetence] = useState<Competence | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (competenceData) {
            setCompetence(competenceData);
            setOriginalCompetence(competenceData);
        }
    }, [competenceData]);

    const handleSave = async () => {
        if (!competence) return;
        try {
            topicsCardRef.current?.onParentSave();
            const updated = await updateCompetence(competence.id, competence);
            setCompetence(updated);
            setOriginalCompetence(updated);
            navigate("/competence/" + competence.id);
            refetchCompetence();
        } catch (err) {
            console.error("Failed to update competence:", err);
        }
    };

    const handleCancel = () => {
        if (originalCompetence) {
            setCompetence(originalCompetence);
        }
        navigate(`/competence/${competenceId}`);
    };

    const isLoading = isCompetenceLoading || isTopicLoading;

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-text-primary" />
            </div>
        );
    }

    if (!competence || !topics) {
        return <ServerErrorPage message={"Unexpected error"} />;
    }

    if (isEditMode && !user?.roles.includes("MANAGE_CATALOGS")) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center text-center w-[80%] md:w-[50%] h-[50%] bg-cards shadow-lg rounded-2xl p-6">
                    <RiLockUnlockFill className="text-error text-6xl md:text-9xl mb-4" />
                    <h1 className="text-3xl md:text-6xl font-bold text-text-primary">{lang("ERROR_PAGE_ROLE_PROTECTED_TITLE")}</h1>
                    <p className="text-xl md:text-3xl pt-4 text-text-secondary">{lang("ERROR_PAGE_ROLE_PROTECTED_SUBTITLE")}</p>
                    <div className="mt-8 flex flex-row gap-2">
                        <ActionButton
                            onClick={() => navigate(`/competence/${competenceId}`)}
                            rel="noopener noreferrer"
                        >
                            Exit edit mode
                        </ActionButton>
                        <ActionButton
                            onClick={() => navigate("/")}
                            rel="noopener noreferrer"
                        >
                            Go Home
                        </ActionButton>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-12">
            <CompetenceHeader
                competence={competence}
                setCompetence={setCompetence}
                editMode={isEditMode}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={() => setIsDeleteModalOpen(true)}
            />
            <div className="flex flex-row gap-6 max-h-[30%]">
                <div className="w-[35%]">
                    <SelfAssessmentCard
                        competence={competence}
                        editMode={isEditMode}
                    />
                </div>
                <div className="w-[65%]">
                    <TopicsCard
                        competenceId={competence.id}
                        topics={topics}
                        refetchLinkedTopics={refetchTopics}
                        ref={topicsCardRef}
                        editMode={isEditMode}
                    />
                </div>
            </div>
            <DeleteCompetenceModal
                isOpen={isDeleteModalOpen}
                competenceId={competence.id}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    navigate("/competence");
                }}
            />
        </div>
    );
}
