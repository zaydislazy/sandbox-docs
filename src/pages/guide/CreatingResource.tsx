import { Link } from 'react-router-dom'
import { Callout } from '../../components/Callout'
import { CodeBlock } from '../../components/CodeBlock'
import { DocPage } from '../../components/DocPage'
import { Steps } from '../../components/Steps'

export function CreatingResource() {
  return (
    <DocPage
      title="Creating a Resource"
      description="Scaffold a Sandbox gameplay resource that follows this repo's conventions."
      href="/guide/creating-a-resource"
    >
      <Steps
        items={[
          {
            title: 'Create the folder',
            children: (
              <p>
                Add <code>server/resources/[sandbox]/sandbox-myfeature/</code> (or another category folder if it
                fits better).
              </p>
            ),
          },
          {
            title: 'Add fxmanifest.lua',
            children: (
              <CodeBlock
                language="lua"
                code={`fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'sandbox-myfeature'
description 'My feature'
version '1.0.0'

shared_scripts {
  'shared/**/*.lua',
}

client_scripts {
  '@sandbox-base/exports/cl_error.lua',
  '@sandbox-pwnzor/client/check.lua',
  'client/**/*.lua',
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  'server/**/*.lua',
}`}
              />
            ),
          },
          {
            title: 'Ensure it in resources.cfg',
            children: (
              <p>
                Append <code>ensure sandbox-myfeature</code> after its dependencies (always after{' '}
                <code>sandbox-base</code>).
              </p>
            ),
          },
          {
            title: 'Register exports & callbacks on start',
            children: (
              <CodeBlock
                language="lua"
                code={`AddEventHandler('onResourceStart', function(resource)
  if resource ~= GetCurrentResourceName() then return end
  Wait(1000)
  exports['sandbox-base']:RegisterServerCallback('MyFeature:Ping', function(source, data, cb)
    cb({ ok = true })
  end)
end)

exports('GetConfig', function()
  return MyConfig
end)`}
              />
            ),
          },
        ]}
      />

      <Callout tone="tip">
        Put the public API in <code>server/component.lua</code> / <code>client/component.lua</code> so other
        developers can find exports quickly — matching the rest of this codebase.
      </Callout>

      <p>
        Next: <Link to="/guide/exports">Using Exports</Link> · <Link to="/guide/getting-data">Getting Important Data</Link>
      </p>
    </DocPage>
  )
}
