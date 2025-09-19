export interface UserCompetenceAssessment {
  id: number;
  userId: number;          // extracted from User
  competenceId: number;    // extracted from Competence
  assessmentValue: number;
  assessmentDate: string;  // ISO string
}

export interface AddAssessmentRequest {
  competenceId: number;
  assessmentValue: number;
}

export type AddAssessmentResponse = UserCompetenceAssessment;