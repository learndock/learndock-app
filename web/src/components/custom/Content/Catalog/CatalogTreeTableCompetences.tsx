import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { BiPlus, BiEdit, BiCheck, BiX, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Competence } from "../../../../types/Content.types";
import IconButton from "../../../lib/Buttons/IconButton";
import SelfAssessmentDropdown from "../Comptence/SelfAssessmentDropdown";
import { addCompetence, linkTopicToCompetence, updateCompetence } from "../../../../service/content/Competence.service";
import { DeleteCompetenceModal } from "./Modals/DeleteCompetenceModal";
import { useLang } from "../../../../hooks/Language.hooks";

interface CatalogTreeTableCompetencesProps {
  topicId: number;
  competences: Competence[];
  editMode: boolean;
  refetch: () => void;
}

export const CatalogTreeTableCompetences: React.FC<CatalogTreeTableCompetencesProps> = ({
  topicId,
  competences,
  editMode,
  refetch
}) => {
  const navigate = useNavigate();
  const lang = useLang();

  const [newCompetenceTitle, setNewCompetenceTitle] = useState("");
  const [editingCompetenceId, setEditingCompetenceId] = useState<number | null>(null);
  const [editingCompetenceValues, setEditingCompetenceValues] = useState<Partial<Competence>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetCompetenceId, setTargetCompetenceId] = useState<number | null>(null);

  const onCompetenceClick = (e: React.MouseEvent<HTMLButtonElement>, competenceId: number) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/competence/${competenceId}`);
  };

  const startEdit = (competence: Competence) => {
    setEditingCompetenceId(competence.id);
    setEditingCompetenceValues({ title: competence.title });
  };

  const cancelEdit = () => {
    setEditingCompetenceId(null);
    setEditingCompetenceValues({});
  };

  const saveEdit = async (id: number) => {
    await updateCompetence(id, editingCompetenceValues);
    setEditingCompetenceId(null);
    setEditingCompetenceValues({});
    refetch();
  };

  const handleAddCompetence = async () => {
    if (!newCompetenceTitle.trim()) return;
    const newComp = await addCompetence({ title: newCompetenceTitle });
    await linkTopicToCompetence(newComp.id, topicId)
    setNewCompetenceTitle("");
    refetch();
  };

  const confirmDeleteCompetence = (id: number) => {
    setTargetCompetenceId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {editMode && (
        <tr className="border-t border-borders bg-background">
          <td className="p-3 pl-16">
            <input
              type="text"
              placeholder={lang("COMPETENCE_ADD_TITLE")}
              className="w-full bg-transparent border-b border-borders outline-none"
              value={newCompetenceTitle}
              onChange={e => setNewCompetenceTitle(e.target.value)}
            />
          </td>
          <td></td>
          <td></td>
          <td className="p-3">
            <IconButton icon={<BiPlus />} aria-label="Add Competence" onClick={handleAddCompetence} />
          </td>
        </tr>
      )}

      {competences.map(comp => {
        const isEditing = editingCompetenceId === comp.id;

        return (
          <tr key={comp.id} className="border-t border-borders hover:bg-background transition bg-cards">
            <td className="p-3 flex items-center pl-16">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-borders outline-none"
                  value={editingCompetenceValues.title || ""}
                  onChange={e => setEditingCompetenceValues({ title: e.target.value })}
                />
              ) : (
                comp.title
              )}
            </td>
            <td></td>
            <td></td>
            <td className="p-3 flex flex-row">
              {editMode ? (isEditing ? (
                <>
                  <IconButton icon={<BiCheck />} aria-label="Save" onClick={() => saveEdit(comp.id)} />
                  <IconButton icon={<BiX />} aria-label="Cancel" onClick={cancelEdit} />
                </>
              ) : (
                <>
                  <IconButton icon={<BiEdit />} aria-label="Edit Competence" onClick={() => startEdit(comp)} />
                  <IconButton icon={<BiTrash />} aria-label="Delete Competence" onClick={() => confirmDeleteCompetence(comp.id)} />
                </>
              )) : (
                <div>
                  <SelfAssessmentDropdown competenceId={comp.id} />
                  <IconButton icon={<FiArrowUpRight size={14} />} aria-label="View Competence" onClick={e => onCompetenceClick(e, comp.id)} />
                </div>
              )}
            </td>
          </tr>
        );
      })}

      <DeleteCompetenceModal
        isOpen={isDeleteModalOpen}
        competenceId={targetCompetenceId ?? -1}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTargetCompetenceId(null);
          refetch();
        }}
      />
    </>
  );
};
