# Marvel Future Fight Guide

Bilingual (TH / EN) knowledge base starter for Marvel Future Fight.

## Stack

- Next.js (App Router)
- Tailwind CSS
- next-intl
- Local JSON-like data for characters and teams

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/th`.

> Note: scripts use `--webpack` because native Turbopack/SWC bindings failed on this machine and fell back to WASM.

## Routes

- `/th` / `/en` — Home
- `/th/characters` — Character browser with filters (like [thanosvibs characters](https://thanosvibs.money/characters))
- `/th/characters/[id]` — Character detail
- `/th/updates` — Patch / update history (like [thanosvibs updates](https://thanosvibs.money/updates))
- `/th/updates/[id]` — Update detail
- `/th/teams` — Team list
- `/th/teams/[id]` — Team detail
- `/th/guides` — Basics guides

## Data

Edit sample data in:

- `src/data/characters.ts`
- `src/data/updates.ts`
- `src/data/teams.ts`
- `messages/th.json` / `messages/en.json`
