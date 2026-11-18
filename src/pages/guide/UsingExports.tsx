import { Link } from 'react-router-dom'
import { CodeBlock } from '../../components/CodeBlock'
import { DocPage } from '../../components/DocPage'

export function UsingExports() {
  return (
    <DocPage
      title="Using Exports"
      description="Register and consume exports the Sandbox way, including waiting for peer resources."
      href="/guide/exports"
    >
      <h2 id="register">Register</h2>
      <CodeBlock
        language="lua"
        code={`exports("HasPermission", function(source, permission)
  local char = exports['sandbox-characters']:FetchCharacterSource(source)
  if not char then return false end
  -- ...
  return true
end)`}
      />

      <h2 id="consume">Consume</h2>
      <CodeBlock
        language="lua"
        code={`if exports['sandbox-jobs']:HasPermission(source, 'police_mdt') then
  -- allow
end`}
      />

      <h2 id="wait">Waiting for availability</h2>
      <CodeBlock
        language="lua"
        code={`while exports['sandbox-base']:FetchSource(source) == nil do
  Wait(1000)
end`}
      />

      <h2 id="reference">Reference</h2>
      <p>
        Architecture deep dive: <Link to="/architecture/exports">Exports System</Link>. Full catalog:{' '}
        <Link to="/exports">Exports API</Link>.
      </p>
    </DocPage>
  )
}
