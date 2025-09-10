import { QuestionSet } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper";

export const getQuestionSetsForCatalog = (catalogId: number): Promise<QuestionSet[]> =>
  FetchWrapper.get<QuestionSet[]>("/api/question-sets/catalog/" + catalogId);

export const getQuestionSet = (id: number): Promise<QuestionSet> =>
  FetchWrapper.get<QuestionSet>(`/api/question-sets/${id}`);

export const addQuestionSet = (questionSet: Partial<QuestionSet>): Promise<QuestionSet> =>
  FetchWrapper.post<QuestionSet>("/api/question-sets", questionSet);

export const updateQuestionSet = (id: number, questionSet: Partial<QuestionSet>): Promise<QuestionSet> =>
  FetchWrapper.put<QuestionSet>(`/api/question-sets/${id}`, questionSet);

export const removeQuestionSet = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/question-sets/${id}`);