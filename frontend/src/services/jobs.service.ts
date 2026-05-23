import { get, post, put, del } from './api'
import type {
  Job,
  JobStatus,
  CreateJobInput,
  UpdateJobInput,
  ApiResponse,
  PaginatedResponse,
  Stats,
  TimelineEntry,
} from '../types'

interface JobsParams {
  status?: JobStatus
  search?: string
  page?: number
  limit?: number
}

export const getJobs = (params?: JobsParams) =>
  get<PaginatedResponse<Job>>('/jobs', params as Record<string, unknown>)

export const getJobById = (id: string) =>
  get<ApiResponse<Job>>(`/jobs/${id}`).then((r) => r.data)

export const createJob = (data: CreateJobInput) =>
  post<ApiResponse<Job>>('/jobs', data).then((r) => r.data)

export const updateJob = (id: string, data: UpdateJobInput) =>
  put<ApiResponse<Job>>(`/jobs/${id}`, data).then((r) => r.data)

export const deleteJob = (id: string) => del<ApiResponse<null>>(`/jobs/${id}`)

export const getStats = () =>
  get<ApiResponse<Stats>>('/jobs/stats').then((r) => r.data)

export const getTimeline = () =>
  get<ApiResponse<TimelineEntry[]>>('/stats/timeline').then((r) => r.data)
