# Alternating editorial showcases — dev ticket

**Type:** Home-page feature / redesign  
**Surface:** Home page (`/`)  
**Goal:** Replace the current three-lane services navigation with two substantial, photographic editorial sections: one for safety services and one for training.

## Summary

Remove the existing **Industrial hygiene / Safety programs / Training** lane immediately below the hero. Replace it with:

1. **Safety services showcase** — large image on the left, copy and interactive service links on the right.
2. **Training showcase** — copy and interactive training links on the left, large image on the right.

Each section should occupy meaningful vertical space, use real Uplift photography, explain the offering in more detail, and provide an obvious route to the full service or training page.

The experience is editorial rather than card-heavy: one strong image area, one structured copy area, restrained motion, and a clear alternating rhythm.

## Why this change

The existing three-lane section is useful as navigation but visually reads as a simple directory. It:

- gives Services and Training too little space;
- uses no supporting photography;
- does not explain why a visitor should choose Uplift;
- repeats a similar amount of visual weight for three items even though the offerings are broader;
- offers limited interaction beyond the Industrial hygiene fill effect.

The replacement should sell the work before asking the visitor to navigate.

## Placement and home-page order

The new sections replace the entire current lane block in `src/pages/Home.tsx`.

Revised order:

1. Hero
2. Safety services editorial showcase
3. Training editorial showcase
4. Asbestos certification feature
5. Projects CTA section
6. Testimonials (currently dev-only)
7. Region line
8. Footer

Do not keep the old three-lane block elsewhere on the home page.

## Design direction

### Shared visual language

- Full-width paper-colored sections with content constrained to `max-w-6xl`.
- Square image frames and content panels, consistent with the rest of the site.
- Archivo for headings, labels, links, and category names.
- Source Sans 3 for body copy.
- Existing color tokens only:
  - paper: `--color-paper`
  - blue: `--color-blue`
  - ink: `--color-ink`
  - mute: `--color-mute`
  - line: `--color-line`
  - lime accent: `--color-accent`
- Use photography as approximately **55–60%** of the composition at desktop widths.
- Each showcase should feel like a major home-page chapter, not a row of small cards.

### Desktop composition

Use a 12-column grid inside `mx-auto max-w-6xl px-5`.

**Services**

- Image: columns 1–7.
- Copy: columns 8–12.
- Minimum visual height: approximately `36rem`; target `65–75vh` where viewport height allows.

**Training**

- Copy: columns 1–5.
- Image: columns 6–12.
- Same minimum height and spacing as Services.

The alternating image placement creates a left-right reading rhythm without changing component behavior.

### Tablet composition

- Keep the split layout from `md` upward if content remains readable.
- Use approximately 50/50 columns.
- Reduce heading size and panel padding before reducing image prominence.
- Category descriptions may clamp to two or three lines.

### Mobile composition

- Stack each showcase into one column.
- Services: image first, then copy.
- Training: copy first, then image only if that preserves the alternating story; otherwise use image first for consistent mobile scanning. Prefer **image first for both** unless usability review finds the reversal clear.
- Image aspect ratio: `4 / 3` or a minimum height around `18rem`.
- Category rows remain normal links and do not require hover to expose necessary content.
- Section copy and active category description must be visible without interaction.

## Showcase 1 — Safety services

### Core copy

**Eyebrow:** `Safety services`  
**Heading:** `Safety support built around the work`  
**Intro:**

> Programs, field support, and practical advice shaped around the hazards, people, and pace of your operation.

The final copy may be polished, but it must communicate practical, site-specific support rather than generic compliance consulting.

### Interactive service links

Show four rows:

1. **Industrial hygiene**
   - Description: Exposure monitoring, air quality, welding fume, ergonomics, and hazardous materials.
   - Route: `/services/hygiene`
2. **Safety programs**
   - Description: Procedures, lockout, confined space, and programs built for the way the site operates.
   - Route: `/services`
3. **Audits and compliance**
   - Description: Hazard assessments, COR / OSSE audits, and clear priorities for improvement.
   - Route: `/services`
4. **On-site advisors**
   - Description: Experienced safety support for projects, shutdowns, leadership, and day-to-day operations.
   - Route: `/services`

Each row is a real `Link`. On desktop pointer hover or keyboard focus:

- it becomes the active row;
- its short description expands or fades into full emphasis;
- its blue indicator grows horizontally;
- the image area crossfades to the image assigned to that row;
- an arrow shifts slightly to the right.

Clicking follows the row route. Do not require a first click to activate and a second click to navigate.

### Primary CTA

Label: **Explore safety services**  
Route: `/services`

Use a bordered blue CTA with the existing blue-fill hover treatment. Keep Industrial hygiene accessible through its category row.

## Showcase 2 — Training

### Core copy

**Eyebrow:** `Safety training`  
**Heading:** `Training that holds up on site`  
**Intro:**

> Practical instruction for the work people are expected to lead, supervise, and complete safely.

The copy should emphasize recognized training, real-world delivery, and relevance to the participant’s workplace.

### Interactive training links

Show four rows:

1. **Asbestos certification**
   - Description: WorkSafeBC Level 1 and Level 2 training for awareness and abatement work.
   - Route: `/training`
2. **Leadership and supervision**
   - Description: Training for supervisors, managers, committees, and leaders responsible for safety performance.
   - Route: `/training`
3. **Hazard and incident training**
   - Description: Confined space, risk assessment, investigations, fall protection, and safeguarding.
   - Route: `/training`
4. **Equipment training**
   - Description: Practical mobile-equipment instruction for operators working in industrial environments.
   - Route: `/training/equipment`

Rows use the same interaction model as Services.

### Primary CTA

Label: **Explore safety training**  
Route: `/training`

The existing asbestos feature remains below these showcases. The training showcase should introduce the full training offering; the asbestos feature remains a focused conversion block for certification and group bookings.

## Photography

Use local images from `public/rewebsitekickoff/` or add approved local files under a dedicated folder such as `public/home-showcases/`. Do not add new remote Unsplash dependencies for these sections.

Candidate existing assets:

- `IMG_6908.jpeg` — active assessment in an industrial facility; strong Services lead image.
- `IMG_4644.JPG` — worker in respirator inside a plant; suitable for industrial hygiene.
- `IMG_1125.JPG` — worker at a winter industrial/mining site; suitable for field support.
- `IMG_1648.JPG` — industrial facility at sunset; suitable as a wide environmental image.
- `IMG_8018_edited_edited_edited_edited.jpg` — worker portrait at an industrial site.
- `IMG_2184.JPG` — workers in protective equipment; suitable where hazardous-material work is discussed.

Before implementation, review all local assets and choose images that:

- have enough resolution for a large desktop panel;
- retain a clear subject with `object-cover`;
- provide different visual stories for Services and Training;
- avoid reusing the same image already prominent in Projects;
- do not imply a course or service that the image does not depict.

The implementation data should own image paths and focal positions. Use an optional `objectPosition` field when the subject would otherwise crop poorly.

## Content model

Create `src/data/homeEditorialShowcases.ts`.

```ts
export type EditorialShowcaseItem = {
  id: string
  title: string
  description: string
  to: string
  image: {
    src: string
    alt: string
    objectPosition?: string
  }
}

export type EditorialShowcase = {
  id: 'services' | 'training'
  eyebrow: string
  title: string
  intro: string
  cta: {
    label: string
    to: string
  }
  imageSide: 'left' | 'right'
  items: readonly EditorialShowcaseItem[]
}

export const homeEditorialShowcases: readonly EditorialShowcase[] = [
  // Services
  // Training
]
```

Rules:

- JSX must not hard-code item titles, descriptions, routes, or image paths.
- Each showcase must contain at least one item.
- The first item is the default active item.
- IDs are stable and unique within the showcase.
- Existing routes are reused; this ticket does not create new service-detail routes.
- Alt text describes the image itself, not the category title.

## Component architecture

Create:

- `src/components/EditorialShowcase.tsx`
- `src/components/HomeEditorialShowcases.tsx`
- `src/data/homeEditorialShowcases.ts`

### `HomeEditorialShowcases`

- Reads `homeEditorialShowcases`.
- Renders the two showcase sections in data order.
- Owns no active-item state.

### `EditorialShowcase`

Props:

```ts
type EditorialShowcaseProps = {
  showcase: EditorialShowcase
}
```

Responsibilities:

- maintain the active item ID;
- render image layers;
- render heading, intro, rows, and CTA;
- handle pointer, focus, and responsive layout;
- reset to the first item only when the showcase data changes, not after pointer leave;
- expose a stable `aria-labelledby` relationship for the section heading.

Keep one reusable component rather than separate Services and Training components with duplicated behavior.

## Image transition behavior

Render all item images in the same positioned image frame:

- absolute positioning;
- `object-cover`;
- inactive image: `opacity: 0`;
- active image: `opacity: 1`;
- transition: approximately `500–700ms ease`;
- active image may scale from `1.025` to `1` while fading in;
- do not continuously animate images after the transition settles.

Add a subtle blue/black edge gradient only if needed for readability or visual depth. Copy does not sit over the image, so the image should remain mostly unobstructed.

Preloading is naturally handled by rendering all local image layers. Avoid setting image state from asynchronous `Image.onload` callbacks unless testing finds visible flashes.

## Text and scroll motion

When each showcase first enters the viewport:

1. Eyebrow fades in and moves upward approximately `8px`.
2. Heading reveals line-by-line from left to right or rises by approximately `16px`.
3. Intro fades in.
4. Category rows enter in a short stagger (`60–90ms` apart).
5. CTA fades in last.
6. Image frame reveals using a horizontal clip or mask:
   - Services: reveal left-to-right.
   - Training: reveal right-to-left.

Target total entrance duration: roughly `700–1000ms`. The sequence should feel deliberate but not delay interaction.

Implementation:

- use one `IntersectionObserver` per showcase or a reusable `useReveal` hook;
- trigger once at approximately `15–20%` visibility;
- animate `opacity`, `transform`, and `clip-path` only;
- do not use scroll-jacking;
- do not run layout measurements every animation frame.

The existing `useReveal` in `Home.tsx` can be extracted to `src/hooks/useReveal.ts` and reused by the asbestos feature and editorial showcases.

## Hover and focus motion

For each interactive row:

- inactive title remains fully readable;
- active title changes to blue;
- active description uses full ink/mute contrast;
- a blue rule grows from `0` to `100%`;
- arrow shifts `translateX(0)` to approximately `4px`;
- image crossfades to the row image.

Timing:

- text and rule: `250–350ms`;
- image crossfade: `500–700ms`;
- no delayed exit that makes the interface feel stuck.

The same state must occur on:

- `pointerenter`;
- keyboard `focus`;
- focus moving to any interactive child within the row.

Do not dim all inactive rows to low opacity. Use hierarchy through color, rule weight, and description treatment so the whole list remains legible.

## Touch behavior

On touch devices:

- category rows navigate with one tap;
- do not introduce “tap once to preview, tap again to navigate”;
- the first item image remains the default visual unless focus/hover capabilities exist;
- all item descriptions remain visible or are included directly below their titles;
- the primary CTA remains available after the item list.

Use the CSS media query `(hover: hover) and (pointer: fine)` for hover-only visual enhancements when needed.

## Accessibility

- Each showcase is a `<section>` with `aria-labelledby`.
- Category rows are semantic links.
- Active state cannot be communicated by color alone; use the visible rule and `aria-current="true"` only if it is semantically appropriate. Do not use `aria-selected` on ordinary links.
- Image transitions are decorative to the link behavior; avoid live-region announcements when the active image changes.
- If the image repeats the adjacent category meaning, use `alt=""`. If it adds meaningful information, provide concise alt text on the active image and hide inactive images from assistive technology.
- Focus rings must remain visible against paper and blue states.
- Links must have at least a 44px effective target height.
- Heading order must remain logical beneath the home hero’s `h1`.
- No required information is available only on hover.

### Reduced motion

Under `prefers-reduced-motion: reduce`:

- show the section immediately;
- disable clip-path reveals, stagger, image scale, and arrow translation;
- image changes may crossfade quickly or switch immediately;
- preserve all layout and active-state contrast.

## Responsive and performance requirements

- No cumulative layout shift while images load; use fixed aspect ratios or minimum heights.
- Use `loading="lazy"` for below-the-fold images.
- Use `decoding="async"`.
- Keep image files appropriately compressed; large source photos should be resized for web before shipping.
- Avoid React state updates on mouse movement; only change state when the active row changes.
- Do not attach window-level scroll listeners for reveal effects.
- Test long headings at 320px without horizontal overflow.

## Files to change

- `src/pages/Home.tsx`
  - remove `lanes`, `lead`, and the existing three-lane JSX;
  - mount `<HomeEditorialShowcases />` after the hero;
  - use the extracted reveal hook for asbestos if extracted.
- `src/components/HomeEditorialShowcases.tsx`
  - render both sections.
- `src/components/EditorialShowcase.tsx`
  - shared editorial layout and interactions.
- `src/data/homeEditorialShowcases.ts`
  - copy, routes, images, and image positioning.
- `src/index.css`
  - image reveal, crossfade, row active states, text stagger, and reduced-motion behavior.
- `src/hooks/useReveal.ts` (recommended)
  - reusable, one-shot `IntersectionObserver` behavior.

Do not alter `src/pages/Services.tsx` or `src/pages/Training.tsx` unless a route or copy mismatch is discovered during implementation.

## Implementation phases

### Phase 1 — Data and static structure

1. Create the typed showcase data.
2. Choose and map local images for all eight interactive rows.
3. Create `EditorialShowcase` and `HomeEditorialShowcases`.
4. Implement alternating desktop layout and stacked mobile layout.
5. Add headings, intros, category links, descriptions, and primary CTAs.
6. Insert the new sections after the hero.
7. Remove the old three-lane section and unused `lanes` data.

**Done when:** Both sections render from data, routes work, images crop correctly, and the old lanes no longer appear.

### Phase 2 — Interactive category states

1. Add active-item state with the first row active by default.
2. Update active item on pointer hover and keyboard focus.
3. Crossfade the corresponding image.
4. Add active rule, title color, description emphasis, and arrow movement.
5. Confirm one-tap navigation on touch devices.

**Done when:** Every row updates the visual on hover/focus and still navigates directly when activated.

### Phase 3 — Scroll reveal and polish

1. Extract or reuse the reveal hook.
2. Add one-time image mask reveal.
3. Add eyebrow, heading, intro, row, and CTA entrance sequence.
4. Add reduced-motion behavior.
5. Tune section spacing and image focal positions across breakpoints.
6. Compress oversized image assets.

**Done when:** Motion is smooth and restrained, no content is delayed for reduced-motion users, and both sections feel visually balanced.

### Phase 4 — Verification

1. Test phone, tablet, laptop, and wide desktop.
2. Test mouse hover, keyboard focus order, touch navigation, and view transitions.
3. Confirm routes:
   - `/services`
   - `/services/hygiene`
   - `/training`
   - `/training/equipment`
4. Confirm image loading does not shift page layout.
5. Run `npm run build`.
6. Check edited files for lint errors.
7. Visually review the transition from hero → Services → Training → Asbestos.

## Acceptance criteria

- [ ] The old three-lane home section is removed.
- [ ] Two large alternating editorial sections render immediately after the hero.
- [ ] Services uses image-left / copy-right at desktop.
- [ ] Training uses copy-left / image-right at desktop.
- [ ] Each section includes an eyebrow, headline, intro, four category links, and primary CTA.
- [ ] Each category row uses the routes defined in this ticket.
- [ ] Hover and keyboard focus activate the same row state and image.
- [ ] Image changes crossfade without flashing or layout shift.
- [ ] Inactive rows remain readable and are not heavily dimmed.
- [ ] Mobile uses a single-column layout with one-tap link navigation.
- [ ] Text and image entrance effects run once when scrolled into view.
- [ ] Reduced-motion users receive the complete content without slide, scale, mask, or stagger animation.
- [ ] Photography uses local project assets rather than new remote image dependencies.
- [ ] Images have appropriate alt handling and focal crops.
- [ ] All interactive targets have visible focus styles.
- [ ] `npm run build` passes.

## Test plan

1. Load `/` at desktop width and confirm the hero leads directly into Services, then Training.
2. Hover every Services row and verify the correct image, title treatment, description, rule, and route.
3. Repeat for all Training rows.
4. Tab through every row and CTA; verify focus changes the image and the focus ring stays visible.
5. Activate each link and confirm the expected destination.
6. Test at approximately 320px, 768px, 1024px, and 1440px widths.
7. Confirm no image or text overflows its section.
8. Enable reduced motion and reload; confirm content is immediately visible and stable.
9. Throttle network speed and confirm fixed image frames prevent layout shift.
10. Navigate away and back; confirm the page initializes with the first item active and no stale state.

## Out of scope

- New service-detail routes for every category.
- Video backgrounds or autoplay media.
- Scroll-jacking, pinned sections, or horizontal page scrolling.
- CMS-driven home content.
- Rewriting the full Services or Training pages.
- Removing the dedicated asbestos certification block.
- Carousels inside either showcase.
- Multiple active items at once.

## Product decisions captured

- Services and Training receive separate, substantial sections.
- The two sections replace the current three-lane block.
- Photography is a primary design element, not a small thumbnail.
- More explanatory copy appears directly on the home page.
- Motion includes scroll reveals, image crossfades, active rules, and restrained arrow movement.
- The design stays within the existing Uplift paper / blue / lime system.
- Interactions enhance navigation but never become a prerequisite for understanding or accessing content.
