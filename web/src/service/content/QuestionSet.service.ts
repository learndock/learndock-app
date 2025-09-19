import { CreateQuestionSetRequest, QuestionSet } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper";

export const getQuestionSetsForCatalog = (catalogId: number): Promise<QuestionSet[]> =>
  FetchWrapper.get<QuestionSet[]>("/api/question-sets/catalog/" + catalogId);

export const getQuestionSet = (id: number): Promise<QuestionSet> =>
  FetchWrapper.get<QuestionSet>(`/api/question-sets/${id}`);

export const addQuestionSet = (request: CreateQuestionSetRequest): Promise<QuestionSet> =>
  FetchWrapper.post<QuestionSet>("/api/question-sets", request);

export const updateQuestionSet = (id: number, questionSet: Partial<QuestionSet>): Promise<QuestionSet> =>
  FetchWrapper.patch<QuestionSet>(`/api/question-sets/${id}`, questionSet);

export const removeQuestionSet = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/question-sets/${id}`);