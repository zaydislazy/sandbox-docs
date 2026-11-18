import { Link } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import { DocPage } from '../components/DocPage'

export function ArchitectureNui() {
  return (
    <DocPage
      title="React NUI"
      description="How Sandbox and ox React UIs are built, where dist lands, and how FiveM loads them."
      href="/architecture/nui"
    >
      <h2 id="two-toolchains">Two toolchains</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-overlay text-ink-muted">
            <tr>
              <th className="px-3 py-2">Stack</th>
              <th className="px-3 py-2">Resources</th>
              <th className="px-3 py-2">Scripts</th>
            </tr>
          </thead>
          <tbody className="text-ink-muted">
            <tr className="border-t border-border">
              <td className="px-3 py-2">Webpack 5</td>
              <td className="px-3 py-2">
                admin, characters, chat, finance, games, hud, laptop, mdt, menu, ped, phone, radar, radio, taxi
              </td>
              <td className="px-3 py-2 font-mono">
                bun/npm start · build → ui/dist
              </td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-3 py-2">Vite</td>
              <td className="px-3 py-2">sandbox-loadscreen, ox_lib, ox_inventory, ox_target, ox_doorlock</td>
              <td className="px-3 py-2 font-mono">start · build → web/build</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="loading">How NUI loads</h2>
      <p>
        Each resource&apos;s <code>fxmanifest.lua</code> sets <code>ui_page</code> to the built HTML (for example{' '}
        <code>ui/dist/index.html</code>) and lists the built assets under <code>files</code>. Client Lua opens/closes
        focus with <code>SetNuiFocus</code> and talks to React through <code>SendNUIMessage</code> /{' '}
        <code>RegisterNUICallback</code>.
      </p>

      <h2 id="dev-loop">Typical Sandbox UI rebuild</h2>
      <CodeBlock
        language="bash"
        code={`cd server/resources/[sandbox]/sandbox-phone/ui
bun install   # or npm install
bun run build # produces ui/dist
# restart the resource or server so FiveM picks up new files`}
      />

      <h2 id="guide">Developer guide</h2>
      <p>
        For scaffolding a new UI inside a custom resource, see{' '}
        <Link to="/guide/react-nui">Building a React NUI</Link>.
      </p>
    </DocPage>
  )
}
