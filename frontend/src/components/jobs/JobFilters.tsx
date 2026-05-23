import { Search } from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce'
import { cn } from '../../utils/cn'
import { statusConfig } from '../../utils/statusConfig'
import Input from '../ui/Input'
import type { JobStatus } from '../../types'
import { useState, useEffect } from 'react'

interface FilterState {
  status?: JobStatus
  search?: string
  page: number
  limit: number
}

interface JobFiltersProps {
  filters: FilterState
  onChange: (filters: Partial<FilterState>) => void
}

const statusOptions: { value: JobStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'WISHLIST', label: statusConfig.WISHLIST.label },
  { value: 'APPLIED', label: statusConfig.APPLIED.label },
  { value: 'INTERVIEW', label: statusConfig.INTERVIEW.label },
  { value: 'OFFER', label: statusConfig.OFFER.label },
  { value: 'REJECTED', label: statusConfig.REJECTED.label },
]

export default function JobFilters({ filters, onChange }: JobFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? '')
  const debouncedSearch = useDebounce(searchInput, 300)

  useEffect(() => {
    onChange({ search: debouncedSearch || undefined, page: 1 })
  }, [debouncedSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="w-full sm:w-64">
        <Input
          placeholder="Search company or position…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          leftIcon={<Search size={14} />}
        />
      </div>
      <div className="flex gap-1 flex-wrap">
        {statusOptions.map(({ value, label }) => {
          const active = value === 'ALL' ? !filters.status : filters.status === value
          return (
            <button
              key={value}
              onClick={() => onChange({ status: value === 'ALL' ? undefined : value, page: 1 })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 border',
                active
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50 hover:text-[var(--text)]'
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
