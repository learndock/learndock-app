import { Topic } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper";

export const getTopicsForQuestionSet = (questionSetId: number): Promise<Topic[]> =>
  FetchWrapper.get<Topic[]>("/api/topics/question-set/" + questionSetId);

export const getTopic = (id: number): Promise<Topic> =>
  FetchWrapper.get<Topic>(`/api/topics/${id}`);

export const addTopic = (topic: Partial<Topic>): Promise<Topic> =>
  FetchWrapper.post<Topic>("/api/topics", topic);

export const updateTopic = (id: number, topic: Partial<Topic>): Promise<Topic> =>
  FetchWrapper.put<Topic>(`/api/topics/${id}`, topic);

export const removeTopic = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/topics/${id}`);