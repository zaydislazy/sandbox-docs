import { Link } from 'react-router-dom'
import type { Resource } from '../types/docs'

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      to={`/resources/${resource.name}`}
      className="group block h-full rounded-2xl border border-border bg-surface-raised p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-surface-overlay hover:shadow-lg hover:shadow-black/20"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-base font-semibold text-ink transition group-hover:text-accent">
          {resource.name}
        </h3>
        <span className="rounded-md bg-surface-overlay px-2 py-0.5 text-[0.65rem] tracking-wide text-ink-faint uppercase">
          {resource.category}
        </span>
        {resource.hasUi ? (
          <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[0.65rem] text-accent uppercase">
            React UI
          </span>
        ) : null}
      </div>
      <p className="mb-3 text-sm leading-relaxed text-ink-muted">{resource.purpose}</p>
      <p className="text-xs text-ink-faint">
        {resource.exports.length} exports
        {resource.ensureOrder !== null ? ` · ensure #${resource.ensureOrder}` : ' · not in resources.cfg'}
      </p>
    </Link>
  )
}
