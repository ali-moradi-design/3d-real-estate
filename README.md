# Northlight Residences: 3D real estate landing page

A portfolio demo: a landing page for a fictional pre-sale building with an
interactive 3D tour (clickable hotspots, two units). **Northlight Residences is
a fictional brand; no real property is offered.**

Live: `3d-real-estate.ali-moradi-develop.com` (deployed from the roadmap, phase 7).

## Stack

Next.js 16 (App Router, static export), React 19, TypeScript strict, pnpm,
ESLint + Prettier, Feature-Sliced Design checked with Steiger, React Three Fiber
and drei. Tests: Playwright (E2E) and axe; Lighthouse runs in CI.

## Scripts

| Command      | What it does                     |
| ------------ | -------------------------------- |
| `pnpm dev`   | Dev server                       |
| `pnpm build` | Static export into `out/`        |
| `pnpm check` | ESLint, Prettier, `tsc`, Steiger |

## Structure

`app/` is the thin Next.js router. The Feature-Sliced layers live in `src/`
(`app`, `views`, `widgets`, `features`, `entities`, `shared`).

## Docs

`docs/brief.md` (requirements), `docs/research.md` (sources, licenses, proposal),
`docs/build-log.md` (progress), `docs/mockups/` (approved mockups).

## License

Code: MIT. Third-party code and assets: see `LICENSE-THIRD-PARTY.md` and `CREDITS.md`.
