import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, PlusCircle } from 'lucide-react'
import { cn } from '../../utils/cn'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { to: '/jobs', label: 'Jobs', icon: <Briefcase size={16} /> },
  { to: '/jobs/new', label: 'Add Job', icon: <PlusCircle size={16} /> },
]

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 bottom-0 flex flex-col"
      style={{
        top: '56px',
        width: '220px',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
      }}
    >
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 relative',
                isActive
                  ? 'text-[var(--primary)] bg-[var(--primary)]/10 border-l-2 border-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-white/5'
              )
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-[var(--border)]">
        <span className="text-xs" style={{ color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
          v1.0.0
        </span>
      </div>
    </aside>
  )
}
