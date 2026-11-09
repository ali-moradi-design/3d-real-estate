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

Lighthouse (software rendering): local performance 0.94; on the CI runner performance 0.78 (LCP 4.1 s, TBT 370 ms),
accessibility 1, best practices 1, SEO 1. The 3D scene loads only when the tour is in view, which is what
kept the CI performance score above the 0.7 gate.

A phone-size pass (iPhone 13 viewport) made the hotspot card compact and put the overlay above the markers.

Left for the roadmap (phase 7): deploy to `/srv/static/3d-real-estate` and the Nginx site file;
make `ci` a required check in the branch protection settings (needs repository admin rights).

## 2026-11-09: session 3, bugs and performance

Fixed:

- Dev console error "two children with the same key": the unit's scene group and its ready
  signal shared the key `unit.id`. Keys are now unique.
- Changing the residence in the booking form kept the hotspot selected on the other unit
  (both units have a flooring hotspot). The selection is now tied to its unit; new E2E test.
- GPU memory leak: the floor and sky canvas textures were created again on every unit switch
  and never freed. They are now drawn once and shared (one GPU upload for the floor).

Performance:

- The scene drew 60 frames a second even when nothing moved. It now renders on demand
  (`frameloop="demand"`): no frames while idle (measured 0 draw calls in 3 s, before: constant).
- The shadow map is drawn once per unit instead of on every frame, because the scene is static.
- Re-renders: the home page is a server component again; only the tour and the booking form
  share the chosen unit (context). Lights, room, furniture and Environment are memoized, so a
  hotspot click re-renders only the markers and the camera rig (measured: 0 extra renders of
  the room, lights and booking form). Before, every click also redrew the Environment cube map.
- All models of a unit load in one suspend (the room and lights rendered 7 times during load,
  now once); the other unit's models preload in idle time after the first unit is shown.
- Shared wall, frame and trim materials; a cached `matchMedia` list in `useMediaQuery`.
- Camera moves ignore the idle time reported by the first on-demand frame (no jump).

Known: `THREE.Clock: This module has been deprecated` comes from `@react-three/fiber` 9.8.2
(the latest stable release) with three r186; it is fixed upstream only in the v10 pre-releases.
