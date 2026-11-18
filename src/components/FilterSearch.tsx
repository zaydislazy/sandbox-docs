interface FilterSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  resultCount?: number
  totalCount?: number
}

export function FilterSearch({
  value,
  onChange,
  placeholder = 'Search…',
  label = 'Search',
  resultCount,
  totalCount,
}: FilterSearchProps) {
  return (
    <div className="space-y-2">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink-faint uppercase">
          {label}
        </span>
        <div className="relative">
          <svg
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-faint"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-border bg-surface-raised py-2.5 pr-3 pl-10 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
          {value ? (
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-ink-faint transition hover:bg-surface-overlay hover:text-ink"
              onClick={() => onChange('')}
            >
              Clear
            </button>
          ) : null}
        </div>
      </label>
      {typeof resultCount === 'number' && typeof totalCount === 'number' ? (
        <p className="text-xs text-ink-faint">
          Showing <span className="text-ink-muted">{resultCount}</span> of {totalCount}
        </p>
      ) : null}
    </div>
  )
}
