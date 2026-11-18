import { Link, Navigate, useParams } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { PageHeader } from '../components/PageHeader'
import { getEventsForResource } from '../data/events'
import { getResource, resources } from '../data/resources'
import { getAdjacent } from '../data/navigation'
import { PrevNext } from '../components/PrevNext'

export function ResourceDetail() {
  const { name = '' } = useParams()
  const resource = getResource(name)
  if (!resource) return <Navigate to="/resources" replace />

  const exportNames = resource.exports
  const events = getEventsForResource(resource.name)
  const index = resources.findIndex((r) => r.name === resource.name)
  const prevRes = index > 0 ? resources[index - 1] : null
  const nextRes = index < resources.length - 1 ? resources[index + 1] : null
  const { prev, next } = getAdjacent('/resources')

  return (
    <article className="prose-docs mx-auto max-w-3xl">
      <PageHeader title={resource.name} description={resource.purpose} />

      {resource.todoVerify ? (
        <Callout tone="note">
          High-level metadata for this resource was inferred from manifests and naming. Prefer reading its{' '}
          <code>fxmanifest.lua</code> when integrating — marked TODO: verify where uncertain.
        </Callout>
      ) : null}

      <h2 id="overview">Overview</h2>
      <ul>
        <li>
          Category: <code>{resource.category}</code>
        </li>
        <li>
          Ensure order:{' '}
          {resource.ensureOrder !== null ? `#${resource.ensureOrder}` : 'not listed in resources.cfg'}
        </li>
        <li>
          React UI: {resource.hasUi ? `yes (${resource.uiPath ?? 'ui/'} · ${resource.uiBundler})` : 'no'}
        </li>
      </ul>

      <h2 id="dependencies">Dependencies</h2>
      {resource.dependencies.length === 0 ? (
        <p>No formal dependencies recorded (may still assume sandbox-base / ox includes).</p>
      ) : (
        <ul>
          {resource.dependencies.map((dep) => (
            <li key={dep}>
              {getResource(dep) ? <Link to={`/resources/${dep}`}>{dep}</Link> : dep}
            </li>
          ))}
        </ul>
      )}

      <h2 id="database">Database tables</h2>
      {resource.dbTables.length === 0 ? (
        <p>No tables annotated for this resource.</p>
      ) : (
        <ul>
          {resource.dbTables.map((table) => (
            <li key={table}>
              <Link to="/database">{table}</Link>
            </li>
          ))}
        </ul>
      )}

      <h2 id="commands">Commands</h2>
      {resource.commands.length === 0 ? (
        <p>No commands annotated.</p>
      ) : (
        <ul>
          {resource.commands.map((cmd) => (
            <li key={cmd}>
              <code>/{cmd}</code>
            </li>
          ))}
        </ul>
      )}

      <h2 id="events">Related events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <code>{event.name}</code> — {event.description}
            </li>
          ))}
        </ul>
      ) : null}
      {resource.events.length > 0 ? (
        <>
          <p className="text-sm text-ink-faint">
            Events referenced in this resource (extracted; see{' '}
            <Link to="/events">Events &amp; Callbacks</Link> for curated lifecycle docs):
          </p>
          <ul className="columns-1 gap-x-6 sm:columns-2">
            {resource.events.slice(0, 40).map((eventName) => (
              <li key={eventName} className="break-inside-avoid">
                <code>{eventName}</code>
              </li>
            ))}
          </ul>
          {resource.events.length > 40 ? (
            <p className="text-sm text-ink-faint">…and {resource.events.length - 40} more.</p>
          ) : null}
        </>
      ) : events.length === 0 ? (
        <p>
          No events annotated for this resource. See <Link to="/events">Events &amp; Callbacks</Link>.
        </p>
      ) : null}

      <h2 id="exports">Exports ({exportNames.length})</h2>
      {exportNames.length === 0 ? (
        <p>No <code>exports(&quot;…&quot;)</code> definitions found for this resource.</p>
      ) : (
        <ul className="columns-1 gap-x-6 sm:columns-2">
          {exportNames.map((exportName) => {
            const id = `${resource.name}-${exportName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            return (
              <li key={exportName} className="break-inside-avoid">
                <Link to={`/exports#${id}`}>
                  <code>{exportName}</code>
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      <div className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {prevRes ? (
          <Link
            to={`/resources/${prevRes.name}`}
            className="rounded-xl border border-border bg-surface-raised p-4 hover:border-accent/40"
          >
            <span className="text-xs text-ink-faint uppercase">Previous resource</span>
            <p className="font-mono text-ink">{prevRes.name}</p>
          </Link>
        ) : (
          <div />
        )}
        {nextRes ? (
          <Link
            to={`/resources/${nextRes.name}`}
            className="rounded-xl border border-border bg-surface-raised p-4 text-right hover:border-accent/40"
          >
            <span className="text-xs text-ink-faint uppercase">Next resource</span>
            <p className="font-mono text-ink">{nextRes.name}</p>
          </Link>
        ) : null}
      </div>

      <PrevNext prev={prev} next={next} />
    </article>
  )
}
