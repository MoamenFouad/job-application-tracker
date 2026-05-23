export type JobStatus = 'WISHLIST' | 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED'
export type InterviewType = 'PHONE' | 'VIDEO' | 'ONSITE' | 'TECHNICAL'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface Job {
  id: string
  company: string
  position: string
  status: JobStatus
  appliedDate?: string
  notes?: string
  salary?: string
  location?: string
  url?: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Interview {
  id: string
  jobId: string
  scheduledAt: string
  type: InterviewType
  notes?: string
  createdAt: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  totalPages: number
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
}

export interface Stats {
  total: number
  byStatus: Record<JobStatus, number>
  recentApplications: number
}

export interface TimelineEntry {
  month: string
  count: number
}

export interface CreateJobInput {
  company: string
  position: string
  status: JobStatus
  appliedDate?: string
  notes?: string
  salary?: string
  location?: string
  url?: string
}

export type UpdateJobInput = Partial<CreateJobInput>

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}
