import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocPage } from '../components/DocPage'
import { Tabs } from '../components/Tabs'

export function Introduction() {
  return (
    <DocPage
      title="Sandbox RP Framework"
      description="Newbie-friendly, unofficial docs for Sandbox — a heavily modified Mythic Framework fork with native FiveM exports, MariaDB via oxmysql, and React NUI."
      href="/"
    >
      <Callout tone="warning" title="Unofficial docs">
        This site is a community resource maintained by{' '}
        <a href="https://github.com/zaydislazy" target="_blank" rel="noreferrer">
          zaydislazy
        </a>
        . It is <strong>not</strong> official Sandbox RP or Mythic documentation. Always double-check against the
        codebase when something matters for production.
      </Callout>

      <h2 id="start-here">Start here (new to Sandbox?)</h2>
      <p>
        If you just got the framework and want a running server, follow these pages in order. Skip ahead only if
        you already know what you&apos;re doing.
      </p>
      <ol>
        <li>
          <Link to="/setup">Setup Guide</Link> — quick path, full install, and configuration in one page
        </li>
        <li>
          <Link to="/differences">Differences from Mythic</Link> — what changed if you know Mythic already
        </li>
        <li>
          <Link to="/architecture">Architecture</Link> — how the pieces fit together
        </li>
      </ol>

      <h2 id="what-is-sandbox">What is Sandbox?</h2>
      <p>
        Sandbox is a production-oriented FiveM roleplay framework. These docs are written from the codebase at{' '}
        <a href="https://github.com/AutLaaw/sandbox-fivem" target="_blank" rel="noreferrer">
          github.com/AutLaaw/sandbox-fivem
        </a>
        . The workspace files are the source of truth — not Mythic&apos;s public docs.
      </p>

      <Callout tone="note" title="Credits">
        Released with full permissions from the original Mythic Framework authors, <strong>Alzar</strong> and{' '}
        <strong>Dr. Nick</strong>.
      </Callout>

      <h2 id="relationship-to-mythic">Relationship to Mythic</h2>
      <p>
        Sandbox started as Mythic. The old <code>RegisterComponent</code> / <code>FetchComponent</code> proxy
        system is gone. Resources now register ordinary FiveM exports (often in <code>component.lua</code>{' '}
        files — a naming convention only) and call each other with{' '}
        <code>exports[&apos;resource&apos;]:Name(...)</code>.
      </p>
      <p>
        New to that change? Read <Link to="/differences">Differences from Mythic</Link> before writing resources.
      </p>

      <h2 id="features">Key features</h2>
      <ul>
        <li>
          <strong>60+ sandbox resources</strong> plus ox_lib / ox_inventory / ox_target / ox_doorlock
        </li>
        <li>
          <strong>Platform resource</strong> <code>sandbox-base</code> — middleware, callbacks, datastore,
          logging, tasks
        </li>
        <li>
          <strong>React NUI</strong> for phone, HUD, MDT, laptop, admin, chat, and more
        </li>
        <li>
          <strong>MariaDB</strong> via oxmysql (<code>database.sql</code> ships ~80 tables)
        </li>
        <li>
          <strong>Staff tools</strong> at <code>/admin</code> and <code>/staff</code>
        </li>
      </ul>

      <h2 id="stack">Technology stack</h2>
      <p>Pick a tab for the layer you care about — you do not need all of this on day one.</p>
      <Tabs
        items={[
          {
            id: 'backend',
            label: 'Backend',
            content: (
              <ul>
                <li>Lua (client &amp; server gameplay)</li>
                <li>Node/JS where needed (<code>sandbox-base</code> helpers, <code>sandbox-ws</code>)</li>
                <li>MariaDB 12.x + oxmysql</li>
                <li>Native FiveM exports + sandbox-base middleware/callbacks</li>
              </ul>
            ),
          },
          {
            id: 'frontend',
            label: 'Frontend',
            content: (
              <ul>
                <li>Sandbox UIs: React + Webpack 5 (templates under each resource <code>ui/</code>)</li>
                <li>ox_* and loadscreen: React + Vite</li>
                <li>
                  NUI loaded via <code>ui_page</code> pointing at built <code>dist</code>/<code>build</code>
                </li>
              </ul>
            ),
          },
          {
            id: 'fivem',
            label: 'FiveM',
            content: (
              <ul>
                <li>Windows FXServer artifact in root <code>artifact/</code></li>
                <li>OneSync required</li>
                <li>
                  Game build set in <code>server.ptr.cfg</code> / <code>server.prod.cfg</code> (currently 3407)
                </li>
                <li>PTR vs prod config split under <code>server/config/</code></li>
              </ul>
            ),
          },
        ]}
      />

      <h2 id="where-to-go">Where to go next</h2>
      <ul>
        <li>
          <Link to="/setup">Setup Guide</Link> — get a PTR running
        </li>
        <li>
          <Link to="/architecture">Architecture</Link> — load order and how pieces talk
        </li>
        <li>
          <Link to="/guide/getting-data">Getting Important Data</Link> — player/character patterns
        </li>
        <li>
          <Link to="/exports">Exports API</Link> — searchable catalog (~1,390 exports)
        </li>
      </ul>
    </DocPage>
  )
}
