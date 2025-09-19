import { FiTrash2 } from "react-icons/fi";
import { useLang } from "../../../../../hooks/Language.hooks";
import { removeQuestionSet } from "../../../../../service/content/QuestionSet.service";
import { Modal } from "../../../../lib/Modals/Modal";

interface DeleteQuestionSetModalProps {
  questionSetId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteQuestionSetModal = ({ questionSetId, isOpen, onClose }: DeleteQuestionSetModalProps) => {
  const lang = useLang();

  const handleDelete = async () => {
    await removeQuestionSet(questionSetId);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-text-primary">
        {lang("QUESTION_SET_DELETE_TITLE")}
      </h2>
      <p className="text-text-secondary mb-6">
        {lang("QUESTION_SET_DELETE_CONFIRM")}
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
          className="px-4 py-2 rounded-lg bg-error text-background hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
        >
          <FiTrash2 />
          {lang("COMMON_DELETE")}
        </button>
      </div>
    </Modal>
  );
};
