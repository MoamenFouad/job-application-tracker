import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useJob, useUpdateJob } from '../hooks/useJobs'
import JobForm from '../components/jobs/JobForm'
import Spinner from '../components/ui/Spinner'
import type { CreateJobInput } from '../types'

export default function EditJob() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: job, isLoading } = useJob(id!)
  const mutation = useUpdateJob()

  const handleSubmit = (data: CreateJobInput) => {
    mutation.mutate({ id: id!, data }, { onSuccess: () => navigate(`/jobs/${id}`) })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!job) {
    return <p className="text-[var(--text-secondary)]">Job not found.</p>
  }

  return (
    <div className="fade-in max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <h1 className="text-2xl font-bold text-[var(--text)] mb-2">Edit Application</h1>
      <p className="text-[var(--text-secondary)] text-sm mb-6">
        {job.company} — {job.position}
      </p>

      <div
        className="rounded-lg p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <JobForm initialData={job} onSubmit={handleSubmit} isLoading={mutation.isPending} />
      </div>
    </div>
  )
}
