import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: 'var(--bg)' }}
    >
      <p
        className="text-8xl font-bold"
        style={{ fontFamily: "'DM Mono', monospace", color: 'var(--primary)', opacity: 0.6 }}
      >
        404
      </p>
      <h1 className="text-xl font-semibold text-[var(--text)]">Page not found</h1>
      <p className="text-sm text-[var(--text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/dashboard"
        className="text-sm text-[var(--primary)] hover:underline mt-2"
      >
        ← Back to Dashboard
      </Link>
    </div>
  )
}
