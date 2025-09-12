import { useLang } from "../../../../hooks/Language.hooks";
import { QuestionSet } from "../../../../types/Content.types";
import { CatalogTreeTable } from "./CatalogTreeTable";

interface CatalogQuestionSetSectionProps {
    questionSets: QuestionSet[];
}

export default function CatalogQuestionSetSection({ questionSets }: CatalogQuestionSetSectionProps) {
    const lang = useLang();

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-text-primary mb-6">{lang("CATALOG_DETAIL_QUESTION_SETS")}</h2>
            {questionSets.length === 0 ? (
                <div className="text-text-tertiary italic">{lang("CATALOG_DETAIL_NO_QUESTION_SETS")}</div>
            ) : (
                <div className="flex-1 overflow-hidden">
                    <CatalogTreeTable questionSets={questionSets} />
                </div>
            )}
        </div>
    );
}
