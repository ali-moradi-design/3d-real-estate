# Build log

## 2026-10-22: session 1, research and proposal (no app code)

Prerequisites (checked in the cloud session):

| Check | Result |
| --- | --- |
| git | 2.43.0 |
| node | v22.22.0 (LTS) |
| pnpm | 10.28.0 |
| Playwright | 1.56.1; Chromium launches and renders WebGL (software) |
| Clean clone of `ali-moradi-design/3d-real-estate` | yes: empty repo, no commits, no local changes |
| `gh auth status` | FAILS: `GH_TOKEN` is invalid. The GitHub MCP tools work, so reads and pushes are fine through them |
| `ali-moradi-design/roadmap-portfolio` (private) readable | yes (read through the GitHub MCP tools and the local clone) |

Done:

- Created branch `main` (the repo was empty) and pushed it together with the
  session branch `claude/epic-albattani-covbll`.
- `docs/brief.md`: copied the "Common to all five" part and the 3d-real-estate
  section from `notes/3d-landings-brief.md` (roadmap-portfolio, `main`).
- Ran the three pmndrs examples named in the brief; screenshots in `docs/research/`.
  Found that `room-with-soft-shadows` needs the missing `maath` dependency.
- Checked model licenses: the Anex room has no verifiable license today; two CC-BY
  replacements found (see `docs/research.md`).
- Proposed brand and sections; mockups in `docs/mockups/`.

Decisions this session: site language English only; graphify is not used in this repo.

Next: wait for the user's approval of `docs/research.md` section 4, then start the
first small PR (project scaffold: Next.js 16, TypeScript strict, pnpm, ESLint,
Prettier, Steiger, CI).
