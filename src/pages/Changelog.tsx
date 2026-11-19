import { DocPage } from '../components/DocPage'
import { slugify } from '../lib/slug'

type Change = {
  date: string
  title: string
  items: string[]
}

const changes: Change[] = [
  {
    date: '2026-11-19',
    title: 'Developer data + Operations pages',
    items: [
      'Expanded Getting Important Data with local character usage, GetData key catalog, nested Licenses/Jobs/custody/phone options, SetData rules, finance, reputation, and callbacks.',
      'Added Changelog under Operations summarizing docs site updates.',
      'Added Credits under Operations for AutLaaw, BadCodes, and Mythic Framework authors.',
    ],
  },
  {
    date: '2026-11-18',
    title: 'Cleanup pass',
    items: [
      'Removed todoVerify flags and TODO: verify badges/copy across data files, types, and UI.',
    ],
  },
  {
    date: '2026-11-18',
    title: 'Docs site bootstrap',
    items: [
      'Initial standalone Vite + React documentation site for Sandbox RP Framework.',
      'Getting Started, Architecture, Developer Guide, Reference, and Operations navigation.',
      'Resource / exports / events / database catalogs generated from the Sandbox workspace.',
      'Setup guide, Mythic differences, admin permissions, and troubleshooting pages.',
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
        Entries below track this documentation site. Framework / resource changes belong in the Sandbox repo and
        in-game <code>changelogs</code> table.
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
