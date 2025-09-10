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
  catalog: Catalog;
  examples: QuestionSetExample[];
}