import { Competence, Topic } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper";

export const getCompetence = (id: number): Promise<Competence> =>
  FetchWrapper.get<Competence>(`/api/competences/${id}`);

export const getTopics = (id: number): Promise<Topic[]> =>
  FetchWrapper.get<Topic[]>(`/api/competences/${id}/topics`); 

export const linkTopicToCompetence = (competenceId: number, topicId: number): Promise<void> =>
  FetchWrapper.post<void>(`/api/competences/${competenceId}/linkTopic/${topicId}`, {});

export const unlinkTopicFromCompetence = (competenceId: number, topicId: number): Promise<void> =>
  FetchWrapper.post<void>(`/api/competences/${competenceId}/unlinkTopic/${topicId}`, {});

export const addCompetence = (competence: Partial<Competence>): Promise<Competence> =>
  FetchWrapper.post<Competence>("/api/competences", competence);

export const updateCompetence = (id: number, competence: Partial<Competence>): Promise<Competence> =>
  FetchWrapper.patch<Competence>(`/api/competences/${id}`, competence);

export const removeCompetence = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/competences/${id}`);