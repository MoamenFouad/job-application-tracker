import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Pencil, Trash2, MapPin, DollarSign, Calendar, FileText } from 'lucide-react'
import { useJob, useDeleteJob } from '../hooks/useJobs'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'
import { formatDate } from '../utils/formatDate'

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: job, isLoading } = useJob(id!)
  const deleteMutation = useDeleteJob()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--text-secondary)]">Job not found.</p>
        <Link to="/jobs" className="text-[var(--primary)] hover:underline text-sm mt-2 block">
          ← Back to Jobs
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    deleteMutation.mutate(job.id, {
      onSuccess: () => navigate('/jobs'),
    })
  }

  return (
    <div className="fade-in max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Jobs
      </button>

      <div
        className="rounded-lg p-6 mb-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)] mb-1">{job.company}</h1>
            <p className="text-[var(--text-secondary)] text-base mb-3">{job.position}</p>
            <Badge status={job.status} />
          </div>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Pencil size={13} />}
            onClick={() => navigate(`/jobs/${job.id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div
            className="rounded-lg p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-4">
              Details
            </h2>
            <div className="space-y-3">
              {job.appliedDate && (
                <div className="flex items-center gap-3">
                  <Calendar size={15} className="text-[var(--muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">Applied Date</p>
                    <p className="text-sm text-[var(--text)]">{formatDate(job.appliedDate)}</p>
                  </div>
                </div>
              )}
              {job.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-[var(--muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">Location</p>
                    <p className="text-sm text-[var(--text)]">{job.location}</p>
                  </div>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center gap-3">
                  <DollarSign size={15} className="text-[var(--muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">Salary</p>
                    <p
                      className="text-sm text-[var(--text)]"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {job.salary}
                    </p>
                  </div>
                </div>
              )}
              {job.url && (
                <div className="flex items-center gap-3">
                  <ExternalLink size={15} className="text-[var(--muted)]" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">Job URL</p>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--primary)] hover:underline"
                    >
                      {job.url}
                    </a>
                  </div>
                </div>
              )}
              {job.notes && (
                <div className="flex items-start gap-3">
                  <FileText size={15} className="text-[var(--muted)] mt-0.5" />
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">Notes</p>
                    <p className="text-sm text-[var(--text)] whitespace-pre-wrap mt-1">{job.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div
            className="rounded-lg p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
              Interviews
            </h2>
            <p className="text-xs text-[var(--muted)]">
              Interview tracking coming in a future release.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 size={13} />}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Application
        </Button>
      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Job">
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Are you sure you want to delete <strong className="text-[var(--text)]">{job.company}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            isLoading={deleteMutation.isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
