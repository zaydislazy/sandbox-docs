import { useId, useState, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultTab?: string
}

export function Tabs({ items, defaultTab }: TabsProps) {
  const baseId = useId()
  const [active, setActive] = useState(defaultTab ?? items[0]?.id ?? '')
  const current = items.find((item) => item.id === active) ?? items[0]

  if (!current) return null

  return (
    <div className="my-5">
      <div role="tablist" aria-label="Content tabs" className="flex flex-wrap gap-1 border-b border-border">
        {items.map((item) => {
          const selected = item.id === current.id
          return (
            <button
              key={item.id}
              id={`${baseId}-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={`rounded-t-md px-3 py-2 text-sm font-medium transition ${
                selected
                  ? 'border-b-2 border-accent text-ink'
                  : 'text-ink-faint hover:text-ink-muted'
              }`}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-${current.id}`}
        className="pt-4"
      >
        {current.content}
      </div>
    </div>
  )
}
