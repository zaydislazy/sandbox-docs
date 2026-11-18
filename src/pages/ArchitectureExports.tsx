import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function ArchitectureExports() {
  return (
    <DocPage
      title="Exports System"
      description="How Sandbox replaced Mythic components with native FiveM exports plus sandbox-base platform APIs."
      href="/architecture/exports"
    >
      <Callout tone="note">
        Despite the README calling this a “fully custom exports system”, the runtime mechanism is standard Cfx
        exports. What is custom is the <em>convention</em> and the <code>sandbox-base</code> middleware/callback
        layer around them.
      </Callout>

      <h2 id="register">Registering</h2>
      <CodeBlock
        language="lua"
        code={`-- often in server/component.lua or core/*.lua
exports("FetchCharacterSource", function(source)
  return ONLINE_CHARACTERS[source]
end)`}
      />
      <p>
        JS resources use the same API, e.g. <code>sandbox-ws/server.js</code> with <code>exports(&apos;emit&apos;,
        …)</code>.
      </p>

      <h2 id="consume">Consuming</h2>
      <CodeBlock
        language="lua"
        code={`local char = exports['sandbox-characters']:FetchCharacterSource(source)
exports['sandbox-hud']:Notification(source, 'error', 'Failed to Go On Duty')
exports['sandbox-base']:LoggerInfo('Jobs', 'Salary Thread Starting')`}
      />

      <h2 id="startup">Startup &amp; dependencies</h2>
      <ul>
        <li>
          <code>resources.cfg</code> ensures <code>sandbox-base</code> early
        </li>
        <li>
          <code>sh_init.lua</code> waits until <code>GetSbfwVersion()</code> is available, then fires watermark
          events
        </li>
        <li>
          Resources typically <code>Wait(1000)</code> in <code>onResourceStart</code> before registering
          callbacks/middleware
        </li>
        <li>
          Some flows block until a peer export returns non-nil (e.g. wait for <code>FetchSource</code>)
        </li>
      </ul>

      <h2 id="middleware">Middleware</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-base']:MiddlewareAdd('Characters:Spawning', function(source)
  -- per-player setup
end, 1)

-- producer (characters)
exports['sandbox-base']:MiddlewareTriggerEvent('Characters:Spawning', source, cData)`}
      />

      <h2 id="callbacks">Callbacks</h2>
      <p>
        Sandbox uses its own callback bus (not ox_lib&apos;s <code>lib.callback</code>, though ox resources still
        use that). Client → server:
      </p>
      <CodeBlock
        language="lua"
        code={`-- server
exports['sandbox-base']:RegisterServerCallback('Characters:Logout', function(source, data, cb)
  cb(true)
end)

-- client
exports['sandbox-base']:ServerCallback('Characters:Logout', {}, function()
  LocalPlayer.state.Character = nil
end)`}
      />

      <h2 id="catalog">Catalog</h2>
      <p>
        Browse every discovered export in the <Link to="/exports">Exports API</Link>. Core APIs have richer
        signatures; the rest are listed with realm/file until parameters are confirmed from call sites.
      </p>
    </DocPage>
  )
}
