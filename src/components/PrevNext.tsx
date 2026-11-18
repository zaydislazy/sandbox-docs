import { Link } from 'react-router-dom'
import type { NavItem } from '../types/docs'

interface PrevNextProps {
  prev?: NavItem | null
  next?: NavItem | null
}

export function PrevNext({ prev, next }: PrevNextProps) {
  return (
    <nav
      aria-label="Adjacent pages"
      className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          to={prev.href}
          className="rounded-xl border border-border bg-surface-raised p-4 transition hover:border-accent/40"
        >
          <span className="text-xs tracking-wide text-ink-faint uppercase">Previous</span>
          <p className="mt-1 font-medium text-ink">{prev.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={next.href}
          className="rounded-xl border border-border bg-surface-raised p-4 text-right transition hover:border-accent/40"
        >
          <span className="text-xs tracking-wide text-ink-faint uppercase">Next</span>
          <p className="mt-1 font-medium text-ink">{next.title}</p>
        </Link>
      ) : null}
    </nav>
  )
}
