import { useLang } from "../../../../hooks/Language.hooks";
import { QuestionSet } from "../../../../types/Content.types";
import { CatalogTreeTable } from "./CatalogTreeTable";

interface CatalogQuestionSetSectionProps {
    catalogId: number;
    questionSets: QuestionSet[];
    tryNavigateToTopic?: number;
    refetch: {
        refetchQuestionSets: () => void;
    }
    editMode: boolean;
}

export default function CatalogQuestionSetSection({ catalogId, questionSets, tryNavigateToTopic, editMode, refetch }: CatalogQuestionSetSectionProps) {
    const lang = useLang();

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-text-primary mb-6">{lang("CATALOG_DETAIL_QUESTION_SETS")}</h2>
            <div className="flex-1 overflow-hidden">
                <CatalogTreeTable catalogId={catalogId} questionSets={questionSets} tryNavigateToTopic={tryNavigateToTopic} refetch={refetch} editMode={editMode} />
            </div>
        </div>
    );
}
