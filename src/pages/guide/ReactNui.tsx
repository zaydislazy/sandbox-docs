import { CodeBlock } from '../../components/CodeBlock'
import { DocPage } from '../../components/DocPage'

export function ReactNuiGuide() {
  return (
    <DocPage
      title="Building a React NUI"
      description="Wire a React app into a Sandbox resource using the same patterns as phone/HUD/admin."
      href="/guide/react-nui"
    >
      <h2 id="layout">Suggested layout</h2>
      <CodeBlock
        language="text"
        code={`sandbox-myfeature/
├── fxmanifest.lua          # ui_page 'ui/dist/index.html'
├── client/
│   └── nui.lua             # SetNuiFocus, SendNUIMessage, RegisterNUICallback
└── ui/
    ├── package.json
    ├── webpack / vite config
    └── src/`}
      />

      <h2 id="client">Client bridge sketch</h2>
      <CodeBlock
        language="lua"
        code={`RegisterNUICallback('close', function(_, cb)
  SetNuiFocus(false, false)
  cb({ ok = true })
end)

RegisterCommand('myui', function()
  SetNuiFocus(true, true)
  SendNUIMessage({ action = 'open', payload = {} })
end)`}
      />

      <h2 id="react">React listener sketch</h2>
      <CodeBlock
        language="tsx"
        code={`useEffect(() => {
  const handler = (event: MessageEvent) => {
    if (event.data?.action === 'open') {
      // show UI
    }
  }
  window.addEventListener('message', handler)
  return () => window.removeEventListener('message', handler)
}, [])

function close() {
  fetch(\`https://\${GetParentResourceName()}/close\`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}`}
      />

      <h2 id="build">Build</h2>
      <p>
        Mirror an existing sibling UI (copy <code>sandbox-menu/ui</code> or <code>sandbox-hud/ui</code> as a
        starting point) rather than inventing a third bundler. Commit or CI-build <code>dist</code> so the server
        can run without a local Node toolchain if that is your ops preference.
      </p>
    </DocPage>
  )
}
