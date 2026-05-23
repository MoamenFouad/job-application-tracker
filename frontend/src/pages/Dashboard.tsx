import { useNavigate } from 'react-router-dom'
import { Briefcase, TrendingUp, Calendar, Award } from 'lucide-react'
import { useStats } from '../hooks/useStats'
import { useJobs } from '../hooks/useJobs'
import StatsCard from '../components/jobs/StatsCard'
import StatusPipeline from '../components/jobs/StatusPipeline'
import JobCard from '../components/jobs/JobCard'
import Spinner from '../components/ui/Spinner'
import { useDeleteJob } from '../hooks/useJobs'

export default function Dashboard() {
  const { stats, isLoading: statsLoading } = useStats()
  const { data: recentData, isLoading: jobsLoading } = useJobs({ limit: 5 })
  const deleteMutation = useDeleteJob()
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (statsLoading || jobsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  const recentJobs: import('../types').Job[] = recentData?.data ?? []

  return (
    <div className="fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">{today}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Applications"
          value={stats?.total ?? 0}
          icon={<Briefcase size={20} />}
          color="var(--primary)"
        />
        <StatsCard
          label="Applied This Week"
          value={stats?.recentApplications ?? 0}
          icon={<TrendingUp size={20} />}
          color="var(--success)"
        />
        <StatsCard
          label="Interviews"
          value={stats?.byStatus?.INTERVIEW ?? 0}
          icon={<Calendar size={20} />}
          color="var(--warning)"
        />
        <StatsCard
          label="Offers"
          value={stats?.byStatus?.OFFER ?? 0}
          icon={<Award size={20} />}
          color="var(--success)"
        />
      </div>

      {stats && <StatusPipeline stats={stats} />}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[var(--text)]">Recent Applications</h2>
          <button
            onClick={() => navigate('/jobs')}
            className="text-xs text-[var(--primary)] hover:underline"
          >
            View all →
          </button>
        </div>
        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={(id) => deleteMutation.mutate(id)}
                onEdit={(j) => navigate(`/jobs/${j.id}/edit`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-secondary)]">
            No applications yet.{' '}
            <button
              onClick={() => navigate('/jobs/new')}
              className="text-[var(--primary)] hover:underline"
            >
              Add your first one
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
