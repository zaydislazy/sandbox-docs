import { Link } from 'react-router-dom'
import { DocPage } from '../components/DocPage'

export function Credits() {
  return (
    <DocPage
      title="Credits"
      description="People and projects behind Sandbox and this docs site."
      href="/credits"
    >
      <h2 id="sandbox">Sandbox RP Framework</h2>
      <ul>
        <li>
          <strong>AutLaaw</strong> — current maintainer (
          <a href="https://github.com/AutLaaw/sandbox-fivem" target="_blank" rel="noreferrer">
            AutLaaw/sandbox-fivem
          </a>
          )
        </li>
        <li>
          <strong>BadCodes</strong> — original Sandbox lineage (
          <a href="https://github.com/BadCodesGG/sandbox-fivem" target="_blank" rel="noreferrer">
            BadCodesGG/sandbox-fivem
          </a>
          )
        </li>
      </ul>

      <h2 id="original-authors">Original framework authors</h2>
      <ul>
        <li>
          <strong>Alzar</strong>
        </li>
        <li>
          <strong>Dr. Nick</strong>
        </li>
      </ul>
      <p>
        Sandbox is released with their permission. If you&apos;re migrating from an older fork, see{' '}
        <Link to="/differences">Coming from older forks</Link>.
      </p>

      <h2 id="docs">These docs</h2>
      <ul>
        <li>
          Maintained by{' '}
          <a href="https://github.com/zaydislazy" target="_blank" rel="noreferrer">
            zaydislazy
          </a>
        </li>
      </ul>

      <h2 id="upstream">Other upstreams in-tree</h2>
      <ul>
        <li>Overextended (ox_lib, ox_inventory, ox_target, ox_doorlock)</li>
        <li>Cfx.re / FiveM platform resources</li>
        <li>Project Error and other NUI boilerplates credited in individual resource READMEs</li>
      </ul>
    </DocPage>
  )
}
