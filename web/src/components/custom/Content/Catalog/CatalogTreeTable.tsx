import React, { useState } from "react";
import { BiBook, BiCheck, BiChevronDown, BiChevronRight, BiEdit, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { useLang } from "../../../../hooks/Language.hooks";
import { addQuestionSet, updateQuestionSet } from "../../../../service/content/QuestionSet.service";
import { CreateQuestionSetRequest, QuestionSet } from "../../../../types/Content.types";
import IconButton from "../../../lib/Buttons/IconButton";
import { CatalogTreeTableTopics } from "./CatalogTreeTableTopics";
import { DeleteQuestionSetModal } from "./Modals/DeleteQuestionSetModal";
import QuestionSetRegulationLocation from "./QuestionSetRegulationLocation";

interface CatalogTreeTableProps {
  catalogId: number;
  questionSets: QuestionSet[];
  tryNavigateToTopic?: number;
  refetch: { refetchQuestionSets: () => void };
  editMode: boolean;
}

export const CatalogTreeTable: React.FC<CatalogTreeTableProps> = ({ catalogId, questionSets, tryNavigateToTopic, editMode, refetch }) => {
  const lang = useLang();
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [newSet, setNewSet] = useState<Partial<QuestionSet>>({ title: "", locationInRegulation: "", relatedLearningFields: [] });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetQuestionSetId, setTargetQuestionSetId] = useState<number | null>(null);
  const [editingQsId, setEditingQsId] = useState<number | null>(null);
  const [editingQsValues, setEditingQsValues] = useState<Partial<QuestionSet>>({});

  const toggleRow = (id: number) => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

  const startEdit = (qs: QuestionSet) => {
    setEditingQsId(qs.id);
    setEditingQsValues({
      title: qs.title,
      locationInRegulation: qs.locationInRegulation,
      relatedLearningFields: qs.relatedLearningFields || [],
    });
  };

  const cancelEdit = () => {
    setEditingQsId(null);
    setEditingQsValues({});
  };

  const saveEdit = async (id: number) => {
    await updateQuestionSet(id, editingQsValues);
    setEditingQsId(null);
    setEditingQsValues({});
    refetch.refetchQuestionSets();
  };

  const handleAdd = async () => {
    if (!newSet.title?.trim()) return;

    const payload: CreateQuestionSetRequest = {
      catalogId,
      title: newSet.title!.trim(),
      locationInRegulation: newSet.locationInRegulation?.trim(),
      relatedLearningFields: newSet.relatedLearningFields || [],
    };

    await addQuestionSet(payload);
    setNewSet({ title: "", locationInRegulation: "", relatedLearningFields: [] });
    refetch.refetchQuestionSets();
  };

  const handleDelete = (id: number) => {
    setTargetQuestionSetId(id);
    setIsDeleteModalOpen(true);
  };

  const renderExpandIcon = (expanded: boolean) => (
    <span className="mr-2 text-accent">{expanded ? <BiChevronDown /> : <BiChevronRight />}</span>
  );

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
          {editMode && (
            <tr className="border-t border-borders bg-background">
              <td className="p-3">
                <input
                  type="text"
                  placeholder={lang("QUESTION_SET_ADD_TITLE")}
                  className="w-full bg-transparent border-b border-borders outline-none"
                  value={newSet.title || ""}
                  onChange={e => setNewSet(prev => ({ ...prev, title: e.target.value }))}
                />
              </td>
              <td className="p-3">
                <input
                  type="text"
                  placeholder={lang("CATALOG_DETAIL_LOCATION")}
                  className="w-full bg-transparent border-b border-borders outline-none"
                  value={newSet.locationInRegulation || ""}
                  onChange={e => setNewSet(prev => ({ ...prev, locationInRegulation: e.target.value }))}
                />
              </td>
              <td className="p-3">
                <input
                  type="text"
                  placeholder={lang("CATALOG_DETAIL_LEARNING_FIELDS")}
                  className="w-full bg-transparent border-b border-borders outline-none"
                  value={newSet.relatedLearningFields?.join(", ") || ""}
                  onChange={e => setNewSet(prev => ({ ...prev, relatedLearningFields: e.target.value.split(",").map(f => f.trim()) }))}
                />
              </td>
              <td className="p-3">
                <IconButton icon={<BiPlus />} aria-label="Add" onClick={handleAdd} />
              </td>
            </tr>
          )}

          {questionSets.map(qs => {
            const qsExpanded = !!expandedRows[qs.id];
            const isEditing = editingQsId === qs.id;

            return (
              <React.Fragment key={qs.id}>
                <tr
                  className="cursor-pointer hover:bg-background transition border-t border-borders"
                  onClick={() => !isEditing && toggleRow(qs.id)}
                  style={{ backgroundColor: "var(--color-cards)" }}
                >
                  <td className="p-3 flex items-center">
                    {!isEditing && renderExpandIcon(qsExpanded)}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingQsValues.title || ""}
                        className="w-full bg-transparent border-b border-borders outline-none"
                        onChange={e => setEditingQsValues(prev => ({ ...prev, title: e.target.value }))}
                      />
                    ) : (
                      qs.title
                    )}
                  </td>
                  <td className="p-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingQsValues.locationInRegulation || ""}
                        className="w-full bg-transparent border-b border-borders outline-none"
                        onChange={e => setEditingQsValues(prev => ({ ...prev, locationInRegulation: e.target.value }))}
                      />
                    ) : (
                      <QuestionSetRegulationLocation location={qs.locationInRegulation || ""} />
                    )}
                  </td>
                  <td className="p-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingQsValues.relatedLearningFields?.join(", ") || ""}
                        className="w-full bg-transparent border-b border-borders outline-none"
                        onChange={e => setEditingQsValues(prev => ({ ...prev, relatedLearningFields: e.target.value.split(",").map(f => f.trim()) }))}
                      />
                    ) : (
                      qs.relatedLearningFields?.join(", ") || "-"
                    )}
                  </td>
                  <td className="p-3 flex flex-row">
                    {qs.examples.length > 0 && !isEditing && (
                      <IconButton
                        icon={<BiBook />}
                        aria-label="View Examples"
                        onClick={e => { e.stopPropagation(); console.log("Example clicked", qs.id); }}
                      />
                    )}
                    {editMode && (isEditing ? (
                      <>
                        <IconButton icon={<BiCheck />} aria-label="Save" onClick={e => { e.stopPropagation(); saveEdit(qs.id); }} />
                        <IconButton icon={<BiX />} aria-label="Cancel" onClick={e => { e.stopPropagation(); cancelEdit(); }} />
                      </>
                    ) : (
                      <>
                        <IconButton icon={<BiEdit />} aria-label="Edit" onClick={e => { e.stopPropagation(); startEdit(qs); }} />
                        <IconButton icon={<BiTrash />} aria-label="Delete" onClick={e => { e.stopPropagation(); handleDelete(qs.id); }} />
                      </>
                    ))}
                  </td>
                </tr>
                {qsExpanded && !isEditing && (
                  <CatalogTreeTableTopics
                    editMode={editMode}
                    questionSet={qs}
                    tryNavigateToTopic={tryNavigateToTopic}
                  />
                )}
              </React.Fragment>
            );
          })}

          {questionSets.length === 0 && (
            <tr className="border-t border-borders">
              <td className="p-3"> {lang("CATALOG_DETAIL_NO_QUESTION_SETS")} </td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
            </tr>
          )}
        </tbody>
      </table>

      <DeleteQuestionSetModal
        isOpen={isDeleteModalOpen}
        questionSetId={targetQuestionSetId ?? -1}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTargetQuestionSetId(null);
          refetch.refetchQuestionSets();
        }}
      />
    </div>
  );
};
