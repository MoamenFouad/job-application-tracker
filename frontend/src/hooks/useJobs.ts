// Franco: da el useJobs hook - React Query hook byes3edna ngeeb el jobs
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchJobs, createJob, updateJob, deleteJob } from '../services/jobs.service';
import type { CreateJobInput, UpdateJobInput } from '../types';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateJobInput) => createJob(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateJobInput }) => updateJob(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
};
