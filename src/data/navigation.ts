import type { NavGroup, NavItem } from '../types/docs'

export const navGroups: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/', description: 'What Sandbox is and how it relates to Mythic' },
      {
        title: 'Setup Guide',
        href: '/setup',
        description: 'Quick start, install, and configuration in one place',
      },
      { title: 'Differences from Mythic', href: '/differences', description: 'What changed from Mythic Framework' },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { title: 'Overview', href: '/architecture', description: 'Folders, load order, communication' },
      { title: 'Exports System', href: '/architecture/exports', description: 'How resources register and call exports' },
      { title: 'React NUI', href: '/architecture/nui', description: 'How React UIs build and load' },
    ],
  },
  {
    title: 'Developer Guide',
    items: [
      { title: 'Creating a Resource', href: '/guide/creating-a-resource', description: 'Scaffold a Sandbox resource' },
      { title: 'Using Exports', href: '/guide/exports', description: 'Register and consume exports' },
      { title: 'Building a React NUI', href: '/guide/react-nui', description: 'Webpack/Vite NUI workflow' },
      { title: 'Database Patterns', href: '/guide/database', description: 'oxmysql and common patterns' },
      { title: 'Getting Important Data', href: '/guide/getting-data', description: 'Player, character, jobs, and more' },
      { title: 'Best Practices', href: '/guide/best-practices', description: 'Conventions that match this codebase' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Resources', href: '/resources', description: 'All framework resources by category' },
      { title: 'Exports API', href: '/exports', description: 'Searchable export reference' },
      { title: 'Events & Callbacks', href: '/events', description: 'Net events, middleware, callbacks' },
      { title: 'Database', href: '/database', description: 'Schema overview from database.sql' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { title: 'Admin & Permissions', href: '/admin', description: 'Roles, /admin, security warnings' },
      { title: 'Troubleshooting & FAQ', href: '/troubleshooting', description: 'Common failures and fixes' },
      { title: 'Changelog', href: '/changelog', description: 'What changed on these docs' },
      { title: 'Credits', href: '/credits', description: 'AutLaaw, BadCodes, Mythic authors' },
    ],
  },
]

export const flatNav: Array<NavItem & { group: string }> = navGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.title })),
)

export function getAdjacent(href: string): { prev: NavItem | null; next: NavItem | null } {
  const index = flatNav.findIndex((item) => item.href === href)
  if (index < 0) return { prev: null, next: null }
  return {
    prev: index > 0 ? (flatNav[index - 1] ?? null) : null,
    next: index < flatNav.length - 1 ? (flatNav[index + 1] ?? null) : null,
  }
}
