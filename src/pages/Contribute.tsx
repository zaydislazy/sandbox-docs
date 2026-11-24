import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function Contribute() {
  return (
    <DocPage
      title="Contributing"
      description="How to help improve these docs — pages, data catalogs, and small fixes welcome."
      href="/contribute"
    >
      <p>
        This site is a public Vite + React app. Full contributor notes also live in{' '}
        <code>CONTRIBUTING.md</code> at the repo root.
      </p>

      <h2 id="quick-start">Local setup</h2>
      <CodeBlock
        language="bash"
        code={`bun install
bun run dev`}
      />
      <p>
        Site runs at <code>http://localhost:5173</code>.
      </p>

      <h2 id="what-to-edit">What to edit</h2>
      <ul>
        <li>
          <strong>Pages</strong> — <code>src/pages/</code> (guides, ops, architecture)
        </li>
        <li>
          <strong>Nav</strong> — <code>src/data/navigation.ts</code> + a route in <code>src/App.tsx</code>
        </li>
        <li>
          <strong>Resource / export / DB data</strong> — <code>src/data/*.ts</code>
        </li>
        <li>
          <strong>Search</strong> — <code>src/data/searchIndex.ts</code> (add entries when you add pages)
        </li>
      </ul>

      <h2 id="good-prs">Good PR material</h2>
      <ul>
        <li>Fix wrong export signatures or missing resource → table links</li>
        <li>Fill in thin guide sections with patterns you actually use in Sandbox</li>
        <li>Typos, broken links, unclear setup steps</li>
        <li>Changelog entry when you ship a meaningful docs change</li>
      </ul>

      <Callout tone="tip">
        Keep examples matching this codebase (<code>exports[&apos;resource&apos;]:Name(...)</code>, oxmysql, React
        NUI). Don&apos;t paste patterns from unrelated frameworks.
      </Callout>

      <h2 id="style">Style</h2>
      <ul>
        <li>Short sentences. Show a code snippet when it helps.</li>
        <li>Link to the <Link to="/exports">Exports API</Link> / <Link to="/resources">Resources</Link> instead of
          duplicating giant lists.</li>
        <li>Update <Link to="/changelog">Changelog</Link> for user-facing doc changes.</li>
      </ul>

      <h2 id="pr">Opening a PR</h2>
      <ol>
        <li>Fork / branch off <code>main</code></li>
        <li>
          Run <code>bun run build</code> so TypeScript is clean
        </li>
        <li>Describe what you changed and why</li>
      </ol>
    </DocPage>
  )
}
