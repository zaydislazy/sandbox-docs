import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocPage } from '../components/DocPage'
import { Tabs } from '../components/Tabs'

export function Introduction() {
  return (
    <DocPage
      title="Sandbox RP Framework"
      description="Docs for Sandbox — FiveM roleplay framework with native exports, MariaDB via oxmysql, and React NUI."
      href="/"
    >
      <h2 id="start-here">Start here</h2>
      <p>New to the framework? Work through these in order.</p>
      <ol>
        <li>
          <Link to="/setup">Setup Guide</Link> — get a PTR running
        </li>
        <li>
          <Link to="/architecture">Architecture</Link> — how the pieces fit
        </li>
        <li>
          <Link to="/guide/getting-data">Getting Important Data</Link> — characters, jobs, money
        </li>
      </ol>

      <h2 id="what-is-sandbox">What is Sandbox?</h2>
      <p>
        Sandbox is a production-oriented FiveM roleplay framework. Source of truth is the codebase at{' '}
        <a href="https://github.com/AutLaaw/sandbox-fivem" target="_blank" rel="noreferrer">
          github.com/AutLaaw/sandbox-fivem
        </a>
        .
      </p>

      <Callout tone="note" title="Credits">
        Built on work from <strong>AutLaaw</strong>, <strong>BadCodes</strong>, and the original framework authors{' '}
        <strong>Alzar</strong> &amp; <strong>Dr. Nick</strong>. Full list on the{' '}
        <Link to="/credits">Credits</Link> page.
      </Callout>

      <h2 id="features">Key features</h2>
      <ul>
        <li>
          <strong>60+ sandbox resources</strong> plus ox_lib / ox_inventory / ox_target / ox_doorlock
        </li>
        <li>
          <strong>Platform resource</strong> <code>sandbox-base</code> — middleware, callbacks, datastore, logging,
          tasks
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
      <Tabs
        items={[
          {
            id: 'backend',
            label: 'Backend',
            content: (
              <ul>
                <li>Lua (client &amp; server)</li>
                <li>Node/JS where needed (<code>sandbox-base</code>, <code>sandbox-ws</code>)</li>
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
                <li>Most Sandbox UIs: React + Webpack 5 under each resource <code>ui/</code></li>
                <li>ox_* and loadscreen: React + Vite</li>
                <li>
                  Loaded via <code>ui_page</code> → built <code>dist</code>/<code>build</code>
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
                <li>Game build set in server cfg (currently 3407)</li>
                <li>PTR vs prod configs under <code>server/config/</code></li>
              </ul>
            ),
          },
        ]}
      />

      <h2 id="where-to-go">Where to go next</h2>
      <ul>
        <li>
          <Link to="/setup">Setup Guide</Link>
        </li>
        <li>
          <Link to="/architecture">Architecture</Link>
        </li>
        <li>
          <Link to="/guide/getting-data">Getting Important Data</Link>
        </li>
        <li>
          <Link to="/exports">Exports API</Link>
        </li>
        <li>
          <Link to="/contribute">Contributing</Link>
        </li>
      </ul>
    </DocPage>
  )
}
