# Contributing

Thanks for helping with the Sandbox docs. Small PRs are fine — typos count.

## Setup

```bash
bun install
bun run dev
```

Open `http://localhost:5173`.

Before you open a PR:

```bash
bun run build
```

## Where things live

| Thing | Path |
| --- | --- |
| Guide / ops pages | `src/pages/` |
| Nav sidebar | `src/data/navigation.ts` |
| Routes | `src/App.tsx` |
| Resources / exports / DB / events | `src/data/` |
| Search entries | `src/data/searchIndex.ts` |

New page checklist:

1. Add the page component under `src/pages/`
2. Register the route in `src/App.tsx`
3. Add a nav item in `src/data/navigation.ts`
4. Add a search entry in `src/data/searchIndex.ts`
5. Note it in `src/pages/Changelog.tsx` if it's user-facing

## Writing tips

- Keep it short and concrete.
- Prefer Sandbox-native examples (`exports['sandbox-characters']:FetchCharacterSource(source)`, oxmysql, React NUI).
- If you wire a resource to DB tables, update `dbTables` on that resource in `src/data/resources.ts`.
- Don't invent APIs — check the Lua / the Exports page first.

## PR etiquette

- One topic per PR when you can.
- Say what changed and why in the description.
- Screenshots help for UI / layout tweaks.
