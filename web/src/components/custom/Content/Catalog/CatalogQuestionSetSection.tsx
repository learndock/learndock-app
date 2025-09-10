import { useState } from "react";
import { useLang } from "../../../../hooks/Language.hooks";
import { QuestionSet } from "../../../../types/Content.types";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import QuestionSetRegulationLocation from "./QuestionSetRegulationLocation";

interface CatalogQuestionSetSectionProps {
    questionSets: QuestionSet[];
}

export default function CatalogQuestionSetSection({ questionSets }: CatalogQuestionSetSectionProps) {
    const lang = useLang();

    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };
    
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">{lang("CATALOG_DETAIL_QUESTION_SETS")}</h2>
            {questionSets.length === 0 ? (
                <div className="text-text-tertiary italic">{lang("CATALOG_DETAIL_NO_QUESTION_SETS")}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-borders rounded-xl overflow-hidden">
                        <thead className="bg-cards text-left">
                            <tr>
                                <th className="p-3">{lang("CATALOG_DETAIL_QUESTION_SET_TITLE")}</th>
                                <th className="p-3">{lang("CATALOG_DETAIL_LOCATION")}</th>
                                <th className="p-3">{lang("CATALOG_DETAIL_FIELDS")}</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {questionSets.map(qs => (
                                <>
                                    <tr key={qs.id} className="border-t border-borders hover:bg-background transition">
                                        <td className="p-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand(qs.id)}>
                                            {expanded[qs.id] ? <FiChevronDown /> : <FiChevronRight />}
                                            <span className="font-semibold text-primary">{qs.title}</span>
                                        </td>
                                        <td className="p-3 text-text-secondary"><QuestionSetRegulationLocation location={qs.locationInRegulation || ""} /></td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-2">
                                                {qs.relatedLearningFields?.map((field, idx) => (
                                                    <span key={idx} className="px-2 py-1 rounded bg-primary-light text-primary text-xs font-medium">
                                                        {field}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    {expanded[qs.id] && (
                                        <tr className="bg-background border-t border-borders">
                                            <td colSpan={4} className="p-4 text-sm text-text-secondary">
                                                {qs.title || lang("CATALOG_DETAIL_NO_DESCRIPTION")}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
