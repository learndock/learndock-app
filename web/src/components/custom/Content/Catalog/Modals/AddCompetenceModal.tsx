import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLang } from "../../../../../hooks/Language.hooks";
import { Competence } from "../../../../../types/Content.types";
import { addCompetence } from "../../../../../service/content/Competence.service";
import { Modal } from "../../../../lib/Modals/Modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddCompetenceModal = ({ isOpen, onClose }: Props) => {
    const lang = useLang();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const mutation = useMutation({
        mutationFn: (data: Partial<Competence>) => addCompetence(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["competences"] });
            setTitle("");
            setDescription("");
            onClose();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        mutation.mutate({ title, description });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4 text-text-primary">{lang("COMPETENCE_ADD_TITLE")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">{lang("COMMON_TITLE")}</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-borders bg-cards text-text-primary focus:outline-none focus:border-accent"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-text-secondary">{lang("COMMON_DESCRIPTION")}</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-borders bg-cards text-text-primary focus:outline-none focus:border-accent"
                        rows={3}
                    />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-borders text-text-secondary hover:bg-cards transition"
                    >
                        {lang("COMMON_CANCEL")}
                    </button>
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="px-4 py-2 rounded-lg bg-accent text-background hover:opacity-90 transition disabled:opacity-50"
                    >
                        {lang("COMMON_SAVE")}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
