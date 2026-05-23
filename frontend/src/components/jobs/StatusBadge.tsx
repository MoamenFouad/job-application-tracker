import Badge from '../ui/Badge'
import type { JobStatus } from '../../types'

interface StatusBadgeProps {
  status: JobStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge status={status} />
}
