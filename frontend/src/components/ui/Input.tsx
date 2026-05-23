import React from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
}

export default function Input({ label, error, leftIcon, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm text-[var(--text-secondary)] font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full bg-[var(--surface)] border rounded-lg px-3 py-2 text-[var(--text)] text-sm',
            'placeholder:text-[var(--muted)] outline-none transition-colors duration-150',
            'focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]',
            error ? 'border-[var(--danger)]' : 'border-[var(--border)]',
            leftIcon ? 'pl-9' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
    </div>
  )
}
