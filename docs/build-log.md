# Build log

## 2026-10-22: session 1, research and proposal (no app code)

Prerequisites (checked in the cloud session):

| Check                                                    | Result                                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| git                                                      | 2.43.0                                                                                             |
| node                                                     | v22.22.0 (LTS)                                                                                     |
| pnpm                                                     | 10.28.0                                                                                            |
| Playwright                                               | 1.56.1; Chromium launches and renders WebGL (software)                                             |
| Clean clone of `ali-moradi-design/3d-real-estate`        | yes: empty repo, no commits, no local changes                                                      |
| `gh auth status`                                         | FAILS: `GH_TOKEN` is invalid. The GitHub MCP tools work, so reads and pushes are fine through them |
| `ali-moradi-design/roadmap-portfolio` (private) readable | yes (read through the GitHub MCP tools and the local clone)                                        |

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

## 2026-10-22: session 2, build (all approved)

Approved by the user: brand "Northlight Residences", the section list, the visual direction.

Deviations from the proposal (and why):

- The two CC-BY Sketchfab models could not be downloaded (the download API needs a login, HTTP 401).
  Instead the room shell is built in code and the furniture is 11 CC0 Poly Haven models
  (2.8 MB, Meshopt + WebP). Lighting is procedural, so no HDRI file is shipped. Credits are in
  `CREDITS.md` and in the page footer. The Sketchfab models can still be added later.
- Textures are WebP, not KTX2: `toktx` is not available here. `scripts/optimize-models.sh` documents the pipeline.
- The optional 360° view was left out (no panorama is needed for the two units).

Pull requests (each: branch, PR, CI, squash merge):

1. Scaffold: Next.js 16 static export, TypeScript strict, ESLint, Prettier, Steiger, CI job `ci`.
2. Models, credits, deploy notes (Nginx: `model/gltf-binary`, long cache).
3. 3D tour: scene, hotspots, camera moves, unit tabs, posters.
4. Landing sections: header, hero, building, gallery, booking form, footer with credits.
5. Tests: Playwright E2E (7 tests), axe (WCAG 2.1 A/AA), Lighthouse CI in the single `ci` job.

Local Lighthouse (software rendering): performance 0.89, accessibility 1, best practices 1, SEO 1.

Left for the roadmap (phase 7): deploy to `/srv/static/3d-real-estate` and the Nginx site file;
make `ci` a required check in the branch protection settings (needs repository admin rights).
