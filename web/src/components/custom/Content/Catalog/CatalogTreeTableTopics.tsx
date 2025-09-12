import React, { useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { FiArrowUpRight } from "react-icons/fi";
import { useQuery } from "react-query";
import { Tooltip } from "react-tooltip";
import { useLang } from "../../../../hooks/Language.hooks";
import { getTopicsForQuestionSet } from "../../../../service/content/Topic.service";
import { Competence, QuestionSet, Topic } from "../../../../types/Content.types";
import IconButton from "../../../lib/Buttons/IconButton";
import { useNavigate } from "react-router";


interface CatalogTreeTableTopicsProps {
  questionSet: QuestionSet;
}

export const CatalogTreeTableTopics: React.FC<CatalogTreeTableTopicsProps> = ({ questionSet }) => {
  const lang = useLang();
  const navigate = useNavigate();

  const { data: topics = [] } = useQuery(["questionSetTopics", questionSet.id], () =>
    getTopicsForQuestionSet(questionSet.id)
  );

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (topicId: number) => {
    setExpandedRows(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

   const onCompetenceClick = (e: React.MouseEvent<HTMLButtonElement>, competenceId: number) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/competence/${competenceId}`);
    }

  const renderExpandIcon = (expanded: boolean) => (
    <span className="mr-2 text-accent">{expanded ? <BiChevronDown /> : <BiChevronRight />}</span>
  );

  return (
    <>
      {topics.map((topic: Topic) => {
        const topicExpanded = !!expandedRows[topic.id];
        return (
          <React.Fragment key={topic.id}>
            <tr
              className="cursor-pointer hover:bg-background transition border-t border-borders"
              onClick={() => toggleRow(topic.id)}
            >
              <td className="p-3 flex items-center pl-8">
                {renderExpandIcon(topicExpanded)}
                {topic.title}
              </td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
            </tr>

            {/* Competences */}
            {topicExpanded &&
              topic.competences.map((comp: Competence) => (
                <tr
                  key={comp.id}
                  className="border-t border-borders hover:bg-background transition bg-cards"
                >
                  <td className="p-3 flex items-center pl-16">{comp.title}</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <div className="cursor-pointer">
                      <IconButton icon={<FiArrowUpRight size={14} />} aria-label="View Competence" onClick={(e) => onCompetenceClick(e, comp.id)} data-tooltip-id="view-competence" />
                      <Tooltip place="left" id="view-competence">{lang("CATALOG_DETAIL_COMPETENCE_VIEW")}</Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
          </React.Fragment>
        );
      })}
    </>
  );
};
