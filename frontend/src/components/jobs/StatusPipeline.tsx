import { ChevronRight } from 'lucide-react'
import { statusConfig } from '../../utils/statusConfig'
import type { Stats } from '../../types'

interface StatusPipelineProps {
  stats: Stats
}

const stages = ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER'] as const

export default function StatusPipeline({ stats }: StatusPipelineProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wide">
        Pipeline
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        {stages.map((status, i) => {
          const cfg = statusConfig[status]
          const count = stats.byStatus[status] ?? 0
          return (
            <div key={status} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-white/5 min-w-[80px]">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'DM Mono', monospace", color: count > 0 ? 'var(--text)' : 'var(--muted)' }}
                >
                  {count}
                </span>
                <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
              </div>
              {i < stages.length - 1 && (
                <ChevronRight size={16} className="text-[var(--muted)] flex-shrink-0" />
              )}
            </div>
          )
        })}
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-px h-8 bg-[var(--border)]" />
          <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-[var(--danger)]/10 min-w-[80px]">
            <span
              className="text-2xl font-bold text-[var(--danger)]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {stats.byStatus['REJECTED'] ?? 0}
            </span>
            <span className="text-xs font-medium text-[var(--danger)]">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
