import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocPage } from '../components/DocPage'
import { ExportCard } from '../components/ExportCard'
import { FilterSearch } from '../components/FilterSearch'
import { exportsCatalog } from '../data/exports'
import type { Realm } from '../types/docs'

const PAGE_SIZE = 24

export function ExportsPage() {
  const [query, setQuery] = useState('')
  const [realm, setRealm] = useState<'all' | Realm>('all')
  const [resource, setResource] = useState('all')
  const [page, setPage] = useState(0)
  const location = useLocation()

  const resources = useMemo(
    () => [...new Set(exportsCatalog.map((e) => e.resource))].sort(),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exportsCatalog.filter((item) => {
      if (realm !== 'all' && item.realm !== realm) return false
      if (resource !== 'all' && item.resource !== resource) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.resource.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    })
  }, [query, realm, resource])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount - 1)
  const slice = filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)

  useEffect(() => {
    setPage(0)
  }, [query, realm, resource])

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [location.hash, slice])

  const realms: Array<'all' | Realm> = ['all', 'server', 'client', 'shared']

  return (
    <DocPage
      title="Exports API"
      description={`Searchable catalog of ${exportsCatalog.length} export definitions discovered in this workspace.`}
      href="/exports"
    >
      <Callout tone="note">
        Core sandbox-base / characters APIs include richer parameter docs. Remaining exports list name, realm, and
        file with <code>TODO: verify</code> until signatures are confirmed from implementation.
      </Callout>

      <div className="sticky top-20 z-10 mb-8 space-y-4 rounded-2xl border border-border bg-surface/95 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <FilterSearch
          value={query}
          onChange={setQuery}
          placeholder="FetchCharacterSource, sandbox-hud…"
          label="Search exports"
          resultCount={filtered.length}
          totalCount={exportsCatalog.length}
        />

        <div className="grid gap-3 sm:grid-cols-2">
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
          <label className="block text-sm">
            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-ink-faint uppercase">
              Resource
            </span>
            <select
              value={resource}
              onChange={(e) => setResource(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-raised px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            >
              <option value="all">All resources</option>
              {resources.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {slice.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-ink-faint">
          No exports match those filters.
        </p>
      ) : (
        <div className="space-y-4">
          {slice.map((item, index) => (
            <div
              key={item.id}
              className="stagger-item"
              style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}
            >
              <ExportCard exportDef={item} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-xl border border-border px-4 py-2 text-sm transition hover:border-accent/40 disabled:opacity-40"
          disabled={currentPage === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Previous
        </button>
        <span className="text-sm text-ink-faint">
          Page {currentPage + 1} / {pageCount}
        </span>
        <button
          type="button"
          className="rounded-xl border border-border px-4 py-2 text-sm transition hover:border-accent/40 disabled:opacity-40"
          disabled={currentPage >= pageCount - 1}
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        >
          Next
        </button>
      </div>
    </DocPage>
  )
}
