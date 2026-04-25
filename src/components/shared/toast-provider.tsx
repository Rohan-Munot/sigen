import { type ComponentChildren, createContext, h } from 'preact'
import { useContext, useMemo, useRef, useState } from 'preact/hooks'

type ToastVariant = 'error' | 'info' | 'success'

type ToastInput = {
  message: string
  title?: string
  variant?: ToastVariant
  duration?: number
}

type ToastRecord = ToastInput & {
  id: string
  variant: ToastVariant
}

type ToastContextValue = {
  dismissToast: (id: string) => void
  showToast: (input: ToastInput) => string
}

const toastContext = createContext<ToastContextValue | null>(null)

const DEFAULT_DURATION = 3200

const toastVariantClasses: Record<ToastVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-neutral-200 bg-white text-neutral-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900'
}

const toastDotClasses: Record<ToastVariant, string> = {
  error: 'bg-red-500',
  info: 'bg-orange-400',
  success: 'bg-emerald-500'
}

export function ToastProvider (props: { children: ComponentChildren }) {
  const { children } = props
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const timersRef = useRef<Record<string, number>>({})

  function dismissToast (id: string) {
    const timer = timersRef.current[id]
    if (timer !== undefined) {
      window.clearTimeout(timer)
      delete timersRef.current[id]
    }

    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  const value = useMemo<ToastContextValue>(() => ({
    dismissToast,
    showToast (input) {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const toast: ToastRecord = {
        id,
        message: input.message,
        title: input.title,
        variant: input.variant ?? 'info',
        duration: input.duration
      }

      setToasts((current) => [...current, toast])

      if (input.duration !== 0) {
        timersRef.current[id] = window.setTimeout(() => {
          dismissToast(id)
        }, input.duration ?? DEFAULT_DURATION)
      }

      return id
    }
  }), [])

  return (
    <toastContext.Provider value={value}>
      {children}
      <div class="pointer-events-none absolute inset-x-0 bottom-16 z-30 flex flex-col gap-1.5 px-3 pt-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            class={`pointer-events-auto rounded-lg border px-2.5 py-2 shadow-md transition-all ${toastVariantClasses[toast.variant]}`}
          >
            <div class="flex items-start gap-2">
              <span class={`mt-1 h-2 w-2 shrink-0 rounded-full ${toastDotClasses[toast.variant]}`} />
              <div class="min-w-0 flex-1 text-[11px] leading-4">
                {toast.title ? (
                  <span class="mr-1 font-semibold tracking-tight">
                    {toast.title}
                  </span>
                ) : null}
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                class="-mr-0.5 -mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded text-current opacity-60 transition-opacity hover:opacity-100"
                onClick={() => dismissToast(toast.id)}
              >
                <svg
                  viewBox="0 0 12 12"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                >
                  <line x1="3" y1="3" x2="9" y2="9" />
                  <line x1="9" y1="3" x2="3" y2="9" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </toastContext.Provider>
  )
}

export function useToast () {
  const value = useContext(toastContext)

  if (value === null) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return value
}
