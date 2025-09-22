import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addCatalog } from "../../../../../service/content/Catalog.service";
import { Catalog } from "../../../../../types/Content.types";
import { Modal } from "../../../../lib/Modals/Modal";
import { useLang } from "../../../../../hooks/Language.hooks";

interface AddCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCatalogModal = ({ isOpen, onClose }: AddCatalogModalProps) => {
  const queryClient = useQueryClient();
  const lang = useLang();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: (data: Partial<Catalog>) => addCatalog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogs"] });
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
      <h2 className="text-xl font-semibold mb-4 text-text-primary">{lang("CATALOG_ADD_TITLE")}</h2>
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
