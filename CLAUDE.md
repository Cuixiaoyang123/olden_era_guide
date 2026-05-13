# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

《英雄无敌：旧日纪元》(Heroes of Might and Magic: Olden Era) Chinese-language community guide site. Static, zero-JS-by-default, built with Astro 5 + Content Collections. Content is Chinese; UI/code identifiers are Chinese-friendly but code is English.

## Commands

```bash
npm run dev       # local dev server on http://localhost:4321
npm run build     # static build -> dist/ (also generates sitemap)
npm run preview   # serve the built dist/ locally
npm run astro -- check   # type-check .astro + content frontmatter against schemas
```

No test suite, no linter configured. Type-checking via `astro check` (uses TypeScript strict via `astro/tsconfigs/strict`). Build itself validates all content frontmatter against the zod schemas — a malformed `.md` file fails the build.

Node 18.17+ or 20.3+. There's no package-lock; `npm install` first.

## Architecture

### Content is the data layer

`src/content/config.ts` is the single source of truth for all content shapes. It defines five collections via zod schemas:

- `factions` — six factions (Dungeon, etc.), each with tier S–D and an `accentColor` consumed by per-faction theming
- `units` — keyed by slug; `faction` field is a faction slug (string cross-reference, not a typed relation)
- `heroes` — same `faction` slug reference
- `spells` — categorized by `school` and `level` 1–5
- `guides` — long-form articles; supports `draft: true` (excluded at build, visible in dev) and `featured: true`

**Adding a field means editing `config.ts` and every existing content file that needs it.** The build will refuse to start until all entries satisfy the schema — this is the intended safety net, not a problem to work around.

Cross-collection references (`unit.data.faction` → `faction.slug`) are plain strings. Pages that need to display "Dungeon" instead of "dungeon" build a name map manually:
```ts
const factionNameMap = Object.fromEntries(factions.map(f => [f.slug, f.data.name]));
```
This pattern recurs — look for it in `pages/tier-list/index.astro` and `pages/units/index.astro` before reinventing.

### Routing follows the file system

Every page under `src/pages/` is a route. Dynamic detail pages (`[slug].astro`) use `getStaticPaths()` to fan out one HTML file per content entry. So **adding a markdown file under `src/content/<collection>/` automatically produces a page at `/<collection>/<slug>/`** with no routing wiring needed.

`build.format: 'directory'` in `astro.config.mjs` means URLs end in `/` (trailing-slash form).

### Tier List is derived, not maintained

`src/pages/tier-list/index.astro` aggregates by reading every unit's `rating` field and bucketing into S/A/B/C/D rows; the faction tier section reads `faction.tier`. So **don't maintain a tier list anywhere else** — just set the `rating` on individual unit files and the page updates.

### Styling

All design tokens live as CSS custom properties in `src/styles/global.css` `:root` (colors, spacing scale, fonts, borders, radii). Component `<style>` blocks are scoped by Astro. To rebrand globally, change the tokens; component styles reference `var(--gold)`, `var(--space-3)`, etc.

Faction-specific accent comes from `faction.accentColor` piped into a CSS custom property at the element level (`style={`--card-accent: ${color}`}`). This is the standard way to thread per-entry color through scoped styles here.

### TS path aliases

`@/*`, `@components/*`, `@layouts/*`, `@styles/*` are configured in `tsconfig.json`. Existing code mostly uses relative paths — match the surrounding file when adding imports.

## Deployment

Targets Cloudflare Pages (preset: Astro, output: `dist`, Node 20). Vercel works identically. Before going live, update `site` in `astro.config.mjs` — `@astrojs/sitemap` uses it to generate absolute URLs in `sitemap-index.xml`. The placeholder is `https://olden-era.example.com`.

## Content authoring shortcuts

- New unit: copy `src/content/units/troglodyte.md` or `black-dragon.md`, change frontmatter + body. Filename becomes the URL slug.
- New hero: copy `src/content/heroes/shakti.md`.
- New guide: copy `src/content/guides/h3-veteran.md`. Set `draft: false` to publish.

`updatedAt` is a free-form string field, conventionally `YYYY.MM.DD`.
