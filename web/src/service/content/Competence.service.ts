import { Competence } from '../../types/Content.types';
import { FetchWrapper } from "../../core/FetchWrapper";

export const getCompetence = (id: number): Promise<Competence> =>
  FetchWrapper.get<Competence>(`/api/competences/${id}`);

export const addCompetence = (competence: Partial<Competence>): Promise<Competence> =>
  FetchWrapper.post<Competence>("/api/competences", competence);

export const updateCompetence = (id: number, competence: Partial<Competence>): Promise<Competence> =>
  FetchWrapper.put<Competence>(`/api/competences/${id}`, competence);

export const removeCompetence = (id: number): Promise<void> =>
  FetchWrapper.delete<void>(`/api/competences/${id}`);
