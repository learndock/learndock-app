import { useState, useMemo } from "react";
import { FiAlertTriangle, FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { searchTopics } from "../../../../service/content/Topic.service";
import { Topic } from "../../../../types/Content.types";
import { useLang } from "../../../../hooks/Language.hooks";

type Props = {
    catalogId?: number;
    onSelect?: (topic: Topic) => void;
    excludedTopics?: Topic[];
};

const TopicSearch = ({ catalogId, onSelect, excludedTopics = [] }: Props) => {
    const lang = useLang();

    const [query, setQuery] = useState("");

    const { data: topics = [] } = useQuery({
        queryKey: ["topics", query, catalogId],
        queryFn: () => searchTopics(query, catalogId),
        enabled: !!query
    });

    const filteredTopics = useMemo(() => {
        if (!excludedTopics.length) return topics;
        const excludedIds = new Set(excludedTopics.map((t) => t.id));
        return topics.filter((topic) => !excludedIds.has(topic.id));
    }, [topics, excludedTopics]);

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="relative">
                <FiSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                    size={18}
                />
                <input
                    type="text"
                    placeholder={lang("COMMON_SEARCH_PLACEHOLDER")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-2xl bg-cards border border-borders text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition"
                />
            </div>

            {filteredTopics.length > 0 && (
                <div className="mt-4 space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-borders scrollbar-track-transparent">
                    {filteredTopics.map((topic) => (
                        <div
                            key={topic.id}
                            onClick={() => onSelect?.(topic)}
                            className="p-3 rounded-xl bg-cards border border-borders hover:border-accent hover:bg-secondary-accent cursor-pointer transition"
                        >
                            <p className="text-text-primary font-medium">{topic.title}</p>
                        </div>
                    ))}
                </div>
            )}

            {filteredTopics.length >= 100 && (
                <div className="mt-4 flex items-center gap-2 text-warning text-sm">
                    <FiAlertTriangle size={16} />
                    <span>{lang("COMPETENCE_LINK_TOPICS_TOO_MANY_RESULTS")}</span>
                </div>
            )}
        </div>
    );
};

export default TopicSearch;
