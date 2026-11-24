import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocPage } from '../components/DocPage'

export function Troubleshooting() {
  return (
    <DocPage
      title="Troubleshooting & FAQ"
      description="Common setup failures, runtime gotchas found in this repo, and quick answers for new Sandbox developers."
      href="/troubleshooting"
    >
      <h2 id="faq">FAQ</h2>
      <h3 id="where-database-cfg">Where is database.cfg?</h3>
      <p>
        Use <code>server/config/database.ptr.cfg</code> or <code>database.prod.cfg</code>. The README shorthand does
        not match the filenames on disk.
      </p>

      <h3 id="blank-nui">Blank phone / HUD / admin?</h3>
      <p>
        Rebuild that resource&apos;s <code>ui/</code> or <code>web/</code> package so <code>dist</code>/
        <code>build</code> exists, then restart the resource. See <Link to="/architecture/nui">React NUI</Link>.
      </p>

      <h3 id="how-get-character">How do I get the current character?</h3>
      <p>
        Server: <code>exports[&apos;sandbox-characters&apos;]:FetchCharacterSource(source)</code>. Client:{' '}
        <code>LocalPlayer.state.Character</code>. Full guide:{' '}
        <Link to="/guide/getting-data">Getting Important Data</Link>.
      </p>

      <h3 id="components">Where did FetchComponent go?</h3>
      <p>
        Gone. Call exports on the owning resource instead, e.g.{' '}
        <code>exports[&apos;sandbox-characters&apos;]:FetchCharacterSource(source)</code>.
      </p>

      <h2 id="common-errors">Common errors</h2>
      <ul>
        <li>
          <strong>oxmysql connection failures</strong> — fix connection string, ensure MariaDB is running, import{' '}
          <code>database.sql</code>, ensure oxmysql before sandbox-base.
        </li>
        <li>
          <strong>OneSync missing</strong> — enable in txAdmin; ox resources require it.
        </li>
        <li>
          <strong>Export nil values</strong> — resource order / player not selected yet; wait for character
          middleware or FetchSource.
        </li>
        <li>
          <strong>Assets maps missing</strong> — <code>ensure [assets_maps]</code> may not match{' '}
          <code>[assets]/[assets_maps]</code> on disk. Confirm the path on a live server.
        </li>
        <li>
          <strong>sandbox-ws failures</strong> — missing cert/key or <code>WS_MDT_ALERTS</code> target down.
        </li>
      </ul>

      <Callout tone="warning">
        If periodic jobs (loans, warrants, etc.) never tick, investigate whether{' '}
        <code>Proxy:Shared:RegisterReady</code> server listeners ever run — see Events reference.
      </Callout>

      <h2 id="support">Support</h2>
      <ul>
        <li>
          Discord (from README): <a href="https://discord.gg/jPnHguCxNK">discord.gg/jPnHguCxNK</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/AutLaaw/sandbox-fivem">AutLaaw/sandbox-fivem</a>
        </li>
      </ul>
    </DocPage>
  )
}
