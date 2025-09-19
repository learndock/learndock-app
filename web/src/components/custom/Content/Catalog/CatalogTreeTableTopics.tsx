import React, { useEffect, useState } from "react";
import { BiCheck, BiChevronDown, BiChevronRight, BiEdit, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { useQuery } from "react-query";
import { useLang } from "../../../../hooks/Language.hooks";
import { addTopic, getTopicsForQuestionSet, updateTopic } from "../../../../service/content/Topic.service";
import { QuestionSet, Topic } from "../../../../types/Content.types";
import IconButton from "../../../lib/Buttons/IconButton";
import { CatalogTreeTableCompetences } from "./CatalogTreeTableCompetences";
import { DeleteTopicModal } from "./Modals/DeleteTopicModal";

interface CatalogTreeTableTopicsProps {
  questionSet: QuestionSet;
  tryNavigateToTopic?: number;
  editMode: boolean;
}

export const CatalogTreeTableTopics: React.FC<CatalogTreeTableTopicsProps> = ({
  questionSet,
  tryNavigateToTopic,
  editMode
}) => {
  const lang = useLang();
  const { data: topics = [], refetch } = useQuery<Topic[]>(["questionSetTopics", questionSet.id], () =>
    getTopicsForQuestionSet(questionSet.id)
  );

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [newTopic, setNewTopic] = useState<Partial<Topic>>({ title: "" });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetTopicId, setTargetTopicId] = useState<number | null>(null);

  const [editingTopicId, setEditingTopicId] = useState<number | null>(null);
  const [editingTopicValues, setEditingTopicValues] = useState<Partial<Topic>>({});

  useEffect(() => {
    if (tryNavigateToTopic && topics.some(t => t.id === tryNavigateToTopic)) {
      const event = new CustomEvent("toggleTopic", { detail: { questionSetId: questionSet.id } });
      window.dispatchEvent(event);
    }
  }, [tryNavigateToTopic, topics, questionSet]);

  const toggleRow = (topicId: number) => {
    setExpandedRows(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const startEdit = (topic: Topic) => {
    setEditingTopicId(topic.id);
    setEditingTopicValues({ title: topic.title });
  };

  const cancelEdit = () => {
    setEditingTopicId(null);
    setEditingTopicValues({});
  };

  const saveEdit = async (id: number) => {
    await updateTopic(id, editingTopicValues);
    setEditingTopicId(null);
    setEditingTopicValues({});
    refetch();
  };

  const handleAddTopic = async () => {
    if (!newTopic.title?.trim()) return;
    await addTopic({ questionSetId: questionSet.id, title: newTopic.title });
    setNewTopic({ title: "" });
    refetch();
  };

  const confirmDeleteTopic = (topicId: number) => {
    setTargetTopicId(topicId);
    setIsDeleteModalOpen(true);
  };

  const renderExpandIcon = (expanded: boolean) => (
    <span className="mr-2 text-accent">{expanded ? <BiChevronDown /> : <BiChevronRight />}</span>
  );

  return (
    <>
      {editMode && (
        <tr className="border-t border-b border-borders bg-background">
          <td className="p-3 pl-8">
            <input
              type="text"
              placeholder={lang("TOPIC_ADD_TITLE")}
              className="w-full bg-transparent border-b border-borders outline-none"
              value={newTopic.title || ""}
              onChange={e => setNewTopic({ title: e.target.value })}
            />
          </td>
          <td></td>
          <td></td>
          <td className="p-3">
            <IconButton icon={<BiPlus />} aria-label="Add Topic" onClick={handleAddTopic} />
          </td>
        </tr>
      )}

      {topics.map(topic => {
        const topicExpanded = !!expandedRows[topic.id];
        const isEditing = editingTopicId === topic.id;

        return (
          <React.Fragment key={topic.id}>
            <tr
              className="cursor-pointer hover:bg-background transition border-t border-borders"
              onClick={() => !isEditing && toggleRow(topic.id)}
            >
              <td className="p-3 flex items-center pl-8">
                {!isEditing && renderExpandIcon(topicExpanded)}
                {isEditing ? (
                  <input
                    type="text"
                    value={editingTopicValues.title || ""}
                    className="w-full bg-transparent border-b border-borders outline-none"
                    onChange={e => setEditingTopicValues(prev => ({ ...prev, title: e.target.value }))}
                  />
                ) : (
                  topic.title
                )}
              </td>
              <td></td>
              <td></td>
              <td className="p-3 flex flex-row">
                {editMode && (isEditing ? (
                  <>
                    <IconButton
                      icon={<BiCheck />}
                      aria-label="Save"
                      onClick={e => { e.stopPropagation(); saveEdit(topic.id); }}
                    />
                    <IconButton
                      icon={<BiX />}
                      aria-label="Cancel"
                      onClick={e => { e.stopPropagation(); cancelEdit(); }}
                    />
                  </>
                ) : (
                  <>
                    <IconButton
                      icon={<BiEdit />}
                      aria-label="Edit Topic"
                      onClick={e => { e.stopPropagation(); startEdit(topic); }}
                    />
                    <IconButton
                      icon={<BiTrash />}
                      aria-label="Delete Topic"
                      onClick={e => { e.stopPropagation(); confirmDeleteTopic(topic.id); }}
                    />
                  </>
                ))}
              </td>
            </tr>

            {topicExpanded && !isEditing && (
              <CatalogTreeTableCompetences
                topicId={topic.id}
                competences={topic.competences}
                editMode={editMode}
                refetch={refetch}
              />
            )}
          </React.Fragment>
        );
      })}

      <DeleteTopicModal
        isOpen={isDeleteModalOpen}
        topicId={targetTopicId ?? -1}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTargetTopicId(null);
          refetch();
        }}
      />
    </>
  );
};
