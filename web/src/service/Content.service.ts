import { FetchWrapper } from "../core/FetchWrapper";
import { ContentDetails } from "../types/Content.types";

export const getContentDetails = async (contentId: string): Promise<ContentDetails> => FetchWrapper.get<ContentDetails>(`/api/content/${contentId}`);