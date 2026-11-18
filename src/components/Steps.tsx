import type { ReactNode } from 'react'

export interface StepItem {
  title: string
  children: ReactNode
}

interface StepsProps {
  items: StepItem[]
}

export function Steps({ items }: StepsProps) {
  return (
    <ol className="my-8 space-y-7">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-4">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft font-mono text-sm font-semibold text-accent"
            aria-hidden
          >
            {index + 1}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="mb-2 text-base font-semibold text-ink">{item.title}</h3>
            <div className="text-sm leading-relaxed text-ink-muted">{item.children}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}
