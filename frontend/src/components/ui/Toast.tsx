import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { Toast as ToastType } from '../../hooks/useToast'

interface ToastProps {
  toast: ToastType
  onRemove: (id: string) => void
}

const icons = {
  success: <CheckCircle size={16} className="text-[var(--success)]" />,
  error: <AlertCircle size={16} className="text-[var(--danger)]" />,
  info: <Info size={16} className="text-blue-400" />,
}

const borders = {
  success: 'border-l-[var(--success)]',
  error: 'border-l-[var(--danger)]',
  info: 'border-l-blue-400',
}

export default function Toast({ toast, onRemove }: ToastProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] border-l-4 rounded-lg px-4 py-3 shadow-lg min-w-[280px] max-w-sm slide-in-right',
        borders[toast.type]
      )}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm text-[var(--text)]">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
