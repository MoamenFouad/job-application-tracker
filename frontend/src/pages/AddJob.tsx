import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useCreateJob } from '../hooks/useJobs'
import JobForm from '../components/jobs/JobForm'
import type { CreateJobInput } from '../types'

export default function AddJob() {
  const navigate = useNavigate()
  const mutation = useCreateJob()

  const handleSubmit = (data: CreateJobInput) => {
    mutation.mutate(data, { onSuccess: () => navigate('/jobs') })
  }

  return (
    <div className="fade-in max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <h1 className="text-2xl font-bold text-[var(--text)] mb-6">Add New Application</h1>

      <div
        className="rounded-lg p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <JobForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
      </div>
    </div>
  )
}
