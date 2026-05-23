import { statusConfig } from '../../utils/statusConfig'
import { cn } from '../../utils/cn'
import type { JobStatus } from '../../types'

interface BadgeProps {
  status: JobStatus
  className?: string
}

export default function Badge({ status, className }: BadgeProps) {
  const cfg = statusConfig[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', cfg.color, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dotColor)} />
      {cfg.label}
    </span>
  )
}
