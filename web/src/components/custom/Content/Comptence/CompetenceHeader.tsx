import React from "react";
import { Competence } from "../../../../types/Content.types";
import { HiOutlineClock } from "react-icons/hi";
import { formatDateFromIsoString } from "../../../../utils/Formatting.utils";

interface CompetenceHeaderProps {
    competence: Competence;
}

export const CompetenceHeader: React.FC<CompetenceHeaderProps> = ({ competence }) => {
    return (
        <header
            className="w-full rounded-2xl shadow-md border p-6 mb-6 bg-cards border-borders"
        >
            {/* Title */}
            <h1
                className="text-2xl font-semibold mb-2 text-text-primary"
            >
                {competence.title}
            </h1>

            {/* Description */}
            {competence.description && (
                <p
                    className="text-base mb-4 text-text-secondary"
                >
                    {competence.description}
                </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                {competence.updatedAt && (
                    <span className="flex items-center gap-2 px-3 py-1 bg-background rounded-md">
                        <HiOutlineClock /> {formatDateFromIsoString(competence.updatedAt)}
                    </span>
                )}
            </div>
        </header>
    );
};
