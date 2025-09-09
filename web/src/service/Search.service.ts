import { MAX_SEARCH_RESULTS } from "../config/Search.config";
import { SearchResult } from "../types/Search.types";

const simulateSearch = async (query: string) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 80));

    if (!query) return [];

    return Array.from({ length: MAX_SEARCH_RESULTS + 5 }, (_, i) => ({
        id: i,
        title: `Result for "${query}" ${i + 1}`,
        file: `pages/${query}/${i + 1}`,
        content: `Some dummy content for result ${i + 1}`,
    }));
};

export const fetchSearchResults = async (query: string): Promise<SearchResult[]> => simulateSearch(query);
