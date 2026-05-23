import { useToast } from '../../hooks/useToast'
import Toast from './Toast'

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  )
}
