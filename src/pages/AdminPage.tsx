import { Callout } from '../components/Callout'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function AdminPage() {
  return (
    <DocPage
      title="Admin & Permissions"
      description="Staff roles, ACE configuration, admin NUI entrypoints, and the danger_everyone_is_admin footgun."
      href="/admin"
    >
      <h2 id="commands">Admin entry</h2>
      <p>
        Use <code>/admin</code> or <code>/staff</code> to open the admin tool provided by{' '}
        <code>sandbox-admin</code> (React UI under <code>ui/</code>).
      </p>

      <h2 id="roles">Documented roles</h2>
      <p>
        <code>server/config/permissions.cfg</code> lists role names as comments:
      </p>
      <ul>
        <li>
          <code>management</code>
        </li>
        <li>
          <code>dev</code>
        </li>
        <li>
          <code>admin</code>
        </li>
        <li>
          <code>operations</code>
        </li>
      </ul>
      <CodeBlock
        language="bash"
        title="permissions.cfg excerpt"
        code={`add_ace group.admin command allow
add_principal resource.sandbox-base group.admin
add_ace identifier.steam:someId queue.management allow # Name`}
      />

      <Callout tone="danger" title="danger_everyone_is_admin">
        Setting <code>danger_everyone_is_admin</code> to <code>1</code> in <code>core.ptr.cfg</code> / core cfg
        grants management permissions to <strong>everyone</strong>. The README marks this as highly discouraged for
        production. PTR often enables it for convenience — turn it off before any public audience.
      </Callout>

      <h2 id="logging">Discord logging</h2>
      <p>
        Webhooks live in <code>ptr.logs.cfg</code> / <code>prod.logs.cfg</code>. Logging is intended when{' '}
        <code>sv_environment</code> is <code>prod</code>. To test on a development machine, temporarily set
        environment to <code>prod</code> in the core cfg.
      </p>

      <h2 id="runtime">Runtime checks</h2>
      <p>
        In Lua, staff checks commonly go through the player object from{' '}
        <code>exports[&apos;sandbox-base&apos;]:FetchSource(source)</code> and its Permissions helpers. Confirm
        the full Permissions method list against <code>sandbox-base</code> player modules when extending staff
        tools.
      </p>
    </DocPage>
  )
}
