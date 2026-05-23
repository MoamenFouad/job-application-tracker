import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, MapPin, DollarSign, Calendar, Pencil, Trash2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/formatDate'
import Badge from '../ui/Badge'
import type { Job } from '../../types'

interface JobCardProps {
  job: Job
  onDelete: (id: string) => void
  onEdit: (job: Job) => void
}

export default function JobCard({ job, onDelete, onEdit }: JobCardProps) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      className={cn(
        'group relative bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4',
        'transition-all duration-150 hover:border-[var(--primary)]/40 hover:shadow-lg hover:shadow-[var(--primary)]/5 cursor-pointer'
      )}
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 pr-2">
          <h3
            className="font-semibold text-[var(--text)] truncate text-sm"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {job.company}
          </h3>
          <p className="text-[var(--text-secondary)] text-xs mt-0.5 truncate">{job.position}</p>
        </div>

        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            className="p-1 rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v) }}
          >
            <MoreHorizontal size={16} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-7 z-20 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-xl py-1 min-w-[130px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-white/5 transition-colors"
                onClick={() => { setMenuOpen(false); onEdit(job) }}
              >
                <Pencil size={13} /> Edit
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors"
                onClick={() => { setMenuOpen(false); onDelete(job.id) }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Badge status={job.status} className="mb-3" />

      <div className="flex flex-col gap-1">
        {job.location && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <MapPin size={11} />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div
            className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <DollarSign size={11} />
            {job.salary}
          </div>
        )}
        {job.appliedDate && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <Calendar size={11} />
            {formatDate(job.appliedDate)}
          </div>
        )}
      </div>
    </div>
  )
}
