import { useParams } from "react-router";
import { validateNumberParam } from "../utils/URLParams.utils";
import { CompetenceHeader } from "../components/custom/Content/Comptence/CompetenceHeader";
import { useQuery } from "react-query";
import { getCompetence } from "../service/content/Competence.service";
import { Competence } from "../types/Content.types";
import { FiLoader } from "react-icons/fi";
import ServerErrorPage from "./lib/ServerErrorPage";

export default function CompetenceDetailPage() {
    const { competenceIdParam } = useParams();
    const competenceId = validateNumberParam("competenceId", competenceIdParam);

    const { data: competence, isLoading } = useQuery<Competence>({ queryFn: () => getCompetence(competenceId) })

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <FiLoader className="animate-spin text-4xl text-text-primary" />
            </div>
        );
    }

    if(!competence) {
        return <ServerErrorPage message={"Unexpected error"} />;
    }

    return (
        <div className="h-full px-6 py-12 sm:px-6 md:px-12">
            <CompetenceHeader competence={competence} />
        </div>
    );
}
