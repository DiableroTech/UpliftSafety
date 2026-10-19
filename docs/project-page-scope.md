# Projects page — scope

Scope for task 2 in `docs/first-tasks.md`. This is the page that shows past work, then asks the visitor to start a similar job.

The palette from task 1 is already on the site. This page uses that theme. It does not invent a second one.

Real client names and site names are not in yet. Until Jason and Marsha send jobs they will publish, the page ships with **sample projects**: invented stand-ins, labeled as samples, built on the kickoff photos. Swapping a sample for a real job is a data edit, not a layout rewrite.

## What the visitor does

1. Opens **Projects** and sees a short list of jobs, mining and industrial work first.
2. Filters by sector if they care (mining, industrial, forestry, or all).
3. Opens one job and reads what the work was.
4. Hits one action: talk about a similar job. A quieter link can go to the related service or training page.

Minex is the reference for that flow: large photography, a few facts, then an ask. Before building the layout, note three things from Minex and keep them in this doc: how big the index photos are, which facts sit on a project, and where the contact ask is. We take that structure. We do not copy their markup, type, or colors.

## Theme

Same shell as the rest of the site: `Layout`, sticky header, blue footer, Archivo for titles, Source Sans 3 for body.

| Role | Token | On this page |
| --- | --- | --- |
| Page | `--color-paper` `#ffffff` | Index and detail background |
| Blue | `--color-blue` `#175873` | Hero scrim, sector label, links, filter when selected |
| Green | `--color-accent` `#ddf600` | The one primary button on a detail page, dark-gray label |
| Dark gray | `--color-ink` `#3d4248` | Titles and body |
| Gray | `--color-mute` `#454d52` | Summaries and secondary facts |
| Light gray | `--color-line` `#b9b8b4` | Rules between jobs |

Green is a button fill and the logo stroke. It is not body text and not a thin rule on white. Links and the "Sample" label are blue.

Reuse `PageHero` for the index intro and for each detail hero. The scrim stays the blue wash already on the other heroes, so white type sits on the photograph. Detail body copy sits on white under that hero, the same way About sits under its hero.

Photography is full-bleed or a wide band. Jobs stack as rows, not as a grid of equal cards. No logo wall, no three matching tiles, no checkerboard.

## Content model

One file, `src/data/projects.ts`. Pages only render it. Adding or replacing a job does not require a new component.

```ts
type Project = {
  slug: string
  placeholder: boolean
  title: string
  sector: 'mining' | 'industrial' | 'forestry'
  region: string
  services: string[]
  summary: string
  body: string[]
  image: { src: string; alt: string }
  gallery?: { src: string; alt: string }[]
  related?: { label: string; to: string }
  cta: { label: string; to: string }
}
```

`placeholder: true` is the switch. While it is true, the index and the detail show a visible **Sample** label in blue, next to the sector. When a real job replaces the row, that flag comes off and the label goes with it. The rest of the layout stays.

No `client` field until they give a name they will publish. No year, headcount, dollar figure, or incident statistic on a sample. Those fields can be added later only for a real entry that includes them.

`related.to` is an existing route: `/services`, `/services/hygiene`, `/training`, or `/training/equipment`. The call to action is always `/contact`. The button label is **Talk about a similar job**.

Unknown slugs render a short not-found state: one line, and a link back to `/projects`. They do not fall through to a blank page.

## Sample projects

Five stand-ins. Titles describe the kind of work, not a company. Every one carries `placeholder: true` and the Sample label. Photos come from `public/rewebsitekickoff`. Phase 1 copies sized versions into `public/projects/` so the page does not serve the camera originals.

Order on the index is the order in the data file. Mining and industrial lead. The hygiene job is in the list because that work is real. It is not the first row.

| Slug | Title | Sector | Region | Photo | Related |
| --- | --- | --- | --- | --- | --- |
| `sample-open-pit` | Field support through a winter pit season | Mining | Interior British Columbia | `IMG_1125.JPG` | `/services` |
| `sample-mill-lockout` | Lockout program on a processing line | Industrial | Western Canada | `edfefb0b-7321-4d42-9095-d0c1ca6c3237.jpg` | `/services` |
| `sample-forest-mill` | Safety programs for a forest-products mill | Forestry | British Columbia | `IMG_1648.JPG` | `/services` |
| `sample-plant-sampling` | Exposure monitoring inside an operating plant | Industrial | British Columbia | `IMG_6908.jpeg` | `/services/hygiene` |
| `sample-crew-training` | Crew training ahead of a site mobilization | Mining | Kamloops | `IMG_1062.JPG` | `/training` |

Optional gallery frames, used on the detail page only when the row has them:

| Slug | Extra frame |
| --- | --- |
| `sample-mill-lockout` | `IMG_4644.JPG` |
| `sample-plant-sampling` | `IMG_2906_edited_edited.png` |
| `sample-open-pit` | `IMG_2184.JPG` |

`IMG_8018.heic` and `IMG_2055.heic` stay out. HEIC does not belong on the site. The edited jpeg of 8018 can be a later gallery frame if a sample needs an outdoor piping shot. It is not required for the first five.

### Sample copy

Write each body as two short paragraphs in the same plain voice as the rest of the site. State the setting, the kind of help, and the sort of people on site. Do not name an operator, a mine, or a result they have not told us.

Shape for every sample:

1. Where this kind of work happens, and what Uplift is there to do.
2. What the visitor would recognize: programs, lockout, sampling, training, or a shutdown. Then stop.

The index summary is one sentence, under about 140 characters. The detail page repeats that sentence under the title, then the two paragraphs.

Example, for `sample-open-pit` only. The other four follow the same shape.

- **Summary.** Seasonal field support for an open pit: programs, crew contact, and a consultant on the ground through winter.
- **Body.** A pit does not pause for the season. Crews keep moving, contractors come and go, and the safety program has to hold up in the cold. This sample shows how a mining engagement would read on the site.
- **Body.** Uplift is on site for the work itself: procedures the crew will actually use, time with supervisors, and a clear line back to the people who own the program. Names, dates, and outcomes go here when the real job replaces this sample.

## Files

| File | Role |
| --- | --- |
| `src/data/projects.ts` | The five samples, the type, and a `getProject(slug)` helper |
| `src/pages/Projects.tsx` | Index |
| `src/pages/ProjectDetail.tsx` | Detail and the unknown-slug state |
| `src/App.tsx` | `/projects` and `/projects/:slug` |
| `src/components/Header.tsx` | Projects link, desktop and mobile, after About |
| `src/components/Footer.tsx` | Projects in the site list, after About |
| `public/projects/` | Sized jpeg or webp copies. Long edge about 1600px |

`PageHero` stays shared. If a detail page needs a fact row under the hero, that row lives in `ProjectDetail.tsx`, not as a new design system.

## Phases

Ship in this order. Each phase is reviewable on its own. Later phases do not restyle earlier ones.

### Phase 1 — Photos and the data file

The page has nothing to render until the samples exist as data, and the photos are a sane size.

1. Make `public/projects/`.
2. Export the photos named in the tables above. Long edge about 1600px, reasonable jpeg or webp quality. Keep the filenames stable and free of spaces.
3. Write `src/data/projects.ts` with the type, the five rows, `placeholder: true` on each, alt text that describes the photo (a person at a snowy pit, a lockout board in a mill), and the example copy pattern for all five.
4. Export `projects` and `getProject`. `getProject` returns `undefined` for an unknown slug.

**Done when.** The data file typechecks, every `src` path exists under `public/projects/`, and no sample points at a file in `rewebsitekickoff` or at a HEIC.

### Phase 2 — Index

Route `/projects`. One `PageHero`: title **Projects**, a short intro that this is past work in mining and industrial settings, image `image-asset.jpeg` (the Kamloops banner) after the same resize step. The intro can say the jobs below are samples of the work, in one plain sentence, so the hero and the Sample labels agree.

Under the hero:

1. A filter row: **All**, **Mining**, **Industrial**, **Forestry**. All is selected on first load. The selected chip is blue text on white with a blue underline, the same idea as the nav active state. Unselected chips are dark gray.
2. The filtered list. Each row is a full-width link: wide photo, then a text block on white with the Sample label, sector, title, region, summary, and a blue text link **View project**. Rows stack. On a wide screen the photo can sit beside the text, photo taking about half, still one horizontal band per job. Not a card grid.
3. Keyboard: the filter controls are real buttons, `aria-pressed` on the active one. Tab order is filter, then the job links.
4. If a sector has no rows, one line: **No projects in this sector yet.** With the five samples, Forestry and Mining and Industrial all have at least one, so this state is for later, when a real set might leave a sector empty. Still build it.

**Done when.** `/projects` shows five samples, the filter changes the list without a reload, and an empty sector shows the line above.

### Phase 3 — Detail

Route `/projects/:slug`.

1. `PageHero` uses that project's image, title, and summary. Sample label sits in the hero kicker, in the accent green, because the kicker is on the blue scrim. On the white body below, Sample is blue, not green.
2. A fact line under the hero: sector, region, and the service tags. Tags are text, separated by a light rule or a simple inline list. They are not colored pills in green.
3. The two body paragraphs, max width about 65 characters, same measure as About.
4. Gallery, if present: one extra photo under the copy, full width of the text column, with its alt text. No lightbox in this scope.
5. Primary button: green fill, dark-gray label, **Talk about a similar job**, linking to `/contact`.
6. If `related` is set, a blue text link under the button, the related label, pointing at that route.
7. Unknown slug: the hero title **Project not found**, one sentence, and a blue link back to `/projects`. No throw, no blank outlet.

**Done when.** Each of the five slugs renders its own photo, copy, button, and related link, and `/projects/not-a-job` shows the not-found state.

### Phase 4 — Navigation and a full pass

1. Header: **Projects** after About, on desktop and in the mobile menu. Active state matches the other links (blue label, blue underline on white).
2. Footer site list: Projects after About.
3. Click through every sample from the index, use the filter with the keyboard, open the mobile menu, and confirm the green button appears once on a detail page and nowhere on the index.
4. `npm run build` passes.

**Done when.** A visitor can reach a sample from the header, the footer, and the index, on a wide window and on a phone width, and get back to the list from a bad slug.

### Phase 5 — Real jobs replace samples

This phase waits on them. It does not wait on a new layout.

For each real job they send:

1. Replace the matching sample row, or append a new row and delete a sample.
2. Set `placeholder: false`. The Sample label disappears because the template only renders it when the flag is set.
3. Use their title, region, and wording. Add a client name only if they said to publish it.
4. Point `image` at a photo they approve. Resize it the same way as phase 1.
5. Remove any sample that has no real replacement, so the live list is only work they will stand behind.

The index hero sentence that calls the list samples comes out in this phase, once every remaining row is real.

A home-page link to one featured project waits until at least one row is real. A sample does not get a slot on the home page.

## Acceptance

- `/projects` and `/projects/:slug` render inside the existing layout and use the task 1 tokens.
- Five sample projects are visible, each marked Sample, none named as a real client or a real mine.
- Index and detail each have one clear next step. The green button exists only on the detail page.
- A new job is a new object in `src/data/projects.ts`.
- The filter works by keyboard and has an empty state.
- Photos on the page are the sized files in `public/projects/`.
- `npm run build` passes.
- Desktop and a phone width both show the list, the filter, a detail page, and the mobile nav entry.

## Out of scope

- A CMS, a PDF case study, and a lightbox.
- Metrics, awards, or client logos they have not given us.
- Linking a sample from the home page.
- Search indexing work. Task 6 will add titles and the sitemap once these routes exist. This scope only needs the routes and one `h1` per page, which `PageHero` already provides.
- Renaming service pages or rebuilding the training layout. Those are task 3.

## When their list arrives

Keep this table in the data file's favor. Ask for, per job: a title they like, whether the client name can be public, sector, region, two or three sentences, which service page it should point at, and which photo. Drop that into the type above and turn `placeholder` off.
