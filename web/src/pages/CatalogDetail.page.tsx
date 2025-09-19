import { FiBookOpen, FiChevronLeft, FiLoader } from "react-icons/fi";
import { RiLockUnlockFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import CatalogDetailHeader from "../components/custom/Content/Catalog/CatalogDetailHeader";
import CatalogQuestionSetSection from "../components/custom/Content/Catalog/CatalogQuestionSetSection";
import { useLang } from "../hooks/Language.hooks";
import { useUser } from "../hooks/User.hooks";
import { getCatalog, updateCatalog } from "../service/content/Catalog.service";
import { getQuestionSetsForCatalog } from "../service/content/QuestionSet.service";
import { getStorageValue, setStorageValue } from "../storage/StorageProvider";
import { validateNumberParam } from "../utils/URLParams.utils";

export default function CatalogDetailPage() {
    const { catalogIdParam, mode } = useParams();
    const catalogId = validateNumberParam("catalogId", catalogIdParam);
    const isEditMode = mode === "edit";

    const lang = useLang();
    const navigate = useNavigate();
    const { user, isUserLoading } = useUser();
    const queryClient = useQueryClient();

    const stored = getStorageValue("tryNavigateToTopic");
    const navigateToTopic = stored && !isNaN(Number(stored)) ? Number(stored) : undefined;
    if (stored) setStorageValue("tryNavigateToTopic", "");

    const { data: catalog, isLoading: catalogLoading } = useQuery({
        queryKey: ["catalog", catalogId],
        queryFn: () => getCatalog(catalogId),
    });

    const { data: questionSets, isLoading: setsLoading, refetch: refetchQuestionSets } = useQuery({
        queryKey: ["catalogQuestionSets", catalogId],
        queryFn: () => getQuestionSetsForCatalog(catalogId),
        select: (sets) => sets.filter((qs) => qs.catalogId === catalogId),
    });

    const updateMutation = useMutation({
        mutationFn: async ({ title, description }: { title: string; description: string }) => {
            await updateCatalog(catalogId, { title, description })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["catalog", catalogId] }),
    });

    if (catalogLoading || setsLoading || isUserLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    if (!catalog) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center">
                <FiBookOpen className="text-5xl text-error mb-4" />
                <h2 className="text-2xl font-bold text-error mb-2">{lang("CATALOG_DETAIL_NOT_FOUND")}</h2>
                <button
                    className="mt-4 px-6 py-2 rounded bg-primary text-text-primary font-semibold shadow hover:bg-primary-dark transition hover:cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <FiChevronLeft className="inline mr-2" />
                    {lang("COMMON_BACK")}
                </button>
            </div>
        );
    }

    if (isEditMode && !user?.roles.includes("MANAGE_CATALOGS")) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center text-center w-[80%] md:w-[50%] h-[50%] bg-cards shadow-lg rounded-2xl p-6">
                    <RiLockUnlockFill className="text-error text-6xl md:text-9xl mb-4" />
                    <h1 className="text-3xl md:text-6xl font-bold text-text-primary">{lang("ERROR_PAGE_ROLE_PROTECTED_TITLE")}</h1>
                    <p className="text-xl md:text-3xl pt-4 text-text-secondary">{lang("ERROR_PAGE_ROLE_PROTECTED_SUBTITLE")}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-12 bg-gradient-to-br from-background via-cards to-background rounded-xl shadow-2xl flex flex-col">
            <CatalogDetailHeader
                catalog={catalog}
                editMode={isEditMode}
                onSave={updateMutation.mutate}
            />
            <div className="flex-1 overflow-hidden mt-6">
                <CatalogQuestionSetSection
                    catalogId={catalog.id}
                    questionSets={questionSets ?? []}
                    tryNavigateToTopic={navigateToTopic}
                    editMode={isEditMode}
                    refetch={{
                        refetchQuestionSets: () => refetchQuestionSets()
                    }}
                />
            </div>
        </div>
    );
}
