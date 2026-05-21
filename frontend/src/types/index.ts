// Franco: dol el TypeScript interfaces - el types bta3et el project kolaha

export enum JobStatus {
  WISHLIST = 'WISHLIST',
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  appliedDate?: string;
  notes?: string;
  salary?: string;
  location?: string;
  url?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface CreateJobInput {
  company: string;
  position: string;
  status?: JobStatus;
  appliedDate?: string;
  notes?: string;
  salary?: string;
  location?: string;
  url?: string;
}

export interface UpdateJobInput extends Partial<CreateJobInput> {}
