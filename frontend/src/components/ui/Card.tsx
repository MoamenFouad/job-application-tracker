import React from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 shadow-sm',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
