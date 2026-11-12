# Training V2 — scope

A new page, `src/pages/TrainingV2.tsx`. It uses the Safety Services visual theme: the same four section designs, the same motion, the same type and color. It does not fold the nine training courses into those four sections.

Safety Services has four groups, and each group holds several topics. Training has nine courses. Each course is its own section. The four designs are a repeating theme, applied once per course, in order, until all nine are on the page.

This doc is the plan. Mark it up before the page is built.

## What this is

`SafetyServices.tsx` is the source of the theme. Training V2 copies the section designs and the motion. It changes how many times they appear, and what one section contains.

One training section is one course: a title, a duration, and that course's paragraphs. Nothing from the next course is pulled in to fill a layout.

The hidden `PageHero` in `SafetyServices.tsx` is `display: none`. It is not part of the page and it is not copied.

## What stays put

- `/training` keeps rendering `Training.tsx` until this scope says otherwise.
- `/training-v2` is a route only. It is not added to the header, the mobile menu, or the footer. The only way to open it is the URL.
- `SafetyServices.tsx` is not edited. The section designs are copied into `TrainingV2.tsx` and changed so each one renders a single course. Shared pieces are imported, not forked: `Reveal`, `ScrollClipReveal`, `ScrollProgressBar`, and the variants in `src/motion/uplift.ts`.
- Hygiene, equipment, and the homepage are out of this pass.
- Course paragraphs are copied as they stand. No rewrite in this pass.

## The four themes

These are the Safety Services section designs. On Training V2 each one is used for a single course.

**Photo.** Full-bleed photograph. On large screens a black scrim covers the left 62 percent. The number, course title, duration, and paragraphs sit in that left column, about 52 percent wide. The right side of the photo stays open. `background-position` is `right center`.

**Split.** Blue panel on the left with the number, title, and duration. Photograph on the right with the paragraphs on a dark scrim. The photo panel wipes open from the left as it enters.

**Light.** White background. Number, title, and duration centered. The paragraphs sit below. Two paragraphs use the two-column grid. One paragraph uses a single column.

**Featured.** Two columns, same shell as Safety Services. Left is a tall photograph: number, course title, duration, the first paragraph in the bordered card, and a **Contact us** button to `/contact`. Right is the striped panel with the second paragraph as plain text. Safety Services puts a third block in an italic quote card because that group has three topics. A training course does not. The quote card is omitted. The theme is the photograph, the card, the striped panel, and the same reveal timing.

## How the nine sections use the theme

The cycle is photo, split, light, featured, then it starts again. Course order is the order already on `/training`. Motion alternates with that cycle: a scroll-linked section, then a scroll-triggered one, then scroll-linked again.

| # | Course | Duration | Theme | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 01 | Safety Leadership Training | 8h | Photo | Scroll-linked | `/home-showcases/leadership-supervision.jpg` |
| 02 | Confined Space Training | 1 day | Split | Scroll-triggered | `/home-showcases/hazard-incident-training.jpg` |
| 03 | Incident Investigation Training | 4–8h | Light | Scroll-linked | none |
| 04 | Hazard ID & Risk Assessment Training | 4–8h | Featured | Scroll-triggered | `/home-showcases/hazard-incident-training.jpg` |
| 05 | Safety Committee (JHSC) Training | 8h | Photo | Scroll-linked | `/home-showcases/on-site-advisors.jpg` |
| 06 | Equipment Safeguarding Training | 4–8h | Split | Scroll-triggered | `/training/equipment-training-homepage.png` |
| 07 | Industrial Safety Supervision Training | 2 days | Light | Scroll-linked | none |
| 08 | Fall Protection Training | ½ or 1 day | Featured | Scroll-triggered | `/training/safety-training-homepage-2.png` |
| 09 | Asbestos Safety Training | L1 / L2 | Photo | Scroll-linked | `/training/asbestos-training-homepage.jpg` |

Rows 02, 04, and 05 reuse a showcase photo because `public/training` has no file for that course. Those three are stand-ins. Swap the path in this table to change them.

The call to action band sits once, after section 01, which is where Safety Services places it: after the opening photo, before the rest of the page. It is not inserted between every section. The equipment link is the last thing on the page, after section 09.

## Page order

1. Accent progress bar, fixed to the top of the viewport, tied to the page. Hidden when the visitor prefers reduced motion.
2. Section 01, photo theme.
3. Call to action band. White, centered, one sentence, one blue button.
4. Sections 02 through 09, in the cycle above.
5. Footer line: "Need mobile equipment training instead?" linking to `/training/equipment`.

## Motion

Every course section uses Motion. The driver switches from one section to the next. Neighbors do not share a driver. The progress bar is scroll-linked for the whole page. The call to action band is scroll-triggered, so the still white band between section 01 and section 02 still moves once.

Reduced motion turns both drivers off and shows the content in place. Easing for anything that plays on its own is `[0.215, 0.61, 0.355, 1]`.

**Scroll-linked.** The value is scroll progress through that section (`useScroll` and `useTransform` from `src/motion/scroll.ts`). Dragging the scrollbar moves the animation. Scrolling back up runs it backward. It does not play once and stop.

**Scroll-triggered.** The animation plays when the section enters the viewport (`whileInView` or `Reveal`) and then stays. Scrolling back up does not rewind it.

| # | Theme | Driver | What is tied to that driver |
| --- | --- | --- | --- |
| 01, 05, 09 | Photo | Scroll-linked | While the section crosses the viewport, the photograph moves from `y -5%` / `scale 1.06` through `scale 1` to `y 5%` / `scale 1.03`. The scrim, title, and paragraphs fade and slide on that same progress, not on a timer |
| 02, 06 | Split | Scroll-triggered | The blue panel and the photo panel each play once on enter. The panel comes in from the left over 0.85s. It is not a scrubbed clip |
| 03, 07 | Light | Scroll-linked | Opacity and the rise of the title and each paragraph follow enter progress through the section. Scrolling back pulls them down again |
| 04, 08 | Featured | Scroll-triggered | `Reveal` plays once: scrim immediately, title at 300ms, card at 500ms, striped-panel text at 300ms |

The page progress bar stays scroll-linked: an accent line whose `scaleX` follows scroll through the whole page, smoothed with `useSpring`. The call to action band fades and rises once when it enters.

## Call to action

The band matches Safety Services. Proposed words:

- Sentence: Ready to book a course for your crew?
- Button: Book group training
- Destination: `/contact`

## Implementation

Do the phases in order. Do not start a phase until the one before it is done. Do not point `/training` at this page in any phase.

### Phase 1 — Single-course section components

Copy the four section designs out of `SafetyServices.tsx` into `TrainingV2.tsx`. Change each one so its input is one course, not a group of topics.

1. Define the course shape used by every section: number, title, duration, paragraphs, theme, and an optional photo path.
2. Build the photo section for that shape. Number, title, duration, and every paragraph stack in the left column. Drive the photograph, the scrim, the title, and the paragraphs from `useSectionInViewportProgress`. Do not also play a one-shot slide on this section.
3. Build the split section for that shape. Left panel is number, title, and duration. Right panel is the photograph and the paragraphs. Both panels use `Reveal` and play once on enter. Do not scrub this section with scroll progress.
4. Build the light section for that shape. Centered number, title, and duration. Paragraphs in the grid, one column when there is only one paragraph. Map their opacity and rise to `useSectionEnterProgress` so the motion stays tied to scroll.
5. Build the featured section for that shape. Left card holds the title, the duration, and the first paragraph, plus the contact button. The striped panel holds the second paragraph when the course has one. Do not render the quote card. Use `Reveal` with the delays in the motion table, once.
6. Add the reduced-motion branch on each section: no scroll link, no triggered playback, content in place.

### Phase 2 — The nine courses

1. Put the nine courses in `TrainingV2.tsx`, in the table order above, with the theme and photo from that row.
2. Copy each course's paragraphs from `Training.tsx`. Do not edit the words.
3. Set the duration string from the current course summary (`8h`, `1 day`, `4–8h`, `2 days`, `½ or 1 day`, `L1 / L2`).

### Phase 3 — Assemble the page

1. Wrap the page in a ref and mount `ScrollProgressBar` on it.
2. Render section 01.
3. Render the call to action band with the sentence and button from this doc.
4. Render sections 02 through 09 by theme.
5. Render the equipment link after section 09.
6. Confirm a course with one paragraph and a course with two paragraphs both render, and that no section reads a neighboring course.

### Phase 4 — Preview route

The route is reachable. It is not listed anywhere a visitor can click.

1. Import `TrainingV2` in `App.tsx`.
2. Add the route `/training-v2`.
3. Leave the `/training` route on `Training`.
4. Do not add the route to `trainingItems` in `Header.tsx`, the mobile menu, or the footer link list.
5. The Training item in the header is active when the path starts with `/training`. Narrow that check so `/training-v2` does not light the Training menu.

### Phase 5 — Check

1. Desktop, around 1440 wide: all nine sections, the band after section 01, the equipment link. Each photo section shows the open right side of the picture. Split and featured photos fill their panel. No section is a second course stuffed into the one above it.
2. Phone width: the same nine sections stack, titles stay readable, photos still cover their panel.
3. Scroll section by section. On 01, 03, 05, 07, and 09, moving the scrollbar moves that section's animation, and scrolling up reverses it. On 02, 04, 06, and 08, the animation plays once on the way in and does not rewind. The call to action band plays once. The progress bar tracks the page.
4. Prefers-reduced-motion: no motion, progress bar absent, all nine courses readable.
5. Contact button goes to `/contact`. Equipment link goes to `/training/equipment`. `/training` is still the accordion.
6. Open `/training-v2` from the address bar. The header, mobile menu, and footer show the same links as before. Training in the header is not marked current on that URL.

## Open

Edit this list in place.

- Stand-in photos on sections 02, 04, and 05.
- Sentence and button label on the call to action band.
- Whether any light section should wait until half of it is in view.
- Whether `/training` is replaced later. Until then, `/training-v2` stays a URL with no nav entry.

## Notes

Add review notes here.
