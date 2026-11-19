import { Link } from 'react-router-dom'
import { Callout } from '../../components/Callout'
import { CodeBlock } from '../../components/CodeBlock'
import { DocPage } from '../../components/DocPage'
import { Tabs } from '../../components/Tabs'

export function GettingData() {
  return (
    <DocPage
      title="Getting Important Data"
      description="Player accounts, local character stores, GetData keys, nested options, jobs, money, and the other lookups Sandbox resources actually use."
      href="/guide/getting-data"
    >
      <Callout tone="tip">
        Memorize four entry points: <code>FetchCharacterSource</code>, <code>FetchSource</code>,{' '}
        <code>LocalPlayer.state.Character</code>, and <code>ServerCallback</code>. Everything else hangs off those.
      </Callout>

      <h2 id="mental-model">Player vs character</h2>
      <p>
        A <strong>player</strong> is the FiveM session / account (<code>sandbox-base</code>). A{' '}
        <strong>character</strong> is the selected RP identity (<code>sandbox-characters</code> store). Staff ACE /
        groups live on the player. Name, jobs, cash, licenses, phone, and status live on the character.
      </p>
      <CodeBlock
        language="lua"
        code={`-- server
local player = exports['sandbox-base']:FetchSource(source)          -- account / staff
local char = exports['sandbox-characters']:FetchCharacterSource(source) -- may be nil before select

-- client (after spawn)
local player = exports['sandbox-base']:GetLocalPlayer()
local char = LocalPlayer.state.Character  -- or exports['sandbox-base']:FetchCharacter()`}
      />
      <Callout tone="warning">
        Always nil-check the character. Players can sit on character select, be logging out, or drop mid-callback.
      </Callout>

      <h2 id="server-character">Server — character by source</h2>
      <CodeBlock
        language="lua"
        code={`local char = exports['sandbox-characters']:FetchCharacterSource(source)
if not char then return end

local sid = char:GetData('SID')
local first = char:GetData('First')
local last = char:GetData('Last')
local jobs = char:GetData('Jobs') or {}
local cash = char:GetData('Cash') or 0

-- mutate + sync to client (most keys)
char:SetData('SomeField', value)

-- dump everything currently in the store
local all = char:GetData()`}
      />

      <h2 id="server-lookups">Server — other character lookups</h2>
      <CodeBlock
        language="lua"
        code={`local bySid = exports['sandbox-characters']:FetchBySID(stateId)
local byId = exports['sandbox-characters']:FetchByID(characterId)
local byField = exports['sandbox-characters']:FetchCharacterData('Phone', phoneNumber)
local allOnline = exports['sandbox-characters']:FetchAllCharacters()
local count = exports['sandbox-characters']:FetchCountCharacters()

-- offline (DB read; prefer for players who are not online)
local offlineJobs = exports['sandbox-characters']:FetchGetOfflineData(stateId, 'Jobs')
local offlinePhone = exports['sandbox-characters']:FetchGetOfflineData(stateId, 'Phone')`}
      />

      <h2 id="client-local">Client — local character</h2>
      <p>
        After select/spawn, the client mirror is <code>LocalPlayer.state.Character</code> — a datastore with the same{' '}
        <code>GetData</code> / <code>SetData</code> surface. Server writes sync via{' '}
        <code>Characters:Client:SetData</code>; listen for <code>Characters:Client:Updated</code> when you care about
        a key changing.
      </p>
      <Tabs
        items={[
          {
            id: 'state',
            label: 'State store',
            content: (
              <CodeBlock
                language="lua"
                code={`local char = LocalPlayer.state.Character
if not char then return end

local sid = char:GetData('SID')
local jobs = char:GetData('Jobs') or {}
local licenses = char:GetData('Licenses') or {}
local status = char:GetData('Status') or {}

-- SID is also mirrored on the player state bag after login
local bagSid = LocalPlayer.state.SID`}
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
local player = exports['sandbox-base']:GetLocalPlayer()

-- optional one-shot helpers on sandbox-base
local first = exports['sandbox-base']:GetCharacterData('First')
exports['sandbox-base']:SetCharacterData('SomeClientOnlyKey', value)`}
              />
            ),
          },
          {
            id: 'updated',
            label: 'Updated event',
            content: (
              <CodeBlock
                language="lua"
                code={`AddEventHandler('Characters:Client:Updated', function(key)
  if key == 'Jobs' or key == -1 then
    local jobs = LocalPlayer.state.Character:GetData('Jobs') or {}
    -- refresh UI / blips / menus
  end
end)`}
              />
            ),
          },
        ]}
      />

      <h2 id="getdata-keys">Character GetData keys</h2>
      <p>
        Keys mirror the <code>characters</code> table (and a few runtime-only fields). JSON columns are decoded into
        Lua tables when the character store is built (<code>TablesToDecode</code> in{' '}
        <code>sandbox-characters</code>).
      </p>

      <h3 id="identity">Identity &amp; session</h3>
      <ul>
        <li>
          <code>SID</code> / <code>ID</code> — State ID (primary character key; use this everywhere)
        </li>
        <li>
          <code>Source</code> — current server id (runtime)
        </li>
        <li>
          <code>User</code> / <code>License</code> — account ownership
        </li>
        <li>
          <code>First</code>, <code>Last</code>, <code>DOB</code>, <code>Gender</code> (0 male / 1 female),{' '}
          <code>Bio</code>, <code>Origin</code>, <code>Mugshot</code>
        </li>
        <li>
          <code>New</code> — first-time character (creation spawn path)
        </li>
        <li>
          <code>LastPlayed</code>, <code>Deleted</code>
        </li>
        <li>
          <code>Ped</code> / appearance preview — often backed by the <code>peds</code> table; treat as read-mostly
        </li>
      </ul>

      <h3 id="money-keys">Money &amp; crypto (read vs mutate)</h3>
      <ul>
        <li>
          <code>Cash</code> — on-hand cash (number)
        </li>
        <li>
          <code>BankAccount</code> — personal account id pointer
        </li>
        <li>
          <code>Crypto</code>, <code>CryptoWallet</code>, <code>CasinoChips</code>
        </li>
      </ul>
      <Callout tone="note">
        Prefer <Link to="/resources/sandbox-finance">sandbox-finance</Link> exports (
        <code>WalletModify</code>, <code>BalanceDeposit</code>, <code>CryptoHas</code>, …) for mutations. Reading{' '}
        <code>Cash</code> is fine; inventing your own cash math with raw <code>SetData</code> will desync UIs and
        logs.
      </Callout>

      <h3 id="vitals">Vitals &amp; world state</h3>
      <ul>
        <li>
          <code>HP</code>, <code>HPReductions</code>, <code>Armor</code> — saved on store; live ped may differ mid-frame
        </li>
        <li>
          <code>States</code> — string flags (script-prefixed entries are stripped on save)
        </li>
        <li>
          <code>Status</code>, <code>Addiction</code>, <code>DrugStates</code> — needs / effects (
          <Link to="/resources/sandbox-status">sandbox-status</Link>)
        </li>
        <li>
          <code>Jailed</code>, <code>JailedData</code>, <code>Parole</code>, <code>ICU</code> — custody / medical holds
        </li>
        <li>
          <code>Apartment</code>, <code>Inventory</code> (pointer / payload depending on stack)
        </li>
      </ul>

      <h3 id="jobs-mdt">Jobs, duty, MDT</h3>
      <ul>
        <li>
          <code>Jobs</code> — array of job objects (see nested shape below)
        </li>
        <li>
          <code>Salary</code>, <code>LastClockOn</code>, <code>TimeClockedOn</code>
        </li>
        <li>
          <code>Callsign</code>, <code>Qualifications</code>, <code>Flags</code>
        </li>
        <li>
          <code>MDTHistory</code>, <code>MDTSystemAdmin</code>, <code>MDTSuspension</code>, <code>Attorney</code>
        </li>
        <li>
          <code>Reputations</code>, <code>GangChain</code>
        </li>
      </ul>

      <h3 id="apps-ui">Phone, laptop, HUD, apps</h3>
      <ul>
        <li>
          <code>Phone</code>, <code>PhoneSettings</code>, <code>PhonePermissions</code>, <code>PhonePosition</code>,{' '}
          <code>Apps</code>
        </li>
        <li>
          <code>LaptopSettings</code>, <code>LaptopPermissions</code>, <code>LaptopApps</code>
        </li>
        <li>
          <code>HUDConfig</code>, <code>Animations</code>, <code>Alias</code>, <code>Wardrobe</code>
        </li>
        <li>
          <code>LSUNDGInviter</code>, <code>LSUNDGBan</code> — Underground / boosting related
        </li>
      </ul>

      <h2 id="nested">Nested options &amp; suboptions</h2>
      <p>
        Several keys are tables with fixed sub-keys. Read the parent with <code>GetData</code>, then index in Lua —
        do not invent a dotted GetData API.
      </p>

      <h3 id="licenses">Licenses</h3>
      <p>
        Created with every new character. Each license type is a sub-table:
      </p>
      <CodeBlock
        language="lua"
        code={`local licenses = char:GetData('Licenses') or {}

-- top-level options
-- Drivers | Weapons | Hunting | Fishing | Pilot | Drift

local drivers = licenses.Drivers or {}
-- Drivers suboptions:
--   Active    (bool)
--   Points    (number)  -- Drivers only
--   Suspended (bool)

if drivers.Active and not drivers.Suspended then
  -- allowed to drive
end

-- Weapons / Hunting / Fishing / Pilot / Drift suboptions:
--   Active, Suspended`}
      />

      <h3 id="jobs-shape">Jobs array entries</h3>
      <p>
        Characters hold <code>Jobs</code> (plural) — an array, not a single job. Online shape uses nested{' '}
        <code>Workplace</code> and <code>Grade</code> objects:
      </p>
      <CodeBlock
        language="lua"
        code={`local jobs = char:GetData('Jobs') or {}
for _, job in ipairs(jobs) do
  -- job.Id
  -- job.Name (often present when expanded)
  -- job.Workplace.Id / job.Workplace.Name   (may be nil)
  -- job.Grade.Id / job.Grade.Name / job.Grade.Level
end

-- NEVER char:SetData('Jobs', ...) for hire/fire — use sandbox-jobs
exports['sandbox-jobs']:GiveJob(stateId, 'police', 'lspd', 'officer')
exports['sandbox-jobs']:RemoveJob(stateId, 'police')
exports['sandbox-jobs']:DutyOn(source)   -- or DutyOff
local onDuty = exports['sandbox-jobs']:DutyGet(source)
local has = exports['sandbox-jobs']:HasJob(source, 'police')
local ok = exports['sandbox-jobs']:HasPermission(source, 'police_badge') -- example permission id`}
      />

      <h3 id="custody">Jailed / ICU / Parole</h3>
      <CodeBlock
        language="lua"
        code={`local jailed = char:GetData('Jailed')
local jailedData = char:GetData('JailedData')
-- jailedData.Released  — false keeps prison spawn locked

local icu = char:GetData('ICU')
-- icu.Released — false keeps ICU spawn

local parole = char:GetData('Parole')  -- table / payload when active`}
      />

      <h3 id="phone-laptop-nested">Phone / laptop settings &amp; permissions</h3>
      <ul>
        <li>
          <code>PhoneSettings</code> / <code>LaptopSettings</code> — UI prefs (expanded, wallpaper, etc.; treat as opaque
          unless you own that app)
        </li>
        <li>
          <code>PhonePermissions</code> / <code>LaptopPermissions</code> — per-app / job permission maps; phone also
          exposes helpers like <code>PermissionsHasPermission</code> / <code>PermissionsLoad</code>
        </li>
        <li>
          <code>Apps</code> / <code>LaptopApps</code> — installed app lists
        </li>
        <li>
          <code>PhonePosition</code> — NUI placement
        </li>
        <li>
          <code>HUDConfig</code> — HUD layout toggles
        </li>
      </ul>
      <Callout tone="tip">
        When adding a phone/laptop feature, prefer the resource&apos;s permission helpers over hand-editing nested
        tables on the character store.
      </Callout>

      <h2 id="setdata-rules">SetData rules</h2>
      <ul>
        <li>
          Most keys sync to the owning client automatically from the server character store.
        </li>
        <li>
          Persistence skips / protects several keys on save (<code>Source</code>, <code>User</code>, <code>First</code>,{' '}
          <code>Last</code>, <code>Phone</code>, <code>DOB</code>, <code>Gender</code>, <code>Ped</code>,{' '}
          <code>Inventory</code>, <code>Parole</code>, …). Check <code>sandbox-characters</code>{' '}
          <code>_noUpdate</code> before assuming a column write.
        </li>
        <li>
          Force a DB flush with middleware <code>Characters:ForceStore</code> when you must persist immediately.
        </li>
      </ul>

      <h2 id="server-account">Server — account / staff (player store)</h2>
      <CodeBlock
        language="lua"
        code={`local player = exports['sandbox-base']:FetchSource(source)
-- aliases: GetPlayer(source)

if player then
  local accountId = player:GetData('AccountID')
  local name = player:GetData('Name')
  local groups = player:GetData('Groups') or {}
  local identifier = player:GetData('Identifier')

  if player.Permissions:IsStaff() then end
  if player.Permissions:IsAdmin() then end
  local level = player.Permissions:GetLevel()  -- >= 100 treated as dev in several places
end`}
      />
      <p>
        More on ACE / roles: <Link to="/admin">Admin &amp; Permissions</Link>.
      </p>

      <h2 id="lifecycle">Lifecycle hooks</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-base']:MiddlewareAdd('Characters:Spawning', function(source)
  -- character entering the world
end)

exports['sandbox-base']:MiddlewareAdd('Characters:Logout', function(source)
  -- cleanup before store delete
end)

exports['sandbox-base']:MiddlewareAdd('Characters:CharacterSelected', function(source)
  -- selected, store exists, not necessarily spawned yet
end)

-- client
AddEventHandler('Characters:Client:Spawned', function() end)
AddEventHandler('Characters:Client:Logout', function() end)`}
      />

      <h2 id="finance">Money helpers (finance)</h2>
      <CodeBlock
        language="lua"
        code={`-- cash wallet
local cash = exports['sandbox-finance']:WalletGet(source)
if exports['sandbox-finance']:WalletHas(source, 500) then
  exports['sandbox-finance']:WalletModify(source, -500)
end

-- bank account balance
local bal = exports['sandbox-finance']:BalanceGet(accountId)
exports['sandbox-finance']:BalanceDeposit(accountId, 1000, ...)
exports['sandbox-finance']:BalanceWithdraw(accountId, 250, ...)

-- crypto
if exports['sandbox-finance']:CryptoHas(source, 'PLEB', 1) then end`}
      />

      <h2 id="reputation">Reputation</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-characters']:RepAdd(stateId, 'racing', 5)
local level = exports['sandbox-characters']:RepGetLevel(stateId, 'racing')
local has = exports['sandbox-characters']:RepHasLevel(stateId, 'racing', 3)`}
      />

      <h2 id="callbacks">Asking the server from client</h2>
      <CodeBlock
        language="lua"
        code={`-- server
exports['sandbox-base']:RegisterServerCallback('myres:getProfile', function(source, data, cb)
  local char = exports['sandbox-characters']:FetchCharacterSource(source)
  if not char then return cb(false) end
  cb(true, {
    sid = char:GetData('SID'),
    name = ('%s %s'):format(char:GetData('First'), char:GetData('Last')),
    jobs = char:GetData('Jobs') or {},
  })
end)

-- client
exports['sandbox-base']:ServerCallback('myres:getProfile', {}, function(ok, profile)
  if not ok then return end
  print(profile.sid, profile.name)
end)`}
      />

      <h2 id="hud">Feedback to players</h2>
      <CodeBlock
        language="lua"
        code={`exports['sandbox-hud']:Notification(source, 'error', 'Failed to Go On Duty')
exports['sandbox-hud']:Notification(source, 'success', 'You are now on duty')`}
      />

      <h2 id="see-also">See also</h2>
      <ul>
        <li>
          <Link to="/resources/sandbox-characters">sandbox-characters</Link> ·{' '}
          <Link to="/resources/sandbox-jobs">sandbox-jobs</Link> ·{' '}
          <Link to="/resources/sandbox-finance">sandbox-finance</Link>
        </li>
        <li>
          <Link to="/exports">Exports API</Link> · <Link to="/database">Database</Link> ·{' '}
          <Link to="/guide/database">Database Patterns</Link>
        </li>
      </ul>
    </DocPage>
  )
}
