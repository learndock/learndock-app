import { useQuery } from "react-query";
import { useLang } from "../hooks/Language.hooks";
import { searchCompetences } from "../service/content/Competence.service";
import { searchTopics } from "../service/content/Topic.service";
import { getCatalogList } from "../service/content/Catalog.service";
import { SearchResult } from "../types/Search.types";

const getCatalogsForSearch = async (query: string, lang: (k: any) => string): Promise<SearchResult[]> => {
  const catalogs = await getCatalogList();
  return catalogs
    .filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
    )
    .map((c) => ({
      id: "catalog#" + c.id,
      title: c.title,
      file: `catalog/${c.id}`,
      content: lang("SEARCH_RESULT_TYPE_CATALOG"),
    }));
};

const getCompetencesForSearch = async (query: string, lang: (k: any) => string): Promise<SearchResult[]> => {
  const competences = await searchCompetences(query);
  return competences.map((c) => ({
    id: "competence#" + c.id,
    title: c.title,
    file: `competence/${c.id}`,
    content: lang("SEARCH_RESULT_TYPE_COMPETENCE"),
  }));
};

const getTopicsForSearch = async (query: string, lang: (k: any) => string): Promise<SearchResult[]> => {
  const topics = await searchTopics(query);
  return topics.map((t) => ({
    id: "topic#" + t.id,
    title: t.title,
    file: `topic/${t.id}`,
    content: lang("SEARCH_RESULT_TYPE_TOPIC"),
  }));
};

export const fetchSearchResults = async (query: string, lang: (k: any) => string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];

  const [catalogs, competences, topics] = await Promise.all([
    getCatalogsForSearch(query, lang),
    getCompetencesForSearch(query, lang),
    getTopicsForSearch(query, lang),
  ]);

  return [...catalogs, ...competences, ...topics];
};

export const useSearch = (query: string) => {
  const lang = useLang();

  return useQuery<SearchResult[]>({
    queryKey: ["search", query],
    queryFn: () => fetchSearchResults(query, lang),
    enabled: !!query,
    keepPreviousData: true,
    refetchOnMount: true
  });
};