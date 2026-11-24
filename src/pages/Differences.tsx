import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function Differences() {
  return (
    <DocPage
      title="Coming from older forks"
      description="Quick notes if you used an older component-proxy / Mongo-based stack before Sandbox."
      href="/differences"
    >
      <Callout tone="note">
        Sandbox uses native FiveM exports and MariaDB. Older public docs that talk about component proxies or Mongo
        don&apos;t apply here.
      </Callout>

      <h2 id="exports">Exports (not components)</h2>
      <p>
        Cross-resource APIs are plain <code>exports(&quot;Name&quot;, fn)</code>. Files named{' '}
        <code>component.lua</code> are just where a lot of those live — naming only.
      </p>
      <CodeBlock
        language="lua"
        code={`exports("FetchCharacterSource", function(source)
  return ONLINE_CHARACTERS[source]
end)

local char = exports['sandbox-characters']:FetchCharacterSource(source)`}
      />
      <p>
        More detail: <Link to="/architecture/exports">Exports System</Link>.
      </p>

      <h2 id="database">Database</h2>
      <p>
        MariaDB via <code>oxmysql</code> only. Schema ships as <code>database.sql</code>.
      </p>

      <h2 id="ui-stack">UI stack</h2>
      <p>
        React NUIs under each resource. Most Sandbox apps use Webpack 5; ox_* + loadscreen use Vite. Check that
        resource&apos;s <code>package.json</code> before assuming Redux/MUI.
      </p>

      <h2 id="platform">Platform resource</h2>
      <p>
        <code>sandbox-base</code> covers middleware, callbacks, datastore (<code>CreateStore</code>), logging, routing
        helpers, and player fetch APIs.
      </p>

      <h2 id="legacy">Legacy leftovers</h2>
      <ul>
        <li>
          Event <code>Proxy:Shared:RegisterReady</code> still exists in a few places — confirm task/cron startup if
          periodic jobs never fire.
        </li>
        <li>Some old asset/image names linger cosmetically.</li>
      </ul>
    </DocPage>
  )
}
