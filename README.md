# Sandbox Framework Docs

Standalone documentation site for the [Sandbox RP Framework](https://github.com/AutLaaw/sandbox-fivem).

This folder is **not** a FiveM resource. It is never started by the server and has no `fxmanifest.lua`.

## Requirements

- [Bun](https://bun.sh)

## Commands

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # output → dist/
bun run preview  # preview production build
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Content driven from typed data under `src/data/`

## Regenerating catalogs

From the repo root (optional; only if Lua exports change):

```bash
bun _docs_extract/extract.mjs
# optional richer core extract: _docs_extract/extract_docs.ps1
bun _docs_extract/merge-and-generate.mjs
bun _docs_extract/gen-search.mjs
```

## Credits

Sandbox is a heavily modified fork of Mythic Framework, released with permission from Alzar & Dr. Nick.
