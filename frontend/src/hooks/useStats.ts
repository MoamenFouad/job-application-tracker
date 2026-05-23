import { useQuery } from '@tanstack/react-query'
import { getStats, getTimeline } from '../services/jobs.service'

export function useStats() {
  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  })
  const timelineQuery = useQuery({
    queryKey: ['timeline'],
    queryFn: getTimeline,
  })
  return {
    stats: statsQuery.data,
    timeline: timelineQuery.data,
    isLoading: statsQuery.isLoading || timelineQuery.isLoading,
  }
}
