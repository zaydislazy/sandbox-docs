import type { ReactNode } from 'react'
import type { CalloutTone } from '../types/docs'

const styles: Record<CalloutTone, { label: string; className: string }> = {
  note: {
    label: 'Note',
    className: 'border-info/40 bg-info-soft text-ink',
  },
  tip: {
    label: 'Tip',
    className: 'border-accent/40 bg-accent-soft text-ink',
  },
  warning: {
    label: 'Warning',
    className: 'border-warn/40 bg-warn-soft text-ink',
  },
  danger: {
    label: 'Danger',
    className: 'border-danger/40 bg-danger-soft text-ink',
  },
}

interface CalloutProps {
  tone?: CalloutTone
  title?: string
  children: ReactNode
}

export function Callout({ tone = 'note', title, children }: CalloutProps) {
  const style = styles[tone]
  return (
    <aside
      role="note"
      className={`my-8 rounded-lg border px-5 py-4 ${style.className}`}
    >
      <p className="mb-2 text-sm font-semibold tracking-wide uppercase opacity-90">
        {title ?? style.label}
      </p>
      <div className="text-sm leading-relaxed text-ink-muted [&_a]:text-accent [&_a]:underline [&_code]:text-ink">
        {children}
      </div>
    </aside>
  )
}
