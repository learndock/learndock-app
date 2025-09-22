import { FetchWrapper } from "../../core/FetchWrapper";
import { AddAssessmentRequest, AddAssessmentResponse, UserCompetenceAssessment } from "../../types/Data.types";

export const fetchAssessmentsForCompetence = (competenceId: number): Promise<UserCompetenceAssessment[]> =>
    FetchWrapper.get<UserCompetenceAssessment[]>(`/api/assessments/competence/${competenceId}`);

export const fetchLatestAssessmentForCompetence = (competenceId: number): Promise<UserCompetenceAssessment | null> =>
    FetchWrapper.get<UserCompetenceAssessment | null>(`/api/assessments/competence/${competenceId}/latest`);

export const addAssessmentForCompetence = (request: AddAssessmentRequest): Promise<AddAssessmentResponse> => 
    FetchWrapper.post<AddAssessmentResponse>(`/api/assessments/competence/${request.competenceId}?assessmentValue=${request.assessmentValue}`,{});

export const getSelfAssessmentRate = (): Promise<number> =>
    FetchWrapper.get<number>(`/api/assessments/self-assessment-rate`);