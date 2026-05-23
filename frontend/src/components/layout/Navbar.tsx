import { LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

export default function Navbar() {
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6"
      style={{
        height: '56px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "'DM Mono', monospace", color: 'var(--primary)' }}
        >
          JAT
        </span>
        <span className="text-xs hidden sm:block" style={{ color: 'var(--muted)' }}>
          Job Application Tracker
        </span>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              {initials}
            </div>
            <span className="text-sm hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
              {user.name}
            </span>
          </div>
        )}
        <Button variant="ghost" size="sm" leftIcon={<LogOut size={14} />} onClick={logout}>
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </nav>
  )
}
