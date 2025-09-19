export interface Catalog {
  id: number;
  title: string;
  description?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}

export interface QuestionSetExample {
  id: number;
  description: string;
  type?: string;
}

export interface QuestionSet {
  id: number;
  title: string;
  relatedLearningFields?: string[];
  locationInRegulation?: string;
  catalogId: number;
  examples: QuestionSetExample[];
}

export interface Topic {
  id: number;
  title: string;
  competences: Competence[];
}

export interface Competence {
  id: number;
  title: string;
  description?: string;
  createdAt?: string; // ISO string
  updatedAt?: string; // ISO string
}

////////////////
/// REQUESTS ///
////////////////

export interface CreateQuestionSetRequest {
  catalogId: number;
  title: string;
  locationInRegulation?: string;
  relatedLearningFields?: string[];
}

export interface CreateTopicRequest {
  questionSetId: number;
  title: string;
}