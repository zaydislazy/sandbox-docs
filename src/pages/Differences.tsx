import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function Differences() {
  return (
    <DocPage
      title="Differences from Mythic"
      description="Sandbox is a Mythic fork. Use this page whenever Mythic's public docs disagree with this repository."
      href="/differences"
    >
      <Callout tone="warning">
        Mythic&apos;s Mintlify docs describe the <em>old</em> architecture (component proxy, MongoDB, React 17 +
        Redux + MUI). Do not copy those technical claims into Sandbox work.
      </Callout>

      <h2 id="exports-vs-components">Exports vs component proxy</h2>
      <p>
        Mythic registered components through a proxy (<code>RegisterComponent</code> / <code>FetchComponent</code>
        ). Sandbox has <strong>zero</strong> remaining references to those APIs. Registration is native FiveM
        exports:
      </p>
      <CodeBlock
        language="lua"
        title="Sandbox pattern"
        code={`exports("FetchCharacterSource", function(source)
  return ONLINE_CHARACTERS[source]
end)

-- consumer
local char = exports['sandbox-characters']:FetchCharacterSource(source)`}
      />
      <p>
        Files named <code>component.lua</code> are only a convention for the export surface. Details:{' '}
        <Link to="/architecture/exports">Exports System</Link>.
      </p>

      <h2 id="database">Database</h2>
      <ul>
        <li>
          <strong>Mythic docs:</strong> MongoDB primary + MySQL compatibility
        </li>
        <li>
          <strong>Sandbox:</strong> MariaDB via <code>oxmysql</code> only — schema shipped as{' '}
          <code>database.sql</code>
        </li>
      </ul>

      <h2 id="ui-stack">UI stack</h2>
      <ul>
        <li>
          <strong>Mythic docs:</strong> React 17 + Redux + MUI v5
        </li>
        <li>
          <strong>Sandbox:</strong> React NUIs under each resource; most Sandbox apps use Webpack 5 templates;
          ox_* + loadscreen use Vite. Do not assume Redux/MUI without checking that resource&apos;s{' '}
          <code>package.json</code>.
        </li>
      </ul>

      <h2 id="platform">Platform resource</h2>
      <p>
        <code>sandbox-base</code> replaces much of what Mythic&apos;s base + proxy provided: middleware, latent
        callbacks, datastore (<code>CreateStore</code>), logging, routing helpers, and player fetch APIs.
      </p>

      <h2 id="legacy-leftovers">Legacy leftovers</h2>
      <ul>
        <li>
          Event name <code>Proxy:Shared:RegisterReady</code> still exists (client trigger; some server listeners).
          Confirm task/cron startup behavior in production.
        </li>
        <li>Occasional Mythic asset/image naming leftovers are cosmetic only.</li>
      </ul>

      <h2 id="credits">Credits</h2>
      <p>
        Original Mythic Framework by Alzar &amp; Dr. Nick. Sandbox lineage includes AutLaaw and BadCodes — full
        list on the <Link to="/credits">Credits</Link> page.
      </p>
    </DocPage>
  )
}
