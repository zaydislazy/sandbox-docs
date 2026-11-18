import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocPage } from '../components/DocPage'
import { dbTables } from '../data/database'

export function DatabasePage() {
  return (
    <DocPage
      title="Database"
      description={`Schema overview from root database.sql — ${dbTables.length} CREATE TABLE names.`}
      href="/database"
    >
      <Callout tone="tip">
        Import this dump into the database named by your <code>mysql_connection_string</code>. Driver docs:{' '}
        <Link to="/guide/database">Database Patterns</Link>.
      </Callout>

      <h2 id="groups">Logical groups</h2>
      <ul>
        <li>
          <strong>Identity</strong> — characters, peds, tokens, bans, logs, sequence
        </li>
        <li>
          <strong>Economy</strong> — bank_accounts*, loans*, shop_bank_accounts
        </li>
        <li>
          <strong>World</strong> — properties*, vehicles, scenes, billboards, storage_units
        </li>
        <li>
          <strong>Jobs / MDT</strong> — jobs, mdt_*, character_parole, firearms*
        </li>
        <li>
          <strong>Phone</strong> — character_contacts/messages/emails/calls/photos/documents, chatter_*
        </li>
        <li>
          <strong>Crime crafting</strong> — weed, meth_*, moonshine_*, placed_*
        </li>
        <li>
          <strong>Dealers / racing</strong> — dealer_*, redline_*, blueline_*
        </li>
      </ul>

      <h2 id="tables">All tables</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-overlay text-ink-muted">
            <tr>
              <th className="px-3 py-2">Table</th>
              <th className="px-3 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {dbTables.map((table) => (
              <tr key={table.name} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-accent">{table.name}</td>
                <td className="px-3 py-2 text-ink-muted">{table.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DocPage>
  )
}
