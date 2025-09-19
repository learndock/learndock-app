import { useLang } from "../../../../hooks/Language.hooks";
import { Topic } from "../../../../types/Content.types";
import { Modal } from "../../../lib/Modals/Modal";
import TopicSearch from "./TopicSearch";


interface LinkTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    competenceId: number;
    excludedTopics?: Topic[];
    onLink: (competenceId: number, topicId: number) => void;
    catalogId?: number;
}

const LinkTopicModal = ({ isOpen, onClose, competenceId, onLink, catalogId, excludedTopics }: LinkTopicModalProps) => {
    const lang = useLang();

    const handleSelect = (topic: Topic) => {
        onLink(competenceId, topic.id);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">{lang("COMPETENCE_LINK_TOPICS_TITLE")}</h2>
            <p className="text-sm text-text-muted mb-4">
                {lang("COMPETENCE_LINK_TOPICS_SUBTITLE")}
            </p>
            <TopicSearch catalogId={catalogId} onSelect={handleSelect} excludedTopics={excludedTopics} />
        </Modal>
    );
};

export default LinkTopicModal;
