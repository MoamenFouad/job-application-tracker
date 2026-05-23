import { create } from 'zustand'
import type { Job, JobStatus, PaginatedResponse } from '../types'

interface FiltersState {
  status?: JobStatus
  search?: string
  page: number
  limit: number
}

interface JobsState {
  jobs: Job[]
  total: number
  page: number
  totalPages: number
  filters: FiltersState
  isLoading: boolean
  setJobs: (data: PaginatedResponse<Job>) => void
  setFilters: (filters: Partial<FiltersState>) => void
  setLoading: (val: boolean) => void
  removeJob: (id: string) => void
  updateJobInStore: (job: Job) => void
  addJob: (job: Job) => void
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  total: 0,
  page: 1,
  totalPages: 1,
  filters: { page: 1, limit: 10 },
  isLoading: false,
  setJobs: (data) =>
    set({
      jobs: data.data,
      total: data.pagination?.total ?? data.total ?? 0,
      page: data.pagination?.page ?? data.page ?? 1,
      totalPages: data.pagination?.totalPages ?? data.totalPages ?? 1,
    }),
  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),
  setLoading: (isLoading) => set({ isLoading }),
  removeJob: (id) =>
    set((s) => ({ jobs: s.jobs.filter((j) => j.id !== id) })),
  updateJobInStore: (job) =>
    set((s) => ({ jobs: s.jobs.map((j) => (j.id === job.id ? job : j)) })),
  addJob: (job) => set((s) => ({ jobs: [job, ...s.jobs] })),
}))
