import { forwardRef, useImperativeHandle, useState } from "react";
import { BiBook, BiUnlink } from "react-icons/bi";
import { FiLink } from "react-icons/fi";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import { useLang } from "../../../../hooks/Language.hooks";
import { useUser } from "../../../../hooks/User.hooks";
import { getCatalogForTopic } from "../../../../service/content/Topic.service";
import { setStorageValue } from "../../../../core/StorageProvider";
import { Catalog, Topic } from "../../../../types/Content.types";
import IconButton from "../../../lib/Buttons/IconButton";
import LinkTopicModal from "../Topic/LinkTopicModal";
import { linkTopicToCompetence, unlinkTopicFromCompetence } from "../../../../service/content/Competence.service";

interface TopicsCardProps {
  topics: Topic[];
  competenceId: number;
  refetchLinkedTopics: () => void;
  editMode: boolean;
}

export interface TopicsCardHandle {
  onParentSave: () => void;
}

const TopicsCard = forwardRef<TopicsCardHandle, TopicsCardProps>(
  ({ topics, competenceId, refetchLinkedTopics, editMode }, ref) => {
    const navigate = useNavigate();
    const lang = useLang();
    const user = useUser();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    async function navigateToCatalog(topic: Topic) {
      const catalog: Catalog = await getCatalogForTopic(topic.id);
      setStorageValue("tryNavigateToTopic", topic.id);
      navigate(`/catalog/${catalog.id}`);
    }

    const onParentSave = () => {
      // no impl yet
    };

    async function linkTopic(topicId: number) {
      await linkTopicToCompetence(competenceId, topicId);
      refetchLinkedTopics();
    }

    async function unlinkTopic(topicId: number) {
      await unlinkTopicFromCompetence(competenceId, topicId);
      refetchLinkedTopics();
    }

    useImperativeHandle(ref, () => ({
      onParentSave,
    }));

    return (
      <div className="bg-cards text-text-primary border border-borders rounded-xl shadow-md p-4 w-full">
        <h2 className="text-lg font-semibold mb-4">
          {lang("COMPETENCE_TOPICS_CONTAINING_COMPETENCE")}
        </h2>

        {/* Scrollable table container */}
        <div className="overflow-y-auto max-h-80">
          <table className="w-full table-auto border-collapse">
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.id} className="hover:bg-background/10 transition-colors">
                  <td className="py-2 px-3">{topic.title}</td>
                  <td className="py-2 px-3 text-right">
                    <div className="cursor-pointer inline-block">
                      <IconButton
                        icon={<BiBook />}
                        data-tooltip-id={`view-catalog-tooltip-${topic.id}`}
                        aria-label={lang("COMPETENCE_TOPICS_VIEW_CATALOG")}
                        onClick={() => navigateToCatalog(topic)}
                        className="text-accent hover:text-accent/80"
                      />
                      <Tooltip
                        id={`view-catalog-tooltip-${topic.id}`}
                        place="left"
                        content={lang("COMPETENCE_TOPICS_VIEW_CATALOG")}
                      />
                    </div>
                    {editMode && user.user?.roles.includes("MANAGE_COMPETENCES") && (
                      <div className="cursor-pointer inline-block">
                        <IconButton
                          icon={<BiUnlink />}
                          data-tooltip-id={`unlink-topic-tooltip-${topic.id}`}
                          aria-label={lang("COMMON_UNLINK")}
                          onClick={() => unlinkTopic(topic.id)}
                          className="text-accent hover:text-accent/80"
                        />
                        <Tooltip
                          id={`unlink-topic-tooltip-${topic.id}`}
                          place="left"
                          content={lang("COMMON_UNLINK")}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {topics.length === 0 && (
                <tr key="no-topics-row" className="hover:bg-background/10 transition-colors">
                  <td className="py-2 px-3">{lang("COMPETENCE_TOPICS_NO_TOPICS")}</td>
                  <td />
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Button stays outside the scrollable area */}
        {editMode && user.user?.roles.includes("MANAGE_COMPETENCES") && (
          <div className="flex justify-end mt-4">
            <button
              className="px-5 py-2 rounded-lg bg-accent text-background font-semibold shadow hover:bg-primary-dark transition flex flex-row items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <FiLink className="inline mr-2" />
              {lang("COMMON_LINK")}
            </button>
          </div>
        )}

        <LinkTopicModal
          excludedTopics={topics}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          competenceId={competenceId}
          onLink={(_compId, topicId) => {
            linkTopic(topicId);
          }}
        />
      </div>

    );
  }
);

export default TopicsCard;
