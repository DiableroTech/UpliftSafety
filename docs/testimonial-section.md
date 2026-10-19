# Testimonial section

Scope for a home-page section. The reference is a review band: a centered title, a short line under it, a summary score on the right, and review cards with a rating, stars, a date, a quote, initials, and a name.

That band is a two-row grid. This section keeps the same stacking of title, subtitle, summary, and card, and puts the cards in **one row** that moves on its own. Cards leave on the left. New ones come in from the right. The row is the slider. There are no paging dots and no separate range control.

The colors are the Uplift tokens already in `src/index.css`. The reference photo’s teal field, gold stars, and Google marks stay in that photo.

Reading this as: a trust-first section on an industrial consultancy home page, for safety managers reviewing the demo, in the existing blue / paper / lime language, with one slow horizontal row.

## Where it sits

`src/pages/Home.tsx` today is four blocks: the hero, the three lanes, the asbestos feature, and the region line. The footer under that is also blue.

The testimonial band goes **after the asbestos feature and before the region line**. The region line stays the last line on the page, and it keeps this blue band from sitting directly on the blue footer.

The section is home-only. Other routes do not mount it.

This is the only sliding row on the home page. The hero’s slow scale stays as it is.

## Theme

Same shell as the rest of the site. Archivo for titles and the big score. Source Sans 3 for quotes. Square corners, matching `--radius-none`.

| Role | Token | On this section |
| --- | --- | --- |
| Band | `--color-blue` `#175873` | Full-bleed background. White type on it. |
| Card | `--color-paper` `#f7f6f4` | Card fill. |
| Title and score | white | On the blue band. |
| Body on a card | `--color-ink` `#3d4248` | Quote and attribution. |
| Secondary on a card | `--color-mute` `#454d52` | Supporting line under the name. |
| Stars on a card | `--color-blue` `#175873` | Filled stars on paper. |
| Stars in the summary | `--color-accent` `#ddf600` | A mark on blue, next to the big number. |
| Sample label | `--color-blue` `#175873` | On the paper card, in the date slot. |
| Pause control | white border, white label | Same idea as the hero’s secondary button. |

Lime is a mark on the blue band. It is not a star on a paper card, not body text, and not the section background. Paper cards sit on the blue with a small shadow so the edge reads. No second palette, no gold, no rounded “app” corners.

## What the visitor sees

1. A centered title: **What they say about us**.
2. One centered sentence under it: **Sample notes from site work. Real comments replace these when they are ready to publish.**
3. A row under that. Left: **What crews say about the work**. Right: the average rating to one decimal, five stars, and the count.
4. One horizontal line of cards, moving left at a steady speed, slow enough to read a card before it leaves.
5. A **Pause** control beside the score. It becomes **Play** while the row is stopped. Hovering the row, or focusing a control inside it, also stops the motion until the pointer or focus leaves. The button’s stop persists until Play.
6. With **reduced motion** turned on, the row does not move by itself. The same cards sit in a sideways scroller the visitor moves. The Pause control is absent in that mode, because nothing is playing.

The summary number and the count are calculated from `src/data/testimonials.ts`. They are not typed in by hand.

- Average: mean of `rating`, one decimal (`5.0`).
- Count: the number of rows.
- Count label: **notes** while any row has `placeholder: true`. **reviews** once every row is real.

While the eight samples below are the whole list, the summary reads **5.0**, five stars, **8 notes**.

## Card

Each card is an article, about `18.5rem` wide on a wide window and `16.5rem` on a phone width, equal height with the others. On a wide window about four cards are in view, with the next card already entering, so the row reads as a slider. On a phone, one card is in view and the next one peeks in.

Top line, in one row:

- The rating numeral (`5`) in Archivo.
- Five stars. Filled stars match the rating. Empty stars are the same blue at lower opacity.
- The date slot, aligned to the end. A placeholder shows **Sample** in blue. A real row shows its date, like `Oct 3, 2026`.

Quote under that, Source Sans 3, up to four lines. A quote longer than four lines gets a **More** button. More removes the clamp on that card and stops the row. **Less** puts the clamp back. Short sample quotes do not need More. The control exists so a longer real comment still fits the card.

Footer:

- A circle, ink fill, paper initials.
- The attribution in ink.
- A second line in mute when `detail` is set.

Initials are the first letter of the first word and the first letter of the last word. “Site supervisor” is SS. “Marsha Bell” is MB.

A Google mark is part of the card only when that row has `source: 'google'` and a real `sourceUrl`. Sample rows do not draw one. The mark is a link to that review, with an accessible name that includes the attribution.

## Content model

One file, `src/data/testimonials.ts`. The component only renders it. Replacing a sample is a data edit.

```ts
export type Testimonial = {
  id: string
  placeholder: boolean
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
  attribution: string
  detail?: string
  date?: string
  source?: 'google'
  sourceUrl?: string
}
```

`placeholder: true` is the switch. While it is true, the date slot says Sample, and the summary count says notes. When a real comment replaces the row, the flag comes off, `date` is set, and `attribution` becomes the name they agreed to publish. The layout stays.

No company name, mine name, headcount, or incident statistic on a sample. No quoted metric (“cut incidents by 40%”). No photo of a person. The initials circle is the avatar until a real review arrives, and even then this scope does not add photos.

`rating` is a whole number from 1 to 5. The summary average is the only decimal.

Empty list: the component renders nothing. The home page simply has no band.

If the cards in one copy of the list are narrower than the viewport, the row stays still. Motion starts only when there is something off-screen to reveal. Eight cards meet that on a phone and on a desktop.

## Sample notes

Eight stand-ins. Every one has `placeholder: true`, `rating: 5`, and no `date`, `source`, or `sourceUrl`. Order in the file is the order in the row.

| id | attribution | quote |
| --- | --- | --- |
| `sample-site-supervisor` | Site supervisor | They showed up ready to work with the crew, not to hand us a binder and leave. |
| `sample-mill-lead` | Mill safety lead | Lockout questions got a straight answer. The visit stayed on the work in front of us. |
| `sample-training` | Training coordinator | The session matched the work our people actually do on the floor. |
| `sample-hygiene` | Hygiene contact | Sampling was explained in plain language, including what the numbers do and do not say. |
| `sample-shift` | Shift supervisor | Procedures came back in a form the crew would use. |
| `sample-plant` | Plant contact | They were on time, they left the area as they found it, and the notes were clear. |
| `sample-shutdown` | Contractor coordinator | A useful second set of eyes on the program before a shutdown week. |
| `sample-crew` | Crew lead | Questions were welcome. The advice was specific to our site. |

Voice matches the rest of the site: plain, specific, no slogan. These sentences describe the kind of work. They are not claims about a named client.

## Motion

The reason for the motion: more notes than fit in one row, so the row advances and the next card comes into view.

Engine for the first build is CSS, in `src/index.css`, next to the other keyframes. No carousel library. The repo does not have one, and a library is a second motion system for a single row.

The track holds two copies of the list, laid out in one flex row with a fixed gap (`1rem`). The animation moves the track by half its width, then repeats. Because the two copies are identical, the loop has no jump.

```css
@keyframes testimonial-slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.testimonial-track {
  display: flex;
  width: max-content;
  gap: 1rem;
  animation-name: testimonial-slide;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: calc(var(--set-width) / 28 * 1s);
}
```

`--set-width` is a unitless pixel measure of **one** copy of the list (half the track’s `scrollWidth`), written from the component after layout and on resize. Dividing by 28 keeps the speed near 28 pixels a second as cards are added or removed. At that speed a card stays readable. The timing function stays linear so the loop does not speed up and slow down.

The viewport that clips the track is full-bleed, `overflow: hidden`. The title block above it stays in the same `max-w-6xl` column as the other home sections, with `px-5`.

Pause:

- `.testimonial-viewport:hover` and `:focus-within` set `animation-play-state: paused` on the track.
- The Pause button sets `data-paused="true"` on the track, and that state also pauses. Play removes it.
- More sets the same paused state until Less.

Reduced motion, inside the existing `@media (prefers-reduced-motion: reduce)` block:

- The track animation is `none`.
- The second copy is not rendered.
- The viewport is `overflow-x: auto`, with `scroll-snap-type: x mandatory` and `scroll-snap-align: start` on each card, so the row is a manual slider.
- The Pause button is not rendered.

The second copy is `aria-hidden` and `inert`, so a screen reader and the tab order meet each note once. Stars are decorative; the rating numeral and a visually hidden “Rated 5 out of 5” carry the score. The section is labeled by the title. The Pause button has an accessible name of Pause or Play.

Auto-moving content that lasts more than a few seconds needs a way to stop it. The Pause button is that control. It is in the tab order, in the summary row, before the cards.

## Files

| File | Role |
| --- | --- |
| `src/data/testimonials.ts` | The type, the eight samples, and a helper for the average and the count |
| `src/components/TestimonialSection.tsx` | The band, the summary, the cards, the track, Pause |
| `src/index.css` | `testimonial-slide`, the track class, the reduced-motion override |
| `src/pages/Home.tsx` | Renders the section between the asbestos block and the region line |

`TestimonialSection` takes no props. It reads the data file. Home only chooses the position.

Stars use `Star` from `@phosphor-icons/react`, which is already a dependency. Filled stars use `weight="fill"`.

## Phases

Ship in this order. Each phase is reviewable on its own. Later phases do not restyle earlier ones.

### Phase 1 — Data file

The section has nothing to render until the samples exist as data.

1. Add `src/data/testimonials.ts` with the type above and the eight rows in the table.
2. Export `testimonials`.
3. Export a helper that returns `{ average, count, hasPlaceholder }`. `average` is the mean rounded to one decimal with a normal half-up rule. `count` is the length. `hasPlaceholder` is true when any row has `placeholder: true`.
4. An empty array returns `average: 0`, `count: 0`, `hasPlaceholder: false`.

**Done when.** The file typechecks, all eight ids are unique, every sample is `placeholder: true` with rating 5, and none of them carry a date, a source, or a person’s name.

### Phase 2 — Static band and cards

Build the section with the cards in one row and **no animation yet**. This is the pass that locks the layout against the reference and against the Uplift tokens.

1. `TestimonialSection` renders a `section` with `bg-blue`, vertical padding close to the other home bands (`py-16` or `py-20`).
2. Header inside `mx-auto max-w-6xl px-5`: centered `h2`, centered subtitle in `text-white/80`, then the summary row. The summary row stacks on a narrow window (label, then score) and sits on one line from `sm` up, label at the start, score at the end.
3. The big number is Archivo, about `text-5xl`, white, extrabold. Stars beside it are accent. The count is `text-white/75`, under the stars or beside them, in the same cluster.
4. Cards in one non-wrapping row under the header, full-bleed, clipped by the viewport. Paper fill, square corners, a light shadow, the anatomy in **Card**.
5. Quote clamp at four lines. More / Less toggles that clamp. With the eight samples, More does not appear, because each quote fits.
6. Pause is visible and does nothing until phase 3. Rendering it now locks its place in the summary cluster.

**Done when.** `/` shows the band between the asbestos feature and the region line, the summary reads 5.0 and 8 notes, eight Sample cards are in one row, and the colors match the table in **Theme**.

### Phase 3 — Continuous slide

1. Render the list twice inside the track. The second copy is `aria-hidden` and `inert`.
2. After layout, and on resize, set `--set-width` to half the track’s `scrollWidth`.
3. Add the keyframes and `.testimonial-track` in `src/index.css`.
4. Hover and focus-within pause the animation.
5. The Pause button toggles `data-paused` and the label between Pause and Play.
6. If one copy of the list is narrower than the viewport, skip the duplicate and do not run the animation.

**Done when.** On a wide window and on a phone width, cards move left at a steady speed, the loop does not jump, hover and the Pause button both stop the row, and Play resumes it from where it stopped.

### Phase 4 — Reduced motion, keyboard, and the empty state

1. Add the track to the existing `prefers-reduced-motion: reduce` block. In that mode render one copy, use the sideways scroller with scroll snap, and omit Pause.
2. Tab from the Pause button into a card. Focus stays on the first copy. The row is paused while focus is inside the viewport.
3. Stars expose the rating in text, not only in the icon color.
4. When `testimonials` is empty, return `null` and leave the asbestos block sitting on the region line as it does today.
5. A quote forced over four lines (try one long string locally, then put the sample back) shows More, expands, and pauses until Less.

**Done when.** Reduced motion shows a still row the visitor can scroll sideways, the tab order hits each sample once, and an empty data file removes the band without a gap or an error.

### Phase 5 — Home pass

1. Confirm the order on `/`: hero, lanes, asbestos, testimonials, region line, footer.
2. The region line still separates the band from the footer.
3. Desktop and a phone width: the title is readable, the score cluster does not collide with the left label, cards are cut only by the viewport edge as they enter and leave, and the sticky header still clears the top of the page.
4. Pause, hover-pause, More (with a temporary long quote), and reduced motion all behave as phase 3 and 4 describe. Put the sample quote back afterward.
5. `npm run build` passes.
6. No second sliding row anywhere on `/`.

**Done when.** A visitor can read a card, stop the row, and see that the notes are samples, on a wide window and on a phone width, and the build passes.

### Phase 6 — Real comments replace samples

This phase waits on Jason and Marsha. It does not wait on a new layout.

For each comment they will publish:

1. Replace the matching sample, or append a row and delete a sample.
2. Set `placeholder: false`.
3. Use their wording. Set `attribution` to the name they approved, and `detail` to a role or site only if they said to publish it.
4. Set `rating` and `date`.
5. Set `source: 'google'` and `sourceUrl` only when the comment is actually that Google review. The mark appears because those two fields are set.
6. Remove any sample that has no real replacement, so the live row is only comments they will stand behind.

When `hasPlaceholder` becomes false, the subtitle that calls the notes samples comes out, and the count label switches to reviews. The average and the count follow the data on their own.

A hardcoded total, a star image, or a pasted “108 reviews” does not belong in this phase. The summary keeps reading from the helper.

## Acceptance

- `/` shows one testimonial band between the asbestos feature and the region line, inside the existing layout, using the tokens in `src/index.css`.
- The band has a centered title, a subtitle, a left label, a calculated score, and one row of cards.
- The row advances on its own, loops without a jump, and can be paused. Reduced motion turns it into a manual sideways scroller.
- Eight sample notes are visible, each marked Sample, none attributed to a real person or a real site.
- The summary says 5.0 and 8 notes because the data says that, not because the JSX contains those figures.
- A new comment is a new object in `src/data/testimonials.ts`.
- The second copy of the row is hidden from assistive tech.
- Lime appears as the summary stars on blue. Card stars are blue on paper.
- `npm run build` passes.
- Desktop and a phone width both show the band, the moving row, and Pause.

## Out of scope

- A reviews API, a Google Places fetch, or a CMS.
- Testimonials on About, Services, Training, or Projects.
- Prev / next arrows, paging dots, and a coverflow.
- Photos, company logos, and a quote metric they have not given us.
- A second sliding row on the home page.
- Drag-to-scrub. Pause, hover, and the reduced-motion scroller cover stopping and moving the row. A pointer-drag offset can be a later change if the CSS loop is not enough; it would replace the CSS animation with a transform updated each frame, because a CSS animation does not resume cleanly from an arbitrary dragged position.

## When their comments arrive

Ask for, per comment: the words they want published, the star rating, the date, the name and role they will put on the card, and whether it is a Google review with a URL. Drop that into the type above and turn `placeholder` off.
