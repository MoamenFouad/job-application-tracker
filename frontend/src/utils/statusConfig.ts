import type { JobStatus } from '../types'

interface StatusConfig {
  label: string
  color: string
  dotColor: string
  bgColor: string
}

export const statusConfig: Record<JobStatus, StatusConfig> = {
  WISHLIST: {
    label: 'Wishlist',
    color: 'text-[var(--muted)]',
    dotColor: 'bg-gray-500',
    bgColor: 'bg-gray-500/10',
  },
  APPLIED: {
    label: 'Applied',
    color: 'text-blue-400',
    dotColor: 'bg-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  INTERVIEW: {
    label: 'Interview',
    color: 'text-[var(--warning)]',
    dotColor: 'bg-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  OFFER: {
    label: 'Offer',
    color: 'text-[var(--success)]',
    dotColor: 'bg-emerald-400',
    bgColor: 'bg-emerald-400/10',
  },
  REJECTED: {
    label: 'Rejected',
    color: 'text-[var(--danger)]',
    dotColor: 'bg-red-400',
    bgColor: 'bg-red-400/10',
  },
}
