import { DocPage } from '../components/DocPage'
import { slugify } from '../lib/slug'

type Change = {
  date: string
  title: string
  items: string[]
}

const changes: Change[] = [
  {
    date: '2026-11-24',
    title: 'Public repo prep',
    items: [
      'Linked resources to their database tables (MDT, finance, phone, properties, etc.).',
      'Documented ox_inventory runtime table.',
      'Removed unofficial-docs banners; toned down older-fork comparisons.',
      'Added Contributing page, README.md, and CONTRIBUTING.md.',
    ],
  },
  {
    date: '2026-11-19',
    title: 'Developer data + Operations pages',
    items: [
      'Expanded Getting Important Data with local character usage, GetData keys, nested options, finance, and callbacks.',
      'Added Changelog and Credits under Operations.',
    ],
  },
  {
    date: '2026-11-18',
    title: 'Cleanup pass',
    items: ['Removed todoVerify flags and TODO badges across the site.'],
  },
  {
    date: '2026-11-18',
    title: 'Docs site bootstrap',
    items: [
      'Initial Vite + React documentation site.',
      'Getting Started, Architecture, Developer Guide, Reference, and Operations sections.',
      'Resource / exports / events / database catalogs.',
    ],
  },
]

export function Changelog() {
  return (
    <DocPage
      title="Changelog"
      description="What changed on these docs (not the Sandbox game framework itself)."
      href="/changelog"
    >
      <p>
        These entries are for the docs site. Framework changes live in the Sandbox repo / in-game{' '}
        <code>changelogs</code> table.
      </p>

      {changes.map((entry) => {
        const id = slugify(`${entry.date}-${entry.title}`)
        return (
          <section key={id} className="mt-8">
            <p className="mb-1 text-xs tracking-wide text-ink-faint uppercase">{entry.date}</p>
            <h2 id={id} className="!mt-0 !mb-2">
              {entry.title}
            </h2>
            <ul>
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )
      })}
    </DocPage>
  )
}
