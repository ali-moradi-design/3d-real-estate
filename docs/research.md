# Research: sources, models and proposal

Date: 2026-10-22. Nothing is built yet; this file is the base for the approval.

## 1. Source examples (pmndrs/examples, MIT, commit 541599a)

All three were copied out of the repo, installed with pnpm, built with Vite and
opened in Playwright (Chromium, software WebGL). Screenshots are in `docs/research/`.

| Example | Runs | What we take | Notes |
| --- | --- | --- | --- |
| `room-with-soft-shadows` | yes, after one fix | Interior scene: `AccumulativeShadows`, `RandomizedLight`, `Environment`, camera easing with `maath` | `maath` is imported but missing from its `package.json`; add it. Ships `r3f-perf` and `leva` for debug only (drop). Room model is 428 KB (Draco/Meshopt already). Soft shadows look noisy under software WebGL; check on a real GPU. |
| `html-markers` | yes | drei `<Html>` markers with `occlude` and a `geometry` ref so markers hide behind the model | Tiny (one earth model). Pattern only; we restyle markers as hotspots with detail cards. |
| `sky-dome-with-annotations` | yes | `PanoramaView` idea: inside-out sphere with a photo texture and clickable `<Html>` links | Uses `antd` for the labels (drop). Its two photos have no credit: do not ship them. Optional second view with Poly Haven CC0 panoramas. |

Stack in the examples: React 19, R3F 9.8, drei 10.7, three 0.186. Our target is
Next.js 16 (App Router, static export), so the scene is a client component loaded
with `dynamic(..., { ssr: false })`.

## 2. Model licensing (important)

- The example room "Room" by Anex (Sketchfab) is credited as CC-BY 4.0 in the
  example source. On 2026-10-22 the Sketchfab API returns an EMPTY license and
  `isDownloadable: false` for it. We cannot verify the license today, so we should
  NOT depend on it. Treat it as a mockup-only reference.
- Sketchfab downloads need the user's login; I cannot download models from
  here. The user downloads the chosen `.glb` files (free account) and puts them
  in `assets-src/` (not committed raw).

### Replacement candidates (verified through the Sketchfab API, 2026-10-22)

| Candidate | Author | License | Faces | Downloadable | Use |
| --- | --- | --- | --- | --- | --- |
| Modern apartment interior (`400c9069181a4342a7142433dfa3466e`) | Katydid | CC-BY 4.0 | 60 k | yes | Unit B, two-bedroom (living + dining + kitchen) |
| VR apartment loft interior baked (`54bc929a26094b6cb36f977903fbcd97`) | ChristyHsu | CC-BY 4.0 | 98 k | yes | Unit A, loft with spiral stairs (hero image) |
| Modern Apartment (`1fbb649cd6624f2bb7b7d6e30c6533a5`) | Visthétique | CC-BY 4.0 | 3 M | yes | Rejected: far too heavy for the web |
| Loft Bedroom / Sci-Fi Bedroom | dylanheyes | CC-BY 4.0 | 67 k / 430 k | yes | Spare options |

No usable CC0 apartment interior was found (the CC0 search returned only a castle
and a sculpture). CC-BY is allowed by the brief if credited in `CREDITS.md` and on
the page.

Light and staging, all CC0 from Poly Haven (downloadable without login via the
Poly Haven API): HDRIs (for example `brown_photostudio_*`, indoor category) for
reflections and lighting, and furniture models (85 in the `furniture` category)
to dress a room if a model is bare. Panoramas for the optional 360° view come from
the Poly Haven `indoor` HDRI category (e.g. `art_studio`, `empty_play_room`).

Risk to check before building: baked-light models (ChristyHsu "baked") look best
with unlit/baked textures; the shadow example (`AccumulativeShadows`) would not
add much there. Decide per model after the user downloads the files.

## 3. Proposal

### Fictional brand

Recommended: **Northlight Residences**, a 24-unit, six-floor pre-sale building in
a fictional "Harbor District". Alternatives: **Aldermere Living**, **Casa Verane**.
(No real brand, logo or address; the footer says it is a demo.)

### Page sections (see `docs/mockups/`)

1. Hero: full-bleed render (Unit A), headline, two buttons, sticky transparent nav.
2. Interactive tour: the 3D viewer, unit tabs (A loft / B two-bedroom), 3 hotspots
   per unit opening a detail card (material, area, upgrade price), a price/status
   panel for the unit, a small hint bar. Poster image first, 3D scene lazy-loaded.
3. The building: four key numbers and three amenity cards.
4. Gallery: five images (renders/screenshots of the units).
5. Book a visit: form (fake submit), preferred unit preselected from the tour.
6. Footer with credits link; separate `/credits` section for model authors.

Mockups: `01-landing-desktop.png`, `02-viewer-hotspot.png`, `03-landing-mobile.png`
(HTML source in `docs/mockups/index.html`). The mockup uses the candidate
thumbnails as placeholders; the final page uses our own renders of the downloaded
models.

### Design direction

Warm off-white paper, deep ink-green dark section for the viewer, brass accent;
serif headings, sans body. English only. Reduced motion stops camera moves; mobile
gets lower DPR and no soft-shadow accumulation.

## 4. Decisions needed from the user

1. Approve the brand name (Northlight Residences) or pick another.
2. Approve the section list and the visual direction.
3. Models: OK to use Katydid (Unit B) and ChristyHsu (Unit A), both CC-BY?
   You must download the `.glb` files from Sketchfab (login required).
4. Include the optional 360° panorama view (Poly Haven CC0), or skip it for now?
5. `gh` is not logged in here (invalid `GH_TOKEN`): see `docs/build-log.md`.
