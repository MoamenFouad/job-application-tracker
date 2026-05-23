import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, List, Briefcase } from 'lucide-react'
import { useJobs, useDeleteJob } from '../hooks/useJobs'
import { useJobsStore } from '../store/jobsStore'
import JobCard from '../components/jobs/JobCard'
import JobsTable from '../components/jobs/JobsTable'
import JobFilters from '../components/jobs/JobFilters'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Spinner from '../components/ui/Spinner'
import Modal from '../components/ui/Modal'
import type { Job } from '../types'

export default function JobsList() {
  const navigate = useNavigate()
  const { filters, setFilters } = useJobsStore()
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const { data, isLoading } = useJobs(filters)
  const deleteMutation = useDeleteJob()

  const jobs: import('../types').Job[] = data?.data ?? []
  const total = data?.pagination?.total ?? data?.total ?? 0
  const page = data?.pagination?.page ?? data?.page ?? 1
  const totalPages = data?.pagination?.totalPages ?? data?.totalPages ?? 1
  const limit = filters.limit

  const handleDelete = (id: string) => setDeleteTarget(id)
  const handleEdit = (job: Job) => navigate(`/jobs/${job.id}/edit`)

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget)
      setDeleteTarget(null)
    }
  }

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">My Applications</h1>
          {total > 0 && (
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              Showing {start}–{end} of {total} results
            </p>
          )}
        </div>
        <Button leftIcon={<Plus size={14} />} onClick={() => navigate('/jobs/new')}>
          Add Job
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <JobFilters filters={filters} onChange={setFilters} />
        <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg p-0.5">
          <button
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:text-[var(--text)]'}`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            className={`p-1.5 rounded transition-colors ${viewMode === 'table' ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:text-[var(--text)]'}`}
            onClick={() => setViewMode('table')}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <Spinner size="lg" />
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={<Briefcase size={48} />}
          title="No applications found"
          description={filters.search || filters.status ? 'Try adjusting your filters.' : 'Start by adding your first job application.'}
          action={
            !filters.search && !filters.status ? (
              <Button leftIcon={<Plus size={14} />} onClick={() => navigate('/jobs/new')}>
                Add your first job
              </Button>
            ) : undefined
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </div>
      ) : (
        <JobsTable jobs={jobs} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => setFilters({ page: page - 1 })}
          >
            ← Previous
          </Button>
          <span className="text-sm text-[var(--text-secondary)]">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setFilters({ page: page + 1 })}
          >
            Next →
          </Button>
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Job"
      >
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Are you sure you want to delete this job? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            isLoading={deleteMutation.isPending}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
