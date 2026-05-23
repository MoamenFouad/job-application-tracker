import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as jobsService from '../services/jobs.service'
import { useToast } from './useToast'
import type { JobStatus, CreateJobInput, UpdateJobInput } from '../types'

interface JobsFilters {
  status?: JobStatus
  search?: string
  page?: number
  limit?: number
}

export function useJobs(filters?: JobsFilters) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => jobsService.getJobs(filters),
  })
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsService.getJobById(id),
    enabled: !!id,
  })
}

export function useCreateJob() {
  const queryClient = useQueryClient()
  const { addToast } = useToast()
  return useMutation({
    mutationFn: (data: CreateJobInput) => jobsService.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      addToast('Job added successfully!', 'success')
    },
    onError: () => addToast('Failed to create job.', 'error'),
  })
}

export function useUpdateJob() {
  const queryClient = useQueryClient()
  const { addToast } = useToast()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobInput }) =>
      jobsService.updateJob(id, data),
    onSuccess: (updated: import('../types').Job) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.setQueryData(['job', updated.id], updated)
      addToast('Job updated successfully!', 'success')
    },
    onError: () => addToast('Failed to update job.', 'error'),
  })
}

export function useDeleteJob() {
  const queryClient = useQueryClient()
  const { addToast } = useToast()
  return useMutation({
    mutationFn: (id: string) => jobsService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      addToast('Job deleted.', 'info')
    },
    onError: () => addToast('Failed to delete job.', 'error'),
  })
}
