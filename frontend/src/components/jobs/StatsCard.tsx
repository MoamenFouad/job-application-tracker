import React from 'react'
import Card from '../ui/Card'

interface StatsCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  color?: string
}

export default function StatsCard({ label, value, icon, color = 'var(--primary)' }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide mb-1">
            {label}
          </p>
          <p
            className="text-3xl font-bold"
            style={{ color, fontFamily: "'DM Mono', monospace" }}
          >
            {value}
          </p>
        </div>
        <div style={{ color, opacity: 0.7 }}>{icon}</div>
      </div>
    </Card>
  )
}
