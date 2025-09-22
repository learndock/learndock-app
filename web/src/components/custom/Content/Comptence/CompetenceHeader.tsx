import React from "react";
import { FiEdit2, FiSave, FiTrash, FiX } from "react-icons/fi";
import { HiOutlineClock } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useLang } from "../../../../hooks/Language.hooks";
import { Competence } from "../../../../types/Content.types";
import { formatDateFromIsoString } from "../../../../utils/Formatting.utils";
import { useUser } from "../../../../hooks/User.hooks";

interface CompetenceHeaderProps {
    competence: Competence;
    setCompetence: React.Dispatch<React.SetStateAction<Competence | null>>;
    editMode: boolean;
    onSave: () => Promise<void>;
    onCancel: () => void;
    onDelete: () => void;
}

export const CompetenceHeader: React.FC<CompetenceHeaderProps> = ({
    competence,
    setCompetence,
    editMode,
    onSave,
    onCancel,
    onDelete
}) => {
    const navigate = useNavigate();
    const lang = useLang();

    const { user } = useUser();

    const handleTitleChange = (value: string) =>
        setCompetence((prev) => prev ? { ...prev, title: value } : prev);
    const handleDescriptionChange = (value: string) =>
        setCompetence((prev) => prev ? { ...prev, description: value } : prev);

    return (
        <header className="w-full rounded-2xl shadow-md border p-6 mb-6 bg-cards border-borders">
            <div className="flex flex-row justify-between items-start mb-2">
                {editMode ? (
                    <input
                        type="text"
                        className="text-2xl font-semibold mb-2 text-text-primary bg-transparent border-b border-borders focus:outline-none focus:ring-2 focus:ring-accent rounded px-4 w-full h-full mr-10 pb-2"
                        value={competence.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <h1 className="text-2xl font-semibold mb-2 text-text-primary">
                        {competence.title}
                    </h1>
                )}

                {user?.roles.includes("MANAGE_COMPETENCES") && (
                    <div className="flex flex-row items-center gap-2">
                        {editMode && (
                            <>
                                <button
                                    className="px-5 py-2 rounded-lg bg-secondary-accent text-text-primary font-semibold shadow cursor-pointer transition flex flex-row items-center"
                                    onClick={onCancel}
                                >
                                    <FiX className="inline mr-2" />
                                    {lang("COMMON_CANCEL")}
                                </button>
                                <button
                                    className="px-5 py-2 rounded-lg bg-error text-text-primary font-semibold shadow cursor-pointer transition flex flex-row items-center"
                                    onClick={onDelete}
                                >
                                    <FiTrash className="inline mr-2" />
                                    {lang("COMMON_DELETE")}
                                </button>
                            </>
                        )}
                        <button
                            className="px-5 py-2 rounded-lg bg-accent text-background font-semibold shadow cursor-pointer transition flex flex-row items-center"
                            onClick={() =>
                                editMode ? onSave() : navigate(`/competence/${competence.id}/edit`)
                            }
                        >
                            {editMode ? (
                                <>
                                    <FiSave className="inline mr-2" />
                                    {lang("COMMON_SAVE")}
                                </>
                            ) : (
                                <>
                                    <FiEdit2 className="inline mr-2" />
                                    {lang("COMMON_EDIT")}
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {editMode ? (
                <textarea
                    className="w-full text-base mb-4 text-text-secondary bg-transparent border border-borders rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                    value={competence.description ?? ""}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                />
            ) : (
                competence.description && (
                    <p className="text-base mb-4 text-text-secondary">{competence.description}</p>
                )
            )}

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
