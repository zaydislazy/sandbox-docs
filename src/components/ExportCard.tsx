import { Link } from 'react-router-dom'
import type { ExportDef } from '../types/docs'
import { CodeBlock } from './CodeBlock'
import { ParamTable } from './ParamTable'

const realmClass: Record<ExportDef['realm'], string> = {
  server: 'bg-realm-server/15 text-realm-server border-realm-server/30',
  client: 'bg-realm-client/15 text-realm-client border-realm-client/30',
  shared: 'bg-realm-shared/15 text-realm-shared border-realm-shared/30',
}

interface ExportCardProps {
  exportDef: ExportDef
}

export function ExportCard({ exportDef }: ExportCardProps) {
  const example =
    exportDef.example ??
    `exports['${exportDef.resource}']:${exportDef.name}(${exportDef.params
      .map((p) => p.name)
      .join(', ')})`

  return (
    <article
      id={exportDef.id}
      className="scroll-mt-24 rounded-2xl border border-border bg-surface-raised p-5 transition duration-200 hover:border-accent/35"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3 className="font-mono text-lg font-semibold text-ink">{exportDef.name}</h3>
        <span
          className={`rounded-md border px-2 py-0.5 text-xs font-semibold uppercase ${realmClass[exportDef.realm]}`}
        >
          {exportDef.realm}
        </span>
      </div>
      <p className="mb-3 text-sm text-ink-muted">
        Resource:{' '}
        <Link
          className="text-accent underline-offset-2 transition hover:text-accent-gold hover:underline"
          to={`/resources/${exportDef.resource}`}
        >
          {exportDef.resource}
        </Link>
        {exportDef.file ? (
          <>
            {' '}
            · <span className="font-mono text-ink-faint">{exportDef.file}</span>
          </>
        ) : null}
      </p>
      <p className="mb-4 text-sm leading-relaxed text-ink-muted">{exportDef.description}</p>
      <h4 className="mb-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">
        Parameters
      </h4>
      <ParamTable params={exportDef.params} />
      <h4 className="mt-4 mb-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">
        Returns
      </h4>
      {exportDef.returns ? (
        <p className="text-sm text-ink-muted">
          <span className="font-mono text-accent">{exportDef.returns.type}</span> —{' '}
          {exportDef.returns.description}
        </p>
      ) : (
        <p className="text-sm text-ink-faint">No return value documented.</p>
      )}
      <h4 className="mt-4 mb-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">
        Example
      </h4>
      <CodeBlock code={example} language="lua" />
    </article>
  )
}
