import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { DocPage } from '../components/DocPage'

export function Credits() {
  return (
    <DocPage
      title="Credits"
      description="People and projects behind Sandbox and these unofficial docs."
      href="/credits"
    >
      <Callout tone="note">
        Sandbox is released with permission from the original Mythic Framework authors. This docs site is unofficial
        and community-maintained.
      </Callout>

      <h2 id="sandbox">Sandbox RP Framework</h2>
      <ul>
        <li>
          <strong>AutLaaw</strong> — current Sandbox maintainer / publisher (
          <a href="https://github.com/AutLaaw/sandbox-fivem" target="_blank" rel="noreferrer">
            AutLaaw/sandbox-fivem
          </a>
          ).
        </li>
        <li>
          <strong>BadCodes</strong> — original Sandbox developers / earlier Sandbox lineage (
          <a href="https://github.com/BadCodesGG/sandbox-fivem" target="_blank" rel="noreferrer">
            BadCodesGG/sandbox-fivem
          </a>
          ).
        </li>
      </ul>

      <h2 id="mythic">Mythic Framework</h2>
      <p>
        Sandbox started as a heavily modified Mythic fork. Original Mythic Framework authors:
      </p>
      <ul>
        <li>
          <strong>Alzar</strong>
        </li>
        <li>
          <strong>Dr. Nick</strong>
        </li>
      </ul>
      <p>
        Public Mythic docs still exist, but many architecture claims there do not apply to Sandbox — see{' '}
        <Link to="/differences">Differences from Mythic</Link>.
      </p>

      <h2 id="docs">These docs</h2>
      <ul>
        <li>
          Maintained by{' '}
          <a href="https://github.com/zaydislazy" target="_blank" rel="noreferrer">
            zaydislazy
          </a>{' '}
          — not an official Sandbox RP or Mythic publication.
        </li>
      </ul>

      <h2 id="upstream">Other upstreams you will see in-tree</h2>
      <ul>
        <li>Overextended (ox_lib, ox_inventory, ox_target, ox_doorlock)</li>
        <li>Cfx.re / FiveM platform resources</li>
      </ul>
    </DocPage>
  )
}
