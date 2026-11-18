import { DocPage } from '../../components/DocPage'

export function BestPractices() {
  return (
    <DocPage
      title="Best Practices"
      description="Conventions that match how this codebase is actually structured."
      href="/guide/best-practices"
    >
      <h2 id="do">Do</h2>
      <ul>
        <li>
          Ensure <code>sandbox-base</code> (and oxmysql when querying) before your resource
        </li>
        <li>
          Expose cross-resource APIs via <code>exports(&quot;Name&quot;, fn)</code> with stable PascalCase names
        </li>
        <li>
          Use middleware for spawn/logout fan-out instead of hard-coding every consumer
        </li>
        <li>
          Use sandbox-base callbacks for request/response between client and server
        </li>
        <li>
          Keep React UI builds deterministic; ship <code>dist</code>/<code>build</code> for production hosts
        </li>
        <li>
          Treat PTR <code>danger_everyone_is_admin</code> as local-only
        </li>
      </ul>

      <h2 id="dont">Don&apos;t</h2>
      <ul>
        <li>
          Reintroduce <code>RegisterComponent</code> / <code>FetchComponent</code>
        </li>
        <li>
          Call exports before the owning resource has started (gate with ensure order or waits)
        </li>
        <li>
          Assume Mythic MongoDB / Redux / MUI docs apply
        </li>
        <li>
          Put this <code>docs/</code> site into <code>resources.cfg</code>
        </li>
        <li>
          Commit real Discord webhooks or CFX keys into cfg files
        </li>
      </ul>

      <h2 id="pwnzor">Pwnzor includes</h2>
      <p>
        Most client manifests pull <code>@sandbox-pwnzor/client/check.lua</code>. Keep that include when cloning
        manifests so integrity checks stay consistent.
      </p>
    </DocPage>
  )
}
