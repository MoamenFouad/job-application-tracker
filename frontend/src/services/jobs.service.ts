// Franco: da el jobs service - hena bne3mel el API calls bta3et el jobs
import api from './api';
import type { Job, CreateJobInput, UpdateJobInput, ApiResponse } from '../types';

export const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await api.get<ApiResponse<Job[]>>('/jobs');
  return data.data ?? [];
};

export const fetchJob = async (id: string): Promise<Job> => {
  const { data } = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
  return data.data!;
};

export const createJob = async (input: CreateJobInput): Promise<Job> => {
  const { data } = await api.post<ApiResponse<Job>>('/jobs', input);
  return data.data!;
};

export const updateJob = async (id: string, input: UpdateJobInput): Promise<Job> => {
  const { data } = await api.put<ApiResponse<Job>>(`/jobs/${id}`, input);
  return data.data!;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};
