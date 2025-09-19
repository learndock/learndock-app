import { Catalog, CreateTopicRequest, Topic } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper";

export const getTopicsForQuestionSet = (questionSetId: number): Promise<Topic[]> =>
  FetchWrapper.get<Topic[]>("/api/topics/question-set/" + questionSetId);

export const getTopic = (id: number): Promise<Topic> =>
  FetchWrapper.get<Topic>(`/api/topics/${id}`);

export const getCatalogForTopic = (id: number): Promise<Catalog> => 
  FetchWrapper.get<Catalog>(`/api/topics/${id}/catalog`)

export const addTopic = (request: CreateTopicRequest): Promise<Topic> =>
  FetchWrapper.post<Topic>("/api/topics", request);

export const updateTopic = (id: number, topic: Partial<Topic>): Promise<Topic> =>
  FetchWrapper.patch<Topic>(`/api/topics/${id}`, topic);

export const removeTopic = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/topics/${id}`);

export const searchTopics = (query: string, catalogId?: number): Promise<Topic[]> => {
  const url = catalogId 
    ? `/api/topics/search?query=${encodeURIComponent(query)}&catalogId=${catalogId}`
    : `/api/topics/search?query=${encodeURIComponent(query)}`;
  return FetchWrapper.get<Topic[]>(url);
};