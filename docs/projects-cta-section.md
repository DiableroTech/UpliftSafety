# Projects CTA section — dev ticket

**Type:** Feature  
**Surface:** Home page only (`/`)  
**Goal:** Show five past jobs in a photo grid, with a sixth cell that sends visitors to the full **Projects** index.

Reading this as: proof-of-work on an industrial consultancy home page, for safety managers scanning the demo, in the existing paper / blue / lime language, with hover motion that reveals one sentence per job without turning the home page into a second projects index.

## Summary

Build a **3×2 grid** (three columns, two rows) under a **Projects** header, centered in **`max-w-6xl`**. **Five cells** are mini project tiles: background photo, title always on screen, summary on hover. **Sixth cell** is the CTA **Show more projects** → `/projects`. Ship in production with placeholder data until real slugs replace the featured list.

Data comes from `src/data/projects.ts`. The grid does not hard-code copy or images in JSX.

This ticket **supersedes** the older note in `docs/project-page-scope.md` that said a sample must not sit on the home page. For the demo, the five existing sample rows are the intended home set until Jason and Marsha replace them. When a row becomes real, swap slugs in the featured list; the component stays the same.

## Where it sits

Current home order:

1. Hero  
2. Three lanes (Industrial hygiene / Safety programs / Training)  
3. Asbestos feature  
4. Testimonials (dev only today: `import.meta.env.DEV`)  
5. Region line  
6. Footer  

Insert the projects grid **after the asbestos feature and before the testimonial band**. If testimonials are off in production, the grid still sits above the region line so the page ends with geography, then footer.

Home-only. `/projects` keeps its row list layout; this section is a compact teaser, not a duplicate index.

## Theme

Same tokens as the rest of the site (`src/index.css`). Square corners. No card radius, no second palette.

| Role | Token | On this section |
| --- | --- | --- |
| Section background | `--color-paper` `#f7f6f4` | Full-width band; grid content in `max-w-6xl` |
| Tile text | white | Title and summary on photos |
| Always-on scrim | black ~35–45% at bottom | Keeps the title readable before hover |
| Hover scrim | black ~65–75% full tile | Fades in on hover / focus |
| CTA cell | `--color-paper` or white + `--color-line` border | Empty slot, not a photo |
| CTA label | `--color-blue` `#175873` | Link text; hover fill optional (match other home links) |
| Sample mark | `--color-blue` | Small **Sample** label when `placeholder: true` |

Archivo for titles and the CTA. Source Sans 3 for summary. Lime stays for primary buttons elsewhere; this section does not need a green fill unless the CTA is styled as the secondary bordered button pattern already on home.

## What the visitor sees

1. Section header above the grid:
   - Title: **Projects**
   - One intro line: past jobs in mining and industrial settings, with a path to the full list (same tone as other home bands; finalize wording in implementation).
2. A grid of six equal cells on a wide window (3 columns × 2 rows), inside a centered **`max-w-6xl`** column with horizontal padding (`mx-auto max-w-6xl px-5`, matching testimonials and `/projects`).
3. **Cells 1–5:** Photo background, project title, **Sample** chip when `placeholder: true` until real jobs replace those slugs. Click or tap opens that project detail: `/projects/:slug`.
4. **Cell 6:** No photo. Reads as an open slot: **Show more projects**. Links to `/projects`.
5. **Hover (pointer) or focus (keyboard)** on a project cell:
   - A dark overlay fades in over the photo.
   - The **summary** (one sentence from data) fades in and slides in from the **left**.
6. **Hover / focus out:** Summary fades out and slides back left; overlay fades out. Title stays visible throughout.

Touch devices without hover: first tap can follow the link (detail page). Optional follow-up: tap-to-reveal summary before second tap; **out of scope for v1** unless usability testing asks for it.

## Grid layout

| Index | Row | Col | Content |
| --- | --- | --- | --- |
| 1 | 1 | 1 | Featured project 1 |
| 2 | 1 | 2 | Featured project 2 |
| 3 | 1 | 3 | Featured project 3 |
| 4 | 2 | 1 | Featured project 4 |
| 5 | 2 | 2 | Featured project 5 |
| 6 | 2 | 3 | CTA → `/projects` |

**Desktop (`lg` and up):** CSS Grid `grid-cols-3`, two rows, equal-height cells. Gap: `1px` or `--color-line` gutters so tiles read as a single mosaic (match site borders, not floating rounded cards).

**Tablet (`md`):** `grid-cols-2`. Row flow: projects 1–2, 3–4, 5 + CTA (CTA spans or sits last—prefer **CTA last** in DOM so it always appears after the five tiles when wrapped).

**Phone:** `grid-cols-1`. Five project links, then CTA full width.

Minimum tile height: ~`12rem` on phone, ~`14rem` on `sm`, ~`16rem` on `lg`. Photos use `object-cover` on an absolutely positioned layer.

## Project tile anatomy

Each of the five cells is one link (`<Link viewTransition to={/projects/${slug}}>`).

Layers inside the link (bottom to top):

1. **Photo** — `project.image.src`, `alt` from data. No lazy-load hero tricks; use native `loading="lazy"` for below-the-fold tiles.
2. **Base scrim** — gradient or solid band at the bottom (~40% of tile height) so the title reads on busy photos at rest.
3. **Hover scrim** — full-bleed layer, `opacity: 0` default, `opacity: 1` on `:hover` / `:focus-within`. Background `rgb(0 0 0 / 0.7)` or similar. Transition ~450ms ease-out in, ~350ms ease-in out.
4. **Content stack** (padding `1rem`–`1.25rem`, anchored bottom-left unless design chooses vertical center on hover):
   - **Title** — always visible, white, `font-display`, bold, line-clamp 2.
   - **Sample** — if `placeholder`, small uppercase label near title (same convention as `/projects` index).
   - **Summary** — `project.summary`, white or `white/90`, max ~3 lines at rest on hover. Default: `opacity: 0`, `transform: translateX(-1rem)`. Hover/focus-within: `opacity: 1`, `transform: translateX(0)`. Transition ~400ms with ~80ms delay after scrim starts on enter; no delay on exit.

Do not show full `body[]` paragraphs in the tile. **Do not** show region, sector, or services on the tile; hover shows **`summary`** only.

**Photo zoom on hover:** optional subtle `scale(1.03)` on the image with `overflow: hidden` on the tile. Keep it secondary to overlay + text; cap duration ~600ms.

## CTA tile (sixth cell)

Not a project. Visual contrast: paper background, `border border-line`, or inverted blue band—pick one and stay consistent with home links (e.g. asbestos **Book group training** hover).

Content:

- Primary line: **Show more projects** (sentence case; tracking matches other home CTAs).
- Subline **View the full list** is optional; ship v1 with the primary line only unless copy review adds it.

Entire cell is a link to `/projects`. No hover photo overlay. Hover may use the same border → blue fill pattern as **Book group training** on the asbestos block.

## Content model

Reuse `Project` from `src/data/projects.ts`. Add a **featured list** for home order, not a new duplicate type.

```ts
/** Slugs in display order. Exactly five for the home grid. */
export const homeFeaturedProjectSlugs = [
  'sample-open-pit',
  'sample-mill-lockout',
  'sample-forest-mill',
  'sample-plant-sampling',
  'sample-crew-training',
] as const

export function getHomeFeaturedProjects(): Project[] {
  return homeFeaturedProjectSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is Project => p !== undefined)
}
```

Rules:

- If a slug is missing, **omit that tile** and log in dev; do not crash the home page. If fewer than five resolve, still render the CTA cell.
- If the featured list length ≠ 5 at build time, fail CI or a unit check in dev—document the contract as **exactly five slugs**.
- Swapping a featured job is editing `homeFeaturedProjectSlugs` only.

CTA copy lives in the component or a tiny `src/data/homeCopy.ts` object; it is not per-project data.

## Motion and accessibility

**Pointer:** Hover drives overlay + summary as described.

**Keyboard:** `:focus-visible` on the project link uses the same visible state as hover (overlay + summary). Do not rely on `:hover` alone.

**Reduced motion** (`prefers-reduced-motion: reduce`):

- No slide: summary may sit at `translateX(0)` with a simple opacity crossfade, or stay visible under a slightly stronger base scrim. Overlay may jump to final opacity without a long fade.
- No image scale.

**Screen readers:** Link accessible name = project title + optional “Sample project”. Summary is plain text inside the link; it does not need to be hidden from AT when visually faded, or use `aria-hidden` on the summary only when opacity is 0 and ensure the title names the link. Prefer **visible summary on focus** for keyboard users even under reduced motion.

## Files

| File | Role |
| --- | --- |
| `src/data/projects.ts` | `homeFeaturedProjectSlugs`, `getHomeFeaturedProjects()` |
| `src/components/ProjectsCtaSection.tsx` | **Projects** header + intro, `max-w-6xl` wrapper, grid, project tile, CTA tile |
| `src/index.css` | Tile scrim, hover overlay, summary slide/fade (e.g. `.project-tile`, `.project-tile-overlay`) |
| `src/pages/Home.tsx` | Mount `<ProjectsCtaSection />` after asbestos |

Optional later: extract `ProjectTile` if reused on another page—not required for v1.

## Phases

Ship in order. Each phase is reviewable on its own.

### Phase 1 — Data and static grid

1. Add `homeFeaturedProjectSlugs` and `getHomeFeaturedProjects()` to `src/data/projects.ts`.
2. Create `ProjectsCtaSection` with **Projects** title and one-line intro inside `mx-auto max-w-6xl px-5`.
3. Render 3×2 grid at `lg` inside that column; responsive rules at `md` / default.
4. Five tiles: photo + bottom title + Sample when `placeholder`. Link to detail. **No hover motion yet.**
5. Sixth tile: CTA to `/projects`.

**Done when.** Home shows six cells, five open the correct slugs, CTA opens `/projects`, images match `public/projects/`.

### Phase 2 — Hover and focus motion

1. Add base bottom scrim and hover full overlay with opacity transition.
2. Add summary with fade + slide from left; reverse on leave.
3. Wire `:focus-visible` to match hover.
4. Optional subtle image scale (respect reduced motion).

**Done when.** Desktop hover and Tab-through both reveal summary readable on overlay; motion reverses cleanly.

### Phase 3 — Polish and home integration

1. Insert section in `Home.tsx` after asbestos (before testimonials).
2. Keep layout **centered `max-w-6xl`** with `px-5` (not full-bleed like lanes); grid is responsive inside that column on mobile and tablet.
3. Pass `viewTransition` on links.
4. `npm run build` passes.
5. Check phone, tablet, desktop: no clipped titles, CTA always reachable, tap targets ≥44px effective height.

**Done when.** Acceptance criteria below pass.

### Phase 4 — Real jobs (when client approves)

1. Update `homeFeaturedProjectSlugs` to real slugs.
2. Turn off `placeholder` on those rows in data; Sample label disappears on tiles automatically.
3. Adjust section intro if it still mentions samples.

No layout rewrite.

## Acceptance criteria

- [ ] Home renders a **3×2** grid at large breakpoints with **five** project tiles and **one** CTA tile.
- [ ] Each project tile uses **`project.image`** and **`project.title`**; hover/focus reveals **`project.summary`** with dark overlay and slide-from-left fade.
- [ ] Title remains visible when not hovering and when hovering.
- [ ] Section shows **Projects** heading and intro above the grid.
- [ ] Grid and header sit in **`mx-auto max-w-6xl px-5`** (responsive at mobile/tablet).
- [ ] CTA cell links to **`/projects`** with label **Show more projects**.
- [ ] Project tiles link to **`/projects/:slug`** for the five featured slugs.
- [ ] Featured set is driven only by **`homeFeaturedProjectSlugs`** in data.
- [ ] Placeholder projects show **Sample** on the tile when `placeholder: true`.
- [ ] **`prefers-reduced-motion`** avoids slide/scale; content stays usable.
- [ ] **`npm run build`** passes.
- [ ] Section uses existing **color tokens**; no new brand colors.

## Out of scope

- CMS, drag-and-drop reorder in admin, or dynamic “latest five” from an API.
- Lightbox, video, sector filters, or map on the home grid.
- Showing **`body[]`** paragraphs in the tile.
- Client logos, metrics, or named mines/operators they have not approved.
- Replacing the `/projects` index layout.
- Auto-promoting every new project to home without editing `homeFeaturedProjectSlugs`.
- Touch “first tap reveals, second tap navigates” (unless added in a follow-up ticket).

## Decisions (locked)

- **Section header** — Yes. Title is **Projects**. Include one intro sentence about past mining and industrial work (align with other home sections).
- **CTA label** — **Show more projects** on the sixth cell, linking to `/projects`.
- **Layout width** — Centered **`max-w-6xl`** with `px-5`, not edge-to-edge like the lanes row. The grid reflows (1 / 2 / 3 columns) inside that column so mobile and tablet stay readable.
- **Hover content** — **`summary`** only. No sector or region on the tile.
- **Production** — Ship the section in prod using the five placeholder projects. Build and polish as production UI; when Jason and Marsha supply real jobs, update `homeFeaturedProjectSlugs` and row data in Phase 4 (Sample labels drop automatically when `placeholder` is false). No dev-only gate for this section.

## Reference implementation notes (for dev)

- Reuse hover timing cues from **Industrial hygiene** lane (`.lane-lead-fill`) and **asbestos** `.reveal-fade`: prefer **transform + opacity** only for animation.
- Summary slide: `translateX(-1rem)` → `0` matches home `enter-slide` direction.
- Keep one mosaic grid on the home page; do not add a second auto-scrolling row here.

## Test plan

1. Load `/` — **Projects** heading and intro visible; six cells at desktop width inside a centered column; photos load from `/projects/…`.
2. Hover each project tile — overlay in, summary slides from left; mouse out — reverses.
3. Tab to each tile — focus ring visible; summary visible like hover.
4. Enable **Reduce motion** in OS — no slide; summary still readable on focus.
5. Click tile — lands on correct detail; back button returns to home.
6. Click CTA — `/projects` index.
7. Resize to phone — single column, CTA after fifth project.
8. Remove one slug from featured list in dev — grid shows four projects + CTA without crash (document whether five is enforced in code review).
9. Production build (`npm run build` + preview) — section renders (not dev-gated); placeholder tiles show **Sample** where `placeholder: true`.

## Related docs

- `docs/project-page-scope.md` — project type, samples, detail routes  
- `docs/testimonial-section.md` — pattern for home-only sections and phases  
- `docs/first-tasks.md` — task 2 projects page (data already live)
