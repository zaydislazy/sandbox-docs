import type { EventDef } from '../types/docs'

/** High-value lifecycle events and callback patterns verified from sandbox-base / characters. */
export const eventsCatalog: EventDef[] = [
  {
    id: 'core-shared-watermark',
    name: 'Core:Shared:Watermark',
    realm: 'shared',
    resource: 'sandbox-base',
    kind: 'local',
    description: 'Fired after sandbox-base exports are ready (from sh_init.lua watermark wait).',
  },
  {
    id: 'core-server-startupready',
    name: 'Core:Server:StartupReady',
    realm: 'server',
    resource: 'sandbox-base',
    kind: 'local',
    description: 'Server init signal after convar validation; used by sequence and other bootstraps.',
  },
  {
    id: 'core-client-sessionstarted',
    name: 'Core:Client:SessionStarted',
    realm: 'client',
    resource: 'sandbox-base',
    kind: 'local',
    description: 'Client session start when the local player becomes active.',
  },
  {
    id: 'core-server-sessionstarted',
    name: 'Core:Server:SessionStarted',
    realm: 'server',
    resource: 'sandbox-base',
    kind: 'net',
    description: 'Server receives session start from client; queue/join flow continues.',
  },
  {
    id: 'mw-characters-spawning',
    name: 'Characters:Spawning',
    realm: 'server',
    resource: 'sandbox-characters',
    kind: 'middleware',
    description: 'Middleware hook when a character is spawning into the world. Attach with MiddlewareAdd.',
    params: [{ name: 'source', type: 'number', description: 'Player server id' }],
  },
  {
    id: 'mw-characters-selected',
    name: 'Characters:CharacterSelected',
    realm: 'server',
    resource: 'sandbox-characters',
    kind: 'middleware',
    description: 'Middleware hook after a character is selected.',
  },
  {
    id: 'mw-characters-logout',
    name: 'Characters:Logout',
    realm: 'server',
    resource: 'sandbox-characters',
    kind: 'middleware',
    description: 'Middleware hook when a character logs out.',
  },
  {
    id: 'mw-characters-creating',
    name: 'Characters:Creating',
    realm: 'server',
    resource: 'sandbox-characters',
    kind: 'middleware',
    description: 'Middleware during character creation.',
  },
  {
    id: 'mw-characters-created',
    name: 'Characters:Created',
    realm: 'server',
    resource: 'sandbox-characters',
    kind: 'middleware',
    description: 'Middleware after character creation completes.',
  },
  {
    id: 'mw-characters-spawnpoints',
    name: 'Characters:GetSpawnPoints',
    realm: 'server',
    resource: 'sandbox-characters',
    kind: 'middleware',
    description: 'Middleware used to contribute spawn points for character select.',
  },
  {
    id: 'cb-server-trigger',
    name: 'Callbacks:Server:TriggerEvent',
    realm: 'server',
    resource: 'sandbox-base',
    kind: 'callback',
    description: 'Internal net event for sandbox-base server callbacks (prefer RegisterServerCallback / ServerCallback APIs).',
  },
  {
    id: 'cb-client-trigger',
    name: 'Callbacks:Client:TriggerEvent',
    realm: 'client',
    resource: 'sandbox-base',
    kind: 'callback',
    description: 'Internal net event for sandbox-base client callbacks.',
  },
  {
    id: 'proxy-shared-registerready',
    name: 'Proxy:Shared:RegisterReady',
    realm: 'client',
    resource: 'sandbox-base',
    kind: 'local',
    description:
      'Legacy Mythic-era event name. Client triggers it; some server task/cron listeners still wait on it. Confirm whether TaskTick/CronTick actually start in production.',
  },
  {
    id: 'playerdropped',
    name: 'playerDropped',
    realm: 'server',
    resource: 'sandbox-base',
    kind: 'local',
    description: 'Standard FiveM drop event; sandbox-base and characters clean up stores/middleware.',
  },
]

export function getEventsForResource(resource: string): EventDef[] {
  return eventsCatalog.filter((e) => e.resource === resource)
}
