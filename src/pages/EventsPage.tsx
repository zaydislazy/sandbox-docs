import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'
import { FilterSearch } from '../components/FilterSearch'
import { eventsCatalog } from '../data/events'
import type { EventDef } from '../types/docs'

const kindColors: Record<EventDef['kind'], string> = {
  net: 'border-accent/40 bg-accent-soft text-accent',
  local: 'border-border bg-surface-overlay text-ink-muted',
  middleware: 'border-warn/40 bg-warn-soft text-warn',
  callback: 'border-info/40 bg-info-soft text-info',
}

export function EventsPage() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'all' | EventDef['kind']>('all')
  const [realm, setRealm] = useState<'all' | EventDef['realm']>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return eventsCatalog.filter((event) => {
      if (kind !== 'all' && event.kind !== kind) return false
      if (realm !== 'all' && event.realm !== realm) return false
      if (!q) return true
      return (
        event.name.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.resource.toLowerCase().includes(q) ||
        event.kind.toLowerCase().includes(q)
      )
    })
  }, [query, kind, realm])

  const kinds: Array<'all' | EventDef['kind']> = ['all', 'net', 'local', 'middleware', 'callback']
  const realms: Array<'all' | EventDef['realm']> = ['all', 'server', 'client', 'shared']

  return (
    <DocPage
      title="Events & Callbacks"
      description="Lifecycle middleware, sandbox-base callback bus, and important net/local events — the high-signal ones for integrators."
      href="/events"
    >
      <Callout tone="note">
        The framework registers hundreds of net events across labor/phone/vehicles. Prefer exports + middleware +
        documented callbacks when extending systems. Full greps live in the Lua sources.
      </Callout>

      <h2 id="two-stacks">Two callback stacks</h2>
      <ul>
        <li>
          <strong>sandbox-base</strong> — <code>RegisterServerCallback</code> / <code>ServerCallback</code> /
          client counterparts (~695 registrations across Sandbox resources)
        </li>
        <li>
          <strong>ox_lib</strong> — <code>lib.callback</code> inside ox_inventory / ox_doorlock / related ox code
        </li>
      </ul>

      <h2 id="middleware">Middleware pattern</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-base']:MiddlewareAdd('Characters:Spawning', function(source)
  -- ...
end)`}
      />

      <h2 id="catalog">Curated catalog</h2>

      <div className="sticky top-20 z-10 mb-6 space-y-4 rounded-2xl border border-border bg-surface/95 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <FilterSearch
          value={query}
          onChange={setQuery}
          placeholder="Characters:Spawning, callback, sandbox-base…"
          label="Search events"
          resultCount={filtered.length}
          totalCount={eventsCatalog.length}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-ink-faint uppercase">Kind</p>
            <div className="flex flex-wrap gap-2">
              {kinds.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setKind(value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                    kind === value
                      ? 'bg-accent-soft text-accent'
                      : 'bg-surface-overlay text-ink-faint hover:text-ink'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-ink-faint uppercase">Realm</p>
            <div className="flex flex-wrap gap-2">
              {realms.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRealm(value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                    realm === value
                      ? 'bg-accent-soft text-accent'
                      : 'bg-surface-overlay text-ink-faint hover:text-ink'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-ink-faint">
          No events match those filters.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((event, index) => (
            <article
              key={event.id}
              id={event.id}
              className="stagger-item rounded-2xl border border-border bg-surface-raised p-5 transition hover:border-accent/35"
              style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="font-mono text-base text-ink">{event.name}</h3>
                <span className={`rounded-md border px-2 py-0.5 text-[0.65rem] uppercase ${kindColors[event.kind]}`}>
                  {event.kind}
                </span>
                <span className="rounded-md bg-surface-overlay px-2 py-0.5 text-[0.65rem] uppercase text-ink-faint">
                  {event.realm}
                </span>
                {event.todoVerify ? (
                  <span className="rounded-md border border-warn/40 bg-warn-soft px-2 py-0.5 text-[0.65rem] text-warn">
                    TODO: verify
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{event.description}</p>
              <p className="mt-3 text-xs text-ink-faint">
                Resource:{' '}
                <Link className="text-accent transition hover:text-accent-gold" to={`/resources/${event.resource}`}>
                  {event.resource}
                </Link>
              </p>
            </article>
          ))}
        </div>
      )}
    </DocPage>
  )
}
