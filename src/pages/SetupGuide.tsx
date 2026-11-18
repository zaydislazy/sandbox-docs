import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'
import { Steps } from '../components/Steps'

export function SetupGuide() {
  return (
    <DocPage
      title="Setup Guide"
      description="Everything to get Sandbox running — quick path, full install, and configuration — in one place."
      href="/setup"
    >
      <nav
        aria-label="Setup sections"
        className="mb-10 flex flex-wrap gap-2 rounded-xl border border-border bg-surface-raised/80 p-2"
      >
        {[
          { href: '#quick-path', label: 'Quick path' },
          { href: '#dependencies', label: 'Dependencies' },
          { href: '#full-install', label: 'Full install' },
          { href: '#configuration', label: 'Configuration' },
          { href: '#troubleshooting', label: 'Troubleshooting' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm text-ink-muted no-underline transition hover:bg-surface-overlay hover:text-ink"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Callout tone="tip">
        Use <code>server/server.ptr.cfg</code> for local development. PTR often enables{' '}
        <code>danger_everyone_is_admin 1</code> — never copy that to production.
      </Callout>

      <h2 id="quick-path">Quick path</h2>
      <p>Shortest route to a local PTR. Jump to Full install if a step fails.</p>
      <Steps
        items={[
          {
            title: 'Install tools',
            children: (
              <p>
                Node.js, MariaDB <strong>12.0.2</strong>, HeidiSQL, Git for Windows, and Bun. See{' '}
                <a href="#dependencies">Dependencies</a> below.
              </p>
            ),
          },
          {
            title: 'Place the FXServer artifact',
            children: (
              <p>
                Download a Windows FiveM artifact and extract it into a root-level <code>artifact/</code> folder
                so you can launch <code>artifact/FXServer.exe</code>.
              </p>
            ),
          },
          {
            title: 'Configure database + license',
            children: (
              <>
                <p>
                  Edit <code>server/config/database.ptr.cfg</code> (not a bare <code>database.cfg</code> — the
                  repo splits ptr/prod). Set <code>sv_licenseKey</code> in <code>server/server.ptr.cfg</code>.
                </p>
                <CodeBlock
                  language="bash"
                  title="server/config/database.ptr.cfg"
                  code={`set mysql_connection_string "mysql://user:pass@localhost/sandbox-framework_ptr?charset=utf8mb4"`}
                />
              </>
            ),
          },
          {
            title: 'Import database.sql',
            children: (
              <p>In HeidiSQL, create the PTR database and import the root <code>database.sql</code> dump.</p>
            ),
          },
          {
            title: 'Launch via txAdmin',
            children: (
              <p>
                Run <code>./artifact/FXServer.exe</code>, create a txAdmin account, point the recipe/paths at the
                server cfg files, enable <strong>OneSync</strong>, then restart.
              </p>
            ),
          },
          {
            title: 'Open admin tools',
            children: (
              <p>
                Join the server and use <code>/admin</code> or <code>/staff</code>. Assign real ACE roles in{' '}
                <code>server/config/permissions.cfg</code> before going live — see{' '}
                <Link to="/admin">Admin &amp; Permissions</Link>.
              </p>
            ),
          },
        ]}
      />

      <h3 id="verify">Quick verification</h3>
      <ul>
        <li>
          <code>sandbox-base</code> starts before characters/jobs (see <code>resources.cfg</code>)
        </li>
        <li>No MySQL connection errors in the console</li>
        <li>Character select NUI appears after joining</li>
      </ul>

      <h2 id="dependencies">Dependencies</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-overlay text-ink-muted">
            <tr>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="text-ink-muted">
            <tr className="border-t border-border">
              <td className="px-4 py-3">Node.js</td>
              <td className="px-4 py-3">Needed for some resource tooling / oxmysql UI tooling</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3">MariaDB 12.0.2</td>
              <td className="px-4 py-3">Primary database (README pins this version)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3">HeidiSQL</td>
              <td className="px-4 py-3">Can install via MariaDB installer</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3">Git for Windows</td>
              <td className="px-4 py-3">Clone / update the repo</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3">Bun</td>
              <td className="px-4 py-3">Used for UI tooling and this docs site</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="full-install">Full install</h2>
      <Steps
        items={[
          {
            title: 'Clone or download the source',
            children: (
              <p>
                From{' '}
                <a href="https://github.com/AutLaaw/sandbox-fivem" target="_blank" rel="noreferrer">
                  AutLaaw/sandbox-fivem
                </a>
                .
              </p>
            ),
          },
          {
            title: 'Download a FiveM Windows artifact',
            children: (
              <p>
                Place files in a new root folder <code>artifact/</code> so <code>FXServer.exe</code> lives at{' '}
                <code>artifact/FXServer.exe</code>.
              </p>
            ),
          },
          {
            title: 'Configure MariaDB connection strings',
            children: (
              <p>
                Update <code>server/config/database.ptr.cfg</code> and/or <code>database.prod.cfg</code>. The README
                says <code>database.cfg</code> — that bare filename does not exist; use the ptr/prod pair.
              </p>
            ),
          },
          {
            title: 'Add your CFX license key',
            children: (
              <p>
                Set <code>sv_licenseKey</code> in <code>server/server.ptr.cfg</code> or{' '}
                <code>server/server.prod.cfg</code>.
              </p>
            ),
          },
          {
            title: 'Import database.sql',
            children: (
              <p>
                Create the database named in your connection string, then import the root{' '}
                <code>database.sql</code>. See the <Link to="/database">Database</Link> page for table overview.
              </p>
            ),
          },
          {
            title: 'First launch + txAdmin',
            children: (
              <p>
                Launch <code>artifact/FXServer.exe</code>, create txAdmin credentials, link your FiveM account, and
                point the server profile at the correct cfg entrypoint (<code>server.ptr.cfg</code> or{' '}
                <code>server.prod.cfg</code>).
              </p>
            ),
          },
          {
            title: 'Enable OneSync',
            children: (
              <p>In txAdmin, enable OneSync, then restart. Several ox_* resources declare OneSync requirements.</p>
            ),
          },
          {
            title: 'Build React UIs if dist is missing',
            children: (
              <p>
                Most sandbox UIs expect a built <code>ui/dist</code>. If a NUI is blank, <code>cd</code> into that
                resource&apos;s <code>ui/</code> (or <code>web/</code>) and run the package scripts. See{' '}
                <Link to="/architecture/nui">React NUI</Link>.
              </p>
            ),
          },
        ]}
      />

      <h3 id="boot-chain">Boot exec chain</h3>
      <p>
        Both entry cfgs exec roughly: database → core → permissions → resources → voice → logs → ox. Details in{' '}
        <a href="#configuration">Configuration</a> below.
      </p>

      <h2 id="configuration">Configuration</h2>
      <h3 id="entrypoints">Server entrypoints</h3>
      <ul>
        <li>
          <code>server/server.ptr.cfg</code> — public test realm defaults (<code>SERVER_TYPE ptr</code>, smaller
          slots, often unlisted)
        </li>
        <li>
          <code>server/server.prod.cfg</code> — production defaults (<code>SERVER_TYPE prod</code>,{' '}
          <code>sv_pureLevel 1</code>)
        </li>
      </ul>
      <p>There is no bare <code>server.cfg</code> in this repo.</p>

      <h3 id="config-files">Config files</h3>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-overlay text-ink-muted">
            <tr>
              <th className="px-4 py-3">File</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="text-ink-muted">
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/database.ptr.cfg</td>
              <td className="px-4 py-3">PTR MySQL connection + oxmysql tuning</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/database.prod.cfg</td>
              <td className="px-4 py-3">Prod MySQL connection</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/core.ptr.cfg</td>
              <td className="px-4 py-3">Framework convars for PTR/dev</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/core.prod.cfg</td>
              <td className="px-4 py-3">Framework convars for production</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/permissions.cfg</td>
              <td className="px-4 py-3">ACE principals / example Steam grants</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/resources.cfg</td>
              <td className="px-4 py-3">ensure order for all gameplay resources</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/voice.cfg</td>
              <td className="px-4 py-3">Native audio / sending range</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/ox.cfg</td>
              <td className="px-4 py-3">ox_inventory + ox_target convars</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/ptr.logs.cfg</td>
              <td className="px-4 py-3">Discord webhook placeholders (PTR)</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 font-mono">config/prod.logs.cfg</td>
              <td className="px-4 py-3">Discord webhook placeholders (prod)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="core-convars">Important core convars</h3>
      <CodeBlock
        language="bash"
        title="server/config/core.ptr.cfg (excerpt)"
        code={`set sv_environment dev # dev/prod/test
setr log_level 1
setr sbfw_version 2.0.0
set casino_open true
setr discord_app ""
set phone_selfie_webhook ""
sets motd "SandboxRP 2.0 PTR!"
set danger_everyone_is_admin 1`}
      />
      <ul>
        <li>
          <code>sv_environment</code> — Discord logging is intended for <code>prod</code>. To test webhooks on a
          dev box, set environment to <code>prod</code> in the core cfg (per README).
        </li>
        <li>
          <code>log_level</code> — 1 trace … 5 critical
        </li>
        <li>
          <code>sbfw_version</code> — currently <code>2.0.0</code>
        </li>
        <li>
          <code>danger_everyone_is_admin</code> — grants management-level access to everyone. PTR often has this
          on; production must keep it off. See <Link to="/admin">Admin &amp; Permissions</Link>.
        </li>
      </ul>

      <Callout tone="danger" title="Security">
        Never enable <code>danger_everyone_is_admin</code> on a public production server.
      </Callout>

      <h3 id="permissions">Permissions roles</h3>
      <p>
        <code>permissions.cfg</code> documents role names as comments: <code>management</code>, <code>dev</code>,{' '}
        <code>admin</code>, <code>operations</code>. Example ACE grant:
      </p>
      <CodeBlock
        language="bash"
        code={`add_ace group.admin command allow
add_principal resource.sandbox-base group.admin
add_ace identifier.steam:someId queue.management allow`}
      />
      <Callout tone="note">
        Full staff capability checks also live in Lua (player Permissions helpers on sandbox-base). Confirm the
        exact ACE ↔ in-game role matrix during runtime.
      </Callout>

      <h3 id="ox">ox.cfg highlights</h3>
      <p>
        Inventory framework is set to <code>sandbox</code>, with slot/weight defaults and ox_target keybind
        convars in the same file. Adjust there — do not invent parallel inventory convars in core cfg.
      </p>

      <h3 id="websocket">WebSocket / MDT alerts</h3>
      <p>
        Server entry cfgs set <code>WS_MDT_ALERTS</code> (default example{' '}
        <code>http://localhost:4002/mdt-alerts</code>). <code>sandbox-ws</code> expects TLS material (
        <code>cert.pem</code> / <code>key.pem</code>) in its resource files.
      </p>

      <h2 id="troubleshooting">Installation troubleshooting</h2>
      <Callout tone="warning">
        After a fresh txAdmin link, restart once even if the first boot looked fine — the README calls this out
        explicitly.
      </Callout>
      <ul>
        <li>
          <strong>MySQL errors</strong> — connection string DB name must match the imported schema; oxmysql must
          ensure before <code>sandbox-base</code>.
        </li>
        <li>
          <strong>Resources missing</strong> — confirm txAdmin is serving <code>server/resources</code> and that{' '}
          <code>resources.cfg</code> is exec&apos;d.
        </li>
        <li>
          <strong>Maps not loading</strong> — <code>ensure [assets_maps]</code> may not match the on-disk path{' '}
          <code>resources/[assets]/[assets_maps]</code>. Confirm against a live artifact.
        </li>
      </ul>
      <p>
        More fixes: <Link to="/troubleshooting">Troubleshooting &amp; FAQ</Link>.
      </p>
    </DocPage>
  )
}
