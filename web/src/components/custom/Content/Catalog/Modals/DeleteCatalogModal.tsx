import { FiTrash2 } from "react-icons/fi";
import { useCatalogs } from "../../../../../hooks/Content.hooks";
import { useLang } from "../../../../../hooks/Language.hooks";
import { Catalog } from "../../../../../types/Content.types";
import { Modal } from "../../../../lib/Modals/Modal";

interface DeleteCatalogModalProps {
  catalog: Catalog;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteCatalogModal = ({ catalog, isOpen, onClose }: DeleteCatalogModalProps) => {
  const lang = useLang();

  const { deleteMutation } = useCatalogs();

  const handleDelete = () => deleteMutation.mutate(catalog.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-text-primary">
        {lang("CATALOG_DELETE_TITLE")}
      </h2>
      <p className="text-text-secondary mb-6">
        {lang("CATALOG_DELETE_CONFIRM")}
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-borders text-text-secondary hover:bg-cards transition"
        >
          {lang("COMMON_CANCEL")}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isLoading}
          className="px-4 py-2 rounded-lg bg-error text-background hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
        >
          <FiTrash2 />
          {deleteMutation.isLoading ? lang("COMMON_DELETING") : lang("COMMON_DELETE")}
        </button>
      </div>
    </Modal>
  );
};
