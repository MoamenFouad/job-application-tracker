import React from 'react'
import { cn } from '../../utils/cn'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: React.ReactNode
}

export default function Select({ label, error, children, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm text-[var(--text-secondary)] font-medium">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full bg-[var(--surface)] border rounded-lg px-3 py-2 text-[var(--text)] text-sm',
          'outline-none transition-colors duration-150 cursor-pointer',
          'focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]',
          error ? 'border-[var(--danger)]' : 'border-[var(--border)]',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
    </div>
  )
}
