import React from "react";
import NumberDropdown from "../../../lib/Dropdown/NumberDropdown";
import { useQuery } from "react-query";
import { UserCompetenceAssessment } from "../../../../types/Data.types";
import {
    addAssessmentForCompetence,
    fetchLatestAssessmentForCompetence,
} from "../../../../service/data/UserCompetenceAssessment.service";
import { useIsAuthenticated } from "../../../../hooks/Auth.hooks";

interface SelfAssessmentDropdownProps {
    competenceId?: number;
    displayValue?: number;
    onUpdate?: () => void;
}

const SelfAssessmentDropdown: React.FC<SelfAssessmentDropdownProps> = ({ competenceId, displayValue, onUpdate }) => {
    const isValidId = typeof competenceId === "number" && !isNaN(competenceId);
    const { isAuthenticated } = useIsAuthenticated();

    const { data: initialAssessment, refetch } = useQuery<UserCompetenceAssessment | null>({
        queryKey: ["competenceAssessment", competenceId],
        queryFn: () => fetchLatestAssessmentForCompetence(competenceId!),
        enabled: isAuthenticated && (isValidId && displayValue == null),
    });

    async function updateAssessment(newValue: number) {
        if (!isValidId) return;
        
        if(initialAssessment?.assessmentValue == newValue) {
            return;
        }

        await addAssessmentForCompetence({
            competenceId: competenceId!,
            assessmentValue: newValue,
        });

        refetch();
        if(onUpdate) onUpdate();
    };

    if (displayValue != null) {
        return <NumberDropdown initial={displayValue} display={true} />;
    }

    if (!isValidId) {
        return <span className="text-error text-sm">Invalid competence ID</span>;
    }

    return (
        <NumberDropdown
            initial={initialAssessment?.assessmentValue}
            onChange={updateAssessment}
        />
    );
};

export default SelfAssessmentDropdown;
