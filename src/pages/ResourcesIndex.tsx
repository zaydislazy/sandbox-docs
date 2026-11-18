import { useMemo, useState } from 'react'
import { DocPage } from '../components/DocPage'
import { FilterSearch } from '../components/FilterSearch'
import { ResourceCard } from '../components/ResourceCard'
import { getResourcesByCategory, resourceCategories, resources } from '../data/resources'

export function ResourcesIndex() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((resource) => {
      if (category !== 'all' && resource.category !== category) return false
      if (!q) return true
      return (
        resource.name.toLowerCase().includes(q) ||
        resource.purpose.toLowerCase().includes(q) ||
        resource.category.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  const grouped = useMemo(() => {
    return resourceCategories
      .map((cat) => ({
        ...cat,
        list: filtered.filter((r) => r.category === cat.id),
      }))
      .filter((cat) => cat.list.length > 0)
  }, [filtered])

  return (
    <DocPage
      title="Resource Reference"
      description="Browse all framework resources by category. Search by name or purpose to jump straight to what you need."
      href="/resources"
    >
      <div className="sticky top-20 z-10 mb-8 space-y-4 rounded-2xl border border-border bg-surface/95 p-4 shadow-lg shadow-black/20 backdrop-blur">
        <FilterSearch
          value={query}
          onChange={setQuery}
          placeholder="sandbox-hud, characters, inventory…"
          label="Search resources"
          resultCount={filtered.length}
          totalCount={resources.length}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              category === 'all'
                ? 'bg-accent-soft text-accent'
                : 'bg-surface-overlay text-ink-faint hover:text-ink'
            }`}
          >
            All ({resources.length})
          </button>
          {resourceCategories.map((cat) => {
            const count = getResourcesByCategory(cat.id).length
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  category === cat.id
                    ? 'bg-accent-soft text-accent'
                    : 'bg-surface-overlay text-ink-faint hover:text-ink'
                }`}
              >
                {cat.label} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-ink-faint">
          No resources match that search.
        </p>
      ) : (
        grouped.map((cat) => (
          <section key={cat.id} className="mb-12">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 id={cat.id} className="!mt-0">
                {cat.label}
              </h2>
              <p className="pb-1 text-xs text-ink-faint">{cat.list.length} resources</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {cat.list.map((resource, index) => (
                <div
                  key={resource.name}
                  className="stagger-item"
                  style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
                >
                  <ResourceCard resource={resource} />
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </DocPage>
  )
}
