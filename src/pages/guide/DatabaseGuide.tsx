import { Link } from 'react-router-dom'
import { Callout } from '../../components/Callout'
import { CodeBlock } from '../../components/CodeBlock'
import { DocPage } from '../../components/DocPage'

export function DatabaseGuide() {
  return (
    <DocPage
      title="Database Patterns"
      description="How Sandbox talks to MariaDB through oxmysql, and when to prefer datastore over raw SQL."
      href="/guide/database"
    >
      <h2 id="driver">Driver</h2>
      <p>
        Include <code>@oxmysql/lib/MySQL.lua</code> in server_scripts (already done on{' '}
        <code>sandbox-base</code> and DB-backed resources). Connection strings live in{' '}
        <code>database.ptr.cfg</code> / <code>database.prod.cfg</code>.
      </p>

      <h2 id="raw">Raw queries</h2>
      <CodeBlock
        language="lua"
        code={`local row = MySQL.single.await('SELECT * FROM characters WHERE SID = ?', { stateId })
MySQL.insert.await('INSERT INTO logs (message) VALUES (?)', { msg })`}
      />
      <Callout tone="note">
        Exact helper names (<code>.await</code> vs callbacks) vary by call site in this repo — match the surrounding
        resource. Schema overview: <Link to="/database">Database</Link>.
      </Callout>

      <h2 id="datastore">Online state vs DB</h2>
      <p>
        Logged-in characters are usually mutated through the in-memory store (<code>char:SetData</code> /{' '}
        <code>GetData</code>) created by <code>sandbox-characters</code>. Persist intentionally — do not assume every{' '}
        <code>SetData</code> writes a column. Offline reads use helpers like{' '}
        <code>FetchGetOfflineData</code>.
      </p>

      <h2 id="inventory">Inventory tables</h2>
      <p>
        <code>ox_inventory</code> creates its own <code>ox_inventory</code> table at runtime — it is not in the
        shipped <code>database.sql</code>. See the <Link to="/resources/ox_inventory">ox_inventory</Link> resource
        page.
      </p>
    </DocPage>
  )
}
