import { Link } from 'react-router-dom'
import { Callout } from '../../components/Callout'
import { CodeBlock } from '../../components/CodeBlock'
import { DocPage } from '../../components/DocPage'
import { Tabs } from '../../components/Tabs'

export function GettingData() {
  return (
    <DocPage
      title="Getting Important Data"
      description="The patterns Sandbox resources actually use for player accounts, characters, jobs, and client state."
      href="/guide/getting-data"
    >
      <Callout tone="tip">
        If you only memorize four APIs: <code>FetchCharacterSource</code>, <code>FetchSource</code>,{' '}
        <code>LocalPlayer.state.Character</code>, and <code>ServerCallback</code>.
      </Callout>

      <h2 id="server-character">Server — character by source</h2>
      <CodeBlock
        language="lua"
        code={`local char = exports['sandbox-characters']:FetchCharacterSource(source)
if char ~= nil then
  local sid = char:GetData('SID')
  local jobs = char:GetData('Jobs') or {}
  char:SetData('SomeField', value)
end`}
      />

      <h2 id="server-lookups">Server — lookups</h2>
      <CodeBlock
        language="lua"
        code={`local bySid = exports['sandbox-characters']:FetchBySID(stateId)
local offlineJobs = exports['sandbox-characters']:FetchGetOfflineData(stateId, 'Jobs')
local all = exports['sandbox-characters']:FetchAllCharacters()`}
      />

      <h2 id="server-account">Server — account / staff (not character)</h2>
      <CodeBlock
        language="lua"
        code={`local player = exports['sandbox-base']:FetchSource(source)
-- or
local player = exports['sandbox-base']:GetPlayer(source)
if player and player.Permissions:IsStaff() then
  -- staff path
end`}
      />

      <h2 id="client">Client — character &amp; player</h2>
      <Tabs
        items={[
          {
            id: 'state',
            label: 'State bag / store',
            content: (
              <CodeBlock
                language="lua"
                code={`local char = LocalPlayer.state.Character
if char then
  local xmas = char:GetData('XmasDaily')
  local jobs = char:GetData('Jobs') or {}
end`}
              />
            ),
          },
          {
            id: 'helpers',
            label: 'Helpers',
            content: (
              <CodeBlock
                language="lua"
                code={`local char = exports['sandbox-base']:FetchCharacter()
local player = exports['sandbox-base']:GetLocalPlayer()`}
              />
            ),
          },
        ]}
      />

      <h2 id="lifecycle">Hook spawn / logout</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-base']:MiddlewareAdd('Characters:Spawning', function(source)
  -- character is entering the world
end)

exports['sandbox-base']:MiddlewareAdd('Characters:Logout', function(source)
  -- cleanup
end)`}
      />

      <h2 id="jobs">Jobs</h2>
      <p>
        Job mutations and duty typically go through <code>sandbox-jobs</code> exports (<code>GiveJob</code>,{' '}
        <code>DutyOn</code>, <code>HasPermission</code>, …). Browse them in the{' '}
        <Link to="/resources/sandbox-jobs">sandbox-jobs</Link> reference and{' '}
        <Link to="/exports">Exports API</Link>.
      </p>

      <h2 id="hud">Feedback to players</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-hud']:Notification(source, 'error', 'Failed to Go On Duty')`}
      />
    </DocPage>
  )
}
