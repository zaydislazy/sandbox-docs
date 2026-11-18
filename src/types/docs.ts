export type Realm = 'server' | 'client' | 'shared'

export interface Param {
  name: string
  type: string
  optional?: boolean
  description: string
}

export interface ExportDef {
  id: string
  resource: string
  name: string
  realm: Realm
  description: string
  params: Param[]
  returns: { type: string; description: string } | null
  example?: string
  file?: string
  todoVerify?: boolean
}

export interface EventDef {
  id: string
  name: string
  realm: Realm
  resource: string
  kind: 'net' | 'local' | 'middleware' | 'callback'
  description: string
  params?: Param[]
  todoVerify?: boolean
}

export interface Resource {
  name: string
  category: ResourceCategory
  purpose: string
  dependencies: string[]
  hasUi: boolean
  uiPath?: string
  uiBundler?: 'webpack' | 'vite' | 'static' | 'none'
  ensureOrder: number | null
  dbTables: string[]
  exports: string[]
  events: string[]
  commands: string[]
  configNotes?: string[]
  todoVerify?: boolean
}

export type ResourceCategory =
  | 'core'
  | 'characters'
  | 'ui'
  | 'interaction'
  | 'inventory'
  | 'jobs'
  | 'vehicles'
  | 'property'
  | 'crime'
  | 'voice'
  | 'entertainment'
  | 'ox'
  | 'standalone'
  | 'cfx'
  | 'assets'

export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface DocPageMeta {
  title: string
  description: string
  href: string
  group: string
}

export interface DbTable {
  name: string
  purpose: string
  related?: string[]
  todoVerify?: boolean
}

export type CalloutTone = 'note' | 'warning' | 'tip' | 'danger'
