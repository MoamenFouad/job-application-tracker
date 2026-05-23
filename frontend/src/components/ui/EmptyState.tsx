import React from 'react'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center fade-in">
      <div className="text-[var(--muted)] opacity-40">{icon}</div>
      <div>
        <p className="text-[var(--text)] font-medium text-lg">{title}</p>
        <p className="text-[var(--text-secondary)] text-sm mt-1">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
