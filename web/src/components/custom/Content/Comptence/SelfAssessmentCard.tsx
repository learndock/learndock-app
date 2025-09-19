import { useState } from "react";
import { Competence } from "../../../../types/Content.types";
import SelfAssessmentDropdown from "./SelfAssessmentDropdown";
import { useQuery } from "react-query";
import { fetchAssessmentsForCompetence } from "../../../../service/data/UserCompetenceAssessment.service";
import { UserCompetenceAssessment } from "../../../../types/Data.types";
import { formatDateFromIsoString } from "../../../../utils/Formatting.utils";
import { useLang } from "../../../../hooks/Language.hooks";
import { useIsAuthenticated } from "../../../../hooks/Auth.hooks";

interface SelfAssessmentCardProps {
    competence: Competence;
    editMode: boolean,
}

const SelfAssessmentCard: React.FC<SelfAssessmentCardProps> = ({ competence, editMode }) => {
    const lang = useLang();
    const { isAuthenticated } = useIsAuthenticated();

    const [showHistory, setShowHistory] = useState(false);

    const { data: history, refetch: refetchHistory } = useQuery<UserCompetenceAssessment[]>({
        queryKey: "competence-history" + competence.id,
        queryFn: () => fetchAssessmentsForCompetence(competence.id),
        enabled: isAuthenticated
    })

    if (!isAuthenticated) {
        return (
            <div className="bg-cards text-text-primary border border-borders rounded-xl shadow-md p-4 w-full">
                <h2 className="text-lg font-semibold mb-4">
                    {lang("COMPETENCE_SELF_ASSESSMENT")} {showHistory && `${lang("COMPETENCE_SELF_ASSESSMENT_HISTORY")}`}
                </h2>

                {lang("AUTH_LOGIN_TO_USE_FEATURE")}
            </div>
        )
    }

    return (
        <div className="bg-cards text-text-primary border border-borders rounded-xl shadow-md p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">
                {lang("COMPETENCE_SELF_ASSESSMENT")} {showHistory && `${lang("COMPETENCE_SELF_ASSESSMENT_HISTORY")}`}
            </h2>

            {showHistory ? (
                <>
                    <div className="max-h-100 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-text-secondary">
                                    <th className="py-2">{lang("COMPETENCE_HISTORY_DATE")}</th>
                                    <th className="py-2">{lang("COMPETENCE_HISTORY_ASSESSMENT")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history?.map((h, i) => (
                                    <tr key={i}>
                                        <td className="py-1">{formatDateFromIsoString(h.assessmentDate)}</td>
                                        <td className="py-1">
                                            <SelfAssessmentDropdown displayValue={h.assessmentValue} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={() => setShowHistory(false)}
                        className="mt-4 text-accent hover:underline"
                    >
                        {lang("COMMON_BACK")}
                    </button>
                </>
            ) : (
                <>
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h2 className="font-bold text-text-primary">{lang("COMPETENCE_YOUR_CURRENT_ASSESSMENT")}</h2>
                            <p className="text-text-secondary italic">{lang("COMPETENCE_CLICK_TO_ADJUST")}</p>
                        </div>
                        <SelfAssessmentDropdown competenceId={competence.id} onUpdate={refetchHistory} />
                    </div>
                    {!editMode && (
                        <button
                            onClick={() => setShowHistory(true)}
                            className="mt-4 text-accent hover:underline"
                        >
                            {lang("COMPETENCE_SEE_HISTORY")}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default SelfAssessmentCard;
