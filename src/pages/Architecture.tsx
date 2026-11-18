import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function Architecture() {
  return (
    <DocPage
      title="Architecture"
      description="Folder layout, resource load order, sandbox-base as the platform layer, and how client, server, and NUI talk."
      href="/architecture"
    >
      <h2 id="folders">Folder structure</h2>
      <CodeBlock
        language="text"
        code={`sandbox-fivem/
├── artifact/                 # FXServer Windows artifact (you create this)
├── database.sql              # MariaDB schema dump
├── readme.md
├── docs/                     # This documentation site (NOT a FiveM resource)
└── server/
    ├── server.ptr.cfg
    ├── server.prod.cfg
    ├── config/               # database, core, permissions, resources, ox, voice, logs
    └── resources/
        ├── [sandbox]/         # Framework gameplay resources
        ├── [ox]/              # oxmysql, ox_lib, inventory, target, doorlock
        ├── [standalone]/
        ├── [cfx-default]/
        └── [assets]/`}
      />
      <Callout tone="tip">
        Keep <code>docs/</code> isolated — no <code>fxmanifest.lua</code>, and nothing in{' '}
        <code>resources.cfg</code> starts it.
      </Callout>

      <h2 id="load-order">Load order</h2>
      <p>
        Authoritative order is <code>server/config/resources.cfg</code>. Critical early ensures:
      </p>
      <ol>
        <li>mapmanager → yarn → spawnmanager</li>
        <li>oxmysql → ox_lib → sandbox-loadscreen</li>
        <li>
          <strong>sandbox-base</strong> → sandbox-queue → sandbox-pwnzor
        </li>
        <li>characters / ped / admin / HUD / … gameplay</li>
        <li>ox_inventory stack, jobs, vehicles, phone, voip, ws</li>
      </ol>
      <p>
        Most sandbox resources also <code>@</code>-include <code>sandbox-base</code> error helpers and{' '}
        <code>sandbox-pwnzor</code> client checks without declaring formal <code>dependencies</code>.
      </p>

      <h2 id="platform">sandbox-base platform</h2>
      <ul>
        <li>Middleware: <code>MiddlewareAdd</code> / <code>MiddlewareTriggerEvent</code></li>
        <li>Callbacks: <code>RegisterServerCallback</code>, <code>ServerCallback</code>, client counterparts</li>
        <li>Datastore: <code>CreateStore</code> / <code>GetStore</code> (Character objects)</li>
        <li>Players: <code>FetchSource</code>, <code>GetPlayer</code>, client local player helpers</li>
        <li>Logging, tasks/cron, waitlists, Discord helpers</li>
      </ul>
      <p>
        Deep dive: <Link to="/architecture/exports">Exports System</Link>.
      </p>

      <h2 id="communication">Client / server / NUI</h2>
      <CodeBlock
        language="text"
        code={`NUI (React)  --fetch/postMessage-->  Client Lua  --ServerCallback/net-->  Server Lua
                                      ^                                    |
                                      +------ ClientCallback/Trigger ------+
Cross-resource: exports['other']:Method(...) on the same realm`}
      />
      <p>
        Prefer sandbox-base callbacks for request/response. Prefer middleware for spawn/logout fan-out. Prefer
        exports for synchronous shared APIs (fetch character, notify, duty helpers).
      </p>

      <h2 id="react">React UIs</h2>
      <p>
        See <Link to="/architecture/nui">React NUI</Link> for Webpack vs Vite build paths and how{' '}
        <code>ui_page</code> points at built assets.
      </p>
    </DocPage>
  )
}
