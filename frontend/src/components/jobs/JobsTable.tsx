import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-react'
import Badge from '../ui/Badge'
import { formatDate } from '../../utils/formatDate'
import type { Job } from '../../types'

interface JobsTableProps {
  jobs: Job[]
  onDelete: (id: string) => void
  onEdit: (job: Job) => void
}

type SortKey = 'company' | 'position' | 'status' | 'appliedDate'

export default function JobsTable({ jobs, onDelete, onEdit }: JobsTableProps) {
  const navigate = useNavigate()
  const [sortKey, setSortKey] = useState<SortKey>('createdAt' as SortKey)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = [...jobs].sort((a, b) => {
    const av = (a[sortKey] ?? '') as string
    const bv = (b[sortKey] ?? '') as string
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
    ) : null

  const th = 'px-4 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide cursor-pointer select-none hover:text-[var(--text)] transition-colors'

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border)]" style={{ background: 'var(--surface)' }}>
            <th className={th} onClick={() => handleSort('company')}>
              <span className="flex items-center gap-1">Company <SortIcon col="company" /></span>
            </th>
            <th className={th} onClick={() => handleSort('position')}>
              <span className="flex items-center gap-1">Position <SortIcon col="position" /></span>
            </th>
            <th className={th} onClick={() => handleSort('status')}>
              <span className="flex items-center gap-1">Status <SortIcon col="status" /></span>
            </th>
            <th className={th} onClick={() => handleSort('appliedDate')}>
              <span className="flex items-center gap-1">Applied <SortIcon col="appliedDate" /></span>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">
              Location
            </th>
            <th className="px-4 py-3 w-20" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((job) => (
            <tr
              key={job.id}
              className="border-b border-[var(--border)] last:border-0 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <td className="px-4 py-3 text-sm font-medium text-[var(--text)]">{job.company}</td>
              <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{job.position}</td>
              <td className="px-4 py-3"><Badge status={job.status} /></td>
              <td className="px-4 py-3 text-sm text-[var(--muted)]">
                {job.appliedDate ? formatDate(job.appliedDate) : '—'}
              </td>
              <td className="px-4 py-3 text-sm text-[var(--muted)]">{job.location ?? '—'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="p-1 rounded text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-colors"
                    onClick={() => onEdit(job)}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    className="p-1 rounded text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors"
                    onClick={() => onDelete(job.id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
