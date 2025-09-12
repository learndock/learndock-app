import React, { useState } from "react";
import { BiBook, BiChevronDown, BiChevronRight } from "react-icons/bi";
import { QuestionSet } from "../../../../types/Content.types";
import { CatalogTreeTableTopics } from "./CatalogTreeTableTopics";
import QuestionSetRegulationLocation from "./QuestionSetRegulationLocation";
import IconButton from "../../../lib/Buttons/IconButton";
import { Tooltip } from "react-tooltip";
import { useLang } from "../../../../hooks/Language.hooks";

interface CatalogTreeTableProps {
  questionSets: QuestionSet[];
}

export const CatalogTreeTable: React.FC<CatalogTreeTableProps> = ({ questionSets }) => {
  const lang = useLang();
  const [expandedRows, setExpandedRows] = useState<Record<string | number, boolean>>({});

  const toggleRow = (id: string | number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderExpandIcon = (expanded: boolean) => (
    <span className="mr-2 text-accent">{expanded ? <BiChevronDown /> : <BiChevronRight />}</span>
  );

  const onExampleClick = (e: React.MouseEvent<HTMLButtonElement>, questionSetId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Example clicked:", questionSetId);
  }

  return (
    <div className="max-h-full border border-borders overflow-y-auto">
      <table className="w-full text-left text-text-primary border-collapse">
        <thead className="bg-cards sticky top-0 z-10">
          <tr>
            <th className="p-3 border-b border-borders">{lang("CATALOG_DETAIL_QUESTION_SET_TITLE")}</th>
            <th className="p-3 border-b border-borders">{lang("CATALOG_DETAIL_LOCATION")}</th>
            <th className="p-3 border-b border-borders">{lang("CATALOG_DETAIL_LEARNING_FIELDS")}</th>
            <th className="p-3 border-b border-borders"></th>
          </tr>
        </thead>
        <tbody>
          {questionSets.map(qs => {
            const qsExpanded = !!expandedRows[qs.id];
            return (
              <React.Fragment key={qs.id}>
                <tr
                  className="cursor-pointer hover:bg-background transition border-t border-borders"
                  onClick={() => toggleRow(qs.id)}
                  style={{ backgroundColor: "var(--color-cards)" }}
                >
                  <td className="p-3 flex items-center">{renderExpandIcon(qsExpanded)}{qs.title}</td>
                  <td className="p-3"><QuestionSetRegulationLocation location={qs.locationInRegulation || ""} /></td>
                  <td className="p-3">{qs.relatedLearningFields?.join(", ") || "-"}</td>
                  <td className="p-3">
                    {qs.examples.length > 0 && (
                      <div className="cursor-pointer">
                        <IconButton icon={<BiBook />} aria-label="View Examples" onClick={(e) => onExampleClick(e, qs.id)} data-tooltip-id="view-qs-examples" />
                        <Tooltip place="left" id="view-qs-examples">{lang("CATALOG_DETAIL_QUESTION_SET_VIEW_EXAMPLES")}</Tooltip>
                      </div>
                    )}
                  </td>
                </tr>
                {qsExpanded && <CatalogTreeTableTopics questionSet={qs} />}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>

  );

};
