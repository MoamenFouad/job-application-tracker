import React from 'react'
import { cn } from '../../utils/cn'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export default function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-sm text-[var(--text-secondary)] font-medium">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={4}
        className={cn(
          'w-full bg-[var(--surface)] border rounded-lg px-3 py-2 text-[var(--text)] text-sm',
          'placeholder:text-[var(--muted)] outline-none resize-y transition-colors duration-150',
          'focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]',
          error ? 'border-[var(--danger)]' : 'border-[var(--border)]',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
    </div>
  )
}
