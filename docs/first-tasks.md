# Uplift Safety — First tasks

Working plan taken from the notes sent after the meeting. The demo at `https://upliftsafety.netlify.app/` is the base we iterate on. This is the build list for that next pass, not the statement of work.

Each task below is sized so it can become its own change later: one purpose, files named, acceptance written down, blockers called out. Copy and project proof stay in data the pages read. We do not invent client names or metrics. Brand colors are the codes Jason sent; they live in one token map.

Stack today: Vite, React, TypeScript, Tailwind v4, React Router. Routes live in `src/App.tsx`. Color tokens live in `src/index.css`.

## Current site

| Route | Page | Information layout today |
| --- | --- | --- |
| `/` | Home | Full-bleed hero, three lanes, asbestos feature, region line |
| `/about` | About | Story and people |
| `/services` | Safety services | `PageHero` + accordion groups |
| `/services/hygiene` | Hygiene services | `PageHero` + tabs |
| `/training` | Safety training | `PageHero` + `CourseCatalog` (list left, detail right) |
| `/training/equipment` | Mobile equipment training | Same catalog as training |
| `/contact` | Contact | People, phones, UI-only form |

Shared chrome: sticky header in `src/components/Header.tsx`, footer, no chat bubble. `index.html` has a single title and no description, canonical, or social tags. The app is a client-rendered SPA, so a crawler that does not run JavaScript only sees that shell.

Tokens in use: charcoal page (`--color-ink` `#0b0b0b`), off-white type (`--color-paper`), lime accent (`--color-hi` `#c8e000`). Type is Archivo and Source Sans 3 via Fontsource.

The layout they asked to repeat is `CourseCatalog`: a numbered list on the left, one active item on the right, meta (duration) as a small label, body copy in the detail pane. Safety services and hygiene do not use that pattern yet. The catalog has no image and no call to action inside a section.

## What we need from them first

Color codes and a first batch of brand files are in. What is still open is type, and names for the past work. More files can land in the same folder later.

### On hand: `public/rewebsitekickoff`

Logos are four 750×750 PNGs, all on a black square. (1) stacked, gray wordmark. (2) horizontal, gray wordmark. (3) stacked, white wordmark. (4) horizontal, white wordmark. The mark matches the twin peaks already in `src/components/Logo.tsx`. None of the files are transparent, and none are SVG. On the white page, use the horizontal gray lockup as the reference and put that mark in the header component. The black square itself does not go on a white bar. The white-wordmark files are for a blue or photo band.

| File | What it is |
| --- | --- |
| `Uplift Brand Logos (750 x 750 px) (1).png` | Stacked logo, gray wordmark, black ground |
| `Uplift Brand Logos (750 x 750 px) (2).png` | Horizontal logo, gray wordmark, black ground |
| `Uplift Brand Logos (750 x 750 px) (3).png` | Stacked logo, white wordmark, black ground |
| `Uplift Brand Logos (750 x 750 px) (4).png` | Horizontal logo, white wordmark, black ground |
| `123.png` | Marsha headshot |
| `1234.png` | Jason headshot |
| `image-asset.jpeg` | Kamloops, river and hills. Wide banner |
| `IMG_1062.JPG` | Marsha teaching a classroom in high-vis |
| `IMG_1125.JPG` | Jason above a snowy pit |
| `IMG_1648.JPG` | Mill at dusk across a field |
| `IMG_2184.JPG` | Two workers in yellow suits on a dark industrial slope |
| `IMG_2906_edited_edited.png` | Marsha with air-sampling pumps |
| `IMG_4291 (1).jpeg` | Marsha at AIHA Connect |
| `IMG_4644.JPG` | Jason in a respirator inside a plant |
| `IMG_6908.jpeg` | Marsha sampling on a plant floor |
| `IMG_8018_edited_edited_edited_edited.jpg` | Marsha at an outdoor piping site |
| `edfefb0b-7321-4d42-9095-d0c1ca6c3237.jpg` | Jason beside a lockout board in a mill |
| `e5fde5df-e2c4-4e60-9e16-1110459608bb.jpg` | Marsha in a hard hat, close crop |
| `IMG_8018.heic` | Same scene as the edited jpg above. Do not ship HEIC |
| `IMG_2055.heic` | HEIC only. Convert before anyone uses it |

These are the source files. Camera originals run about 3000–4000px and up to 8MB. Pages should use sized exports, not the raw files. Stock stays only where none of these fit, and it stays marked temporary. Budget still allows buying more photography later.

### Still open

| Input | Unblocks | Notes |
| --- | --- | --- |
| Font files, if they differ from Archivo / Source Sans 3 | `src/index.css` font imports | Nothing in the kickoff folder is a font. If they send licensed files, self-host them under `public/fonts` and drop the Fontsource imports. If they are happy with the demo type, record that and close this. |
| Which photo is which job, and the client or site name | Projects page entries | The folder is people and places. It is not a labeled case-study set. The shell can use these pictures. A finished project entry still needs a name they are willing to publish. |

## Suggested order

1. **Shared section layout.** It is the pattern every service page will sit on, and it can land before the recolor.
2. **Palette tokens.** Jason's codes are in, so this is a straight token swap across header, footer, heroes, catalog, and the contact form. Gradient waits until these tokens exist, so we do not paint it twice.
3. **Header and home gradient.** Small, visual, depends on the light theme being in place.
4. **Positioning copy.** Rewrite the strings inside the new section data so mining and industrial work lead. Doing this while the pages are being reshaped avoids a second copy pass.
5. **Projects page.** Build from `docs/project-page-scope.md`: sample jobs first, real names when they send them.
6. **SEO.** Titles, prerender, and schema after the route list is stable, including `/projects`.
7. **Chat bubble.** A button that opens the visitor's own Messages app to Jason's number. No server. Check placement once the header is light, because the bubble sits over the page.

Open questions at the bottom can be answered any time. They improve the copy. They do not gate the shell.

---

## 1. Light palette: white, blue, green

**Intent.** Move the demo off the dark charcoal skin. White is the page. Blue is the secondary color (header, bands, links, secondary buttons). Green is the accent (primary button, active mark on blue or dark gray, small labels on those same surfaces).

Jason sent these codes. They replace the demo lime `#c8e000` and the open "green TBD" note.

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Page | `--color-paper` | `#ffffff` | Page background. White was the agreed base; he did not send a separate white hex. |
| Blue | `--color-blue` | `#175873` | Header, bands, links, hero scrim, secondary button border. |
| Green | `--color-accent` | `#ddf600` | Primary button fill, active mark sitting on blue or dark gray. |
| Dark gray | `--color-ink` | `#3d4248` | Body text, headings, text on the green button. |
| Gray | `--color-mute` | `#454d52` | Secondary text. |
| Light gray | `--color-line` | `#b9b8b4` | Borders, dividers, quiet fills. |

**Current.** `body` is `--color-ink`. Components use `bg-ink`, `text-paper`, `text-hi`, `border-line`, and `bg-ink-2` directly. Heroes wash a dark gradient over photos so white type stays readable. Lime is `#c8e000`.

**Plan.**

- Keep a single token map in the `@theme` block of `src/index.css`. Components keep speaking in roles (`paper`, `ink`, `mute`, `line`, `accent`, `blue`), not in raw hex. `--color-hi` and `--color-hi-ink` either become aliases of accent and ink, or get replaced in the same pass so lime does not linger under a second name.
- Green `#ddf600` is a bright yellow-green. It holds dark gray text (about 8:1). It fails as text or as a thin rule on white (about 1.2:1). Use it as a fill, and as a mark only on blue or dark gray.
- Blue `#175873` holds white text (about 8:1). Links and header labels can be white on blue, or blue on white.
- Gray `#454d52` is dark enough for secondary copy on white (about 8:1). Light gray `#b9b8b4` is not (about 2:1). It stays a line and a surface, never a sentence.
- Hero type on photographs still needs a scrim. That scrim is blue `#175873`, strong on the left, fading toward the photo. It is separate from the header gradient in task 4, and it uses the same blue token.
- Primary button: green fill, dark gray text. One primary treatment.
- Check every route after the token swap: home, about, both service pages, both training pages, contact, desktop menu, and the mobile menu. The mobile panel is a separate background (`bg-ink` today) and will look broken if only the desktop bar is updated.

**Acceptance.**

- The five codes above are the only brand colors in `src/index.css`, plus white for the page.
- No charcoal page background and no lime `#c8e000` remain.
- Green is a fill and a mark on blue or dark gray. It is not body text on white, and it is not a large fill behind paragraphs.
- Body text, secondary text, and the label on the green button meet normal contrast.
- `npm run build` passes.

**Blocked on.** Nothing. The logo files are in the kickoff folder. Font files can arrive later without changing these values.

**Out of this task.** New page layouts, new copy, a second theme toggle.

---

## 2. Projects page

**Intent.** A page flow for past work, with a call to action on the work itself. Minex is the reference for how a visitor moves from a list of jobs into a single job and then into a conversation. We take a pass over Minex (index and one project) and write down what we are copying before building the layout: hierarchy, image scale, and where the ask sits. We are not cloning their markup.

**Current.** No `/projects` route. Nav in `src/components/Header.tsx` has Home, About, Services, Training, Contact. Proof of past work is a sentence or two inside service copy (mining, forest products, shutdowns), not a destination.

**Plan.**

- Add `/projects` and `/projects/:slug` in `src/App.tsx`.
- Add **Projects** to the header, desktop and mobile, beside About. Training calendar stays an external link.
- Content lives in `src/data/projects.ts`, not in JSX.

```ts
type Project = {
  slug: string
  title: string
  client?: string
  sector: 'mining' | 'industrial' | 'forestry' | 'other'
  region: string
  year?: string
  services: string[]
  summary: string
  body: string[]
  image: string
  gallery?: string[]
  cta: { label: string; to: string }
}
```

- **Index.** Large image, title, sector, region, one-line summary, and a text link into the project. A small filter for sector is enough (mining / industrial / all). No equal card grid of logos.
- **Detail.** Hero image, the facts (sector, region, services), the story, then one action. The action goes to `/contact` with context in the label ("Talk about a similar job"), and a second quiet link goes to the related service or training page when `services` maps to a route we already have.
- Unknown slugs render a simple not-found state with a link back to the index.
- Until they send real jobs, the page uses labeled sample projects. The full phased plan, the five stand-in jobs, and the rule that a sample never reads as a named client are in `docs/project-page-scope.md`.
- Home can later point at one featured project. That link waits until a real entry exists.

**Acceptance.**

- Both routes render inside the existing layout.
- Index and detail each have one clear action.
- A project can be added by editing the data file only.
- Filter works with keyboard and shows an empty state when a sector has no entries.
- Sample entries are labeled Sample and carry no client or mine name. `docs/project-page-scope.md` is the build plan.

**Blocked on.** Nothing for the sample page. A list they will publish replaces the samples in phase 5 of that scope. Photos for the stand-ins are already in `public/rewebsitekickoff`.

**Out of this task.** A CMS, a public case-study PDF, and metrics they have not given us.

---

## 3. One information layout for services and training

**Intent.** Safety Services is the layout they want kept. Hygiene services, Safety Training, and Mobile equipment training should use that same list-and-detail structure, with an image and a call to action on the active section.

**Current.**

- `src/components/CourseCatalog.tsx` is the pattern: left list, sticky detail, numbered rows, duration chip, paragraphs. Used by `src/pages/Training.tsx` and `src/pages/Equipment.tsx`.
- `src/pages/Services.tsx` uses `Accordion`.
- `src/pages/Hygiene.tsx` uses `Tabs`.
- `PageHero` stays. It already gives every one of these pages a title, a short intro, and a photo.

**Plan.**

- Generalize the catalog rather than building a second component. Rename in place only if the name `CourseCatalog` becomes a lie once services use it. A name like `SectionBrowser` matches both courses and services. The props grow; the interaction stays: one active item, click or keyboard to change it.
- Extend the item type:

```ts
type SectionItem = {
  title: string
  meta: string
  body: string[]
  image?: { src: string; alt: string }
  cta?: { label: string; to: string }
}
```

- Detail pane order: meta, title, image (when present), body, then the action. Image sits in the detail, full width of that pane, not as a tile beside every row. That keeps the list scannable on a phone, where the list already stacks above the detail.
- Call to action is per item, because a confined-space course and a COR audit should not share the same ask. Default target is `/contact`. Training items can point at the external training calendar when that is the real next step.
- Reshape existing copy into this type. Do not rewrite the substance in this task; task 7 owns the mining-and-industrial framing. Services today are nested groups (programs, audits, incidents, people). Flatten them into one list with `meta` carrying the group name ("Programs", "Audit", "Field support"), unless a page has so many items that the list becomes a scroll. If it does, keep a single group label as `meta` rather than bringing the accordion back.
- Hygiene loses the tab bar and becomes the same list. Equipment already matches; it only gains optional image and cta fields.
- `Accordion` and `Tabs` can be deleted once nothing imports them.

**Acceptance.**

- `/services`, `/services/hygiene`, `/training`, and `/training/equipment` all use the same component.
- Each page still has one `h1` from `PageHero`.
- The active section can show an image and one action.
- Changing section does not change the URL in this pass (deep links can be a later doc). The active item is still reachable by keyboard.
- Phone width: list first, detail second, no horizontal scroll.

**Blocked on.** Nothing. Section images can be chosen from `public/rewebsitekickoff` (classroom for training, sampling and plant floor for hygiene, mill and pit for safety services). The image field stays optional so a section can ship before its photo is picked.

**Out of this task.** A page per course, a booking calendar, and new service lines.

---

## 4. Gradient on the home header

**Intent.** A gradient on the homepage header / menu, so the bar is not a flat slab sitting on the hero.

**Current.** `Header` is `fixed`, `bg-ink/90`, `backdrop-blur-md`, with a hairline border. The home hero already has its own left-to-right dark wash in `src/pages/Home.tsx`. Those are two different layers. This task is the bar and the open menu, not a redo of the hero scrim.

**Plan.**

- After the palette lands, the header background becomes a short gradient using the blue token into transparent (or into the page white), still with a light blur so type stays readable over the hero photo.
- On the home page the gradient can be stronger, because it sits on a photograph. On inner pages it should settle to a solid white or solid blue by the time the visitor has scrolled, so body text never slides under a busy wash. A scroll listener that only toggles a class is enough. No animation library.
- The mobile menu panel uses the same gradient family as the bar, so opening the menu does not flash a different material.
- Active link and the "Talk to us" button keep the accent. The gradient does not replace the accent.
- `prefers-reduced-motion` does not apply to a static gradient. If we animate the scroll state, that transition stays under 200ms and turns off for reduced motion.

**Acceptance.**

- Home header reads as a gradient over the hero, and the logo and links stay readable.
- Inner pages stay readable at the top and after scroll.
- Mobile menu matches.
- No gradient on buttons, cards, or body sections. The request was the header.

**Depends on.** Task 1 tokens. Can be a small follow-up commit once the light header exists.

---

## 5. Chat bubble that texts them

**Intent.** Keep a "contact us / chat with us" bubble on the site. When someone uses it, Jason hears about it on his phone as a normal text, instead of as an email the way the current Wix bubble behaves. The visitor's own phone sends the message. The site does not.

A browser and a server we run can send HTTP. They cannot place a text on the phone network. That takes a carrier account, or a phone of theirs left online as a modem. We are not adding either. There is no database, no chat product, and no monthly fee for this task.

**Current.** This React app has no bubble. `/contact` is a form that only sets local React state. Nothing is delivered. Jason's mobile, already printed in the footer, is 250-540-3511 (`+12505403511`).

**Plan.** One client component, mounted once in `src/components/Layout.tsx`. The number lives in one constant in that file.

1. A fixed button, bottom right, above the phone home indicator, under the header so it does not cover **Talk to us**. Green fill, dark gray icon, same treatment as that button. It is on every page, including `/contact`, unless it actually covers the form's send button. Then hide it on that route only.
2. The button opens a small panel. One line: a person at Uplift Safety will read the message. Escape closes the panel. The button is a real control, keyboard-focusable, with `aria-expanded`.
3. On a phone, the panel's action is a real link, **Text Jason**, to `sms:+12505403511?&body=...`. The `?&body=` form fills the draft on both iPhone and Android. The draft names the page they were on, for example "Hi, I'm on the Uplift Safety projects page." They can edit it. They still have to press Send. The site cannot tell whether they did, so the panel never says the message was delivered.
4. On a desktop computer the same panel leads with the number, a copy control, and a `tel:` link. The text link stays, for a Mac that has Messages signed in. Other desktops have nothing to hand a text to, so the number has to be readable. The same fallback matters inside Instagram or Facebook's browser, which often blocks `sms:` links.
5. An iPhone texting an iPhone may arrive as iMessage. An Android text arrives as SMS. Either one lands in Messages on his number. He replies in that thread. Their number is already on the message, so the panel does not ask them to type it.
6. Marsha stays off this button until they ask. Adding her later is a second link in the same panel, not a new system.
7. The contact form stays a separate path. Wiring that form to email is its own later task.

**Acceptance.**

- The bubble is on every marketing page, reachable from the keyboard, and does not cover the header button or the project back arrow.
- On an iPhone, **Text Jason** opens Messages to +1 250-540-3511 with the draft, and nothing is sent until they tap Send.
- On an Android phone, the same link opens the text app the same way.
- On a desktop window, the panel shows the number and can copy it.
- No server route, no secret, no stored transcript.

**Blocked on.** Nothing. The number is the one already on the site. If they want a different line, change the constant.

**Out of this task.** A carrier texting account, a hosted chat widget, a database, a server endpoint, replies that appear back inside the bubble, and replacing the contact form.

---

## 6. SEO

**Intent.** Make the public site something a mine manager can find, for the work Uplift actually wants: mining and industrial safety, training, and programs in Western Canada. "SEO tricks" here means the normal technical work a marketing site owes, done on purpose. It does not mean hidden text, doorway pages, or a keyword list stuffed into the hero.

**Current.** One `<title>` in `index.html`. No meta description, canonical, Open Graph, sitemap, or structured data. Routes are drawn in the browser after JavaScript loads.

**Plan.**

1. **Prerender the routes at build time.** A client-only SPA is a weak marketing site. Add a prerender step so `/`, `/about`, `/services`, `/services/hygiene`, `/training`, `/training/equipment`, `/contact`, and `/projects` (plus each published project slug) exist as HTML in the Netlify output. Pick a Vite-compatible prerender or SSG plugin when we implement this, and keep React Router as the runtime. Confirm a built HTML file contains the `h1` without executing the app.
2. **Per-route head.** Title and description unique to the page, canonical URL on the real domain (not the Netlify subdomain once they have it), and an Open Graph image that uses their logo or a jobsite photo. A small `src/data/seo.ts` map keyed by path keeps this next to the copy.
3. **`sitemap.xml` and `robots.txt`.** Generated from the same route list so a new project slug is not forgotten. Point robots at the sitemap.
4. **Structured data.** One `ProfessionalService` (or `LocalBusiness`) block on the home page: name, Kamloops area, phones, area served (Western Canada), and the two principals. Project pages can use `Article` or simply stay as normal pages. No review stars they did not earn.
5. **On-page.** One `h1` per page, already true where `PageHero` is used. Content images get real `alt` text. Decorative hero washes can stay `alt=""`. Internal links already run from home lanes into services and training; project details should link onward the same way (task 2).
6. **Copy source.** Titles and descriptions use the mining and industrial language from task 7. Hygiene terms stay available on the hygiene page for people who search for them. They do not lead the home title.
7. **Performance checks that affect ranking.** Hero images get explicit width and a reasonable source size. Fonts stay self-hosted. After prerender, spot-check Lighthouse on home and one inner page for the SEO and accessibility categories.

**Acceptance.**

- View source on each public route shows a unique title, description, and the page `h1`.
- Sitemap lists every indexable URL and omits draft projects.
- Structured data validates in Google's rich results test.
- Sharing a link shows a title and image.
- No keyword block, no cloaking, no fake locations.

**Depends on.** Task 2 for project URLs, task 7 for the words in titles. The prerender setup can start as soon as the route list is agreed.

**Out of this task.** Paid search, a blog, Google Business Profile administration, and ongoing rank reporting.

---

## 7. Say the mining and industrial work first

**Intent.** The site should read as a practice that is strong in mining and industrial work. Competitor sites lead with airborne particulate and general air-quality language. Uplift still does industrial hygiene, including exposure work, because that is Marsha's practice. The framing moves. The service does not disappear.

**Current.** Home lane one is "Industrial hygiene" with the line "Exposure control, air quality, welding fume, ergonomics, hazardous materials." The hero is still "Elevate to Excellence." Service body copy already mentions mining, oil and gas, forest products, shutdowns, and COR. That proof is buried under the accordion.

**Plan.**

- Treat this as a copy edit inside the data those pages already render, after task 3 gives every section a title, meta, and body.
- Home, in order: who it is for (mine and industrial employers in Western Canada), what they do (programs, field safety, training, hygiene), then the three lanes. The hygiene lane leads with industrial and mine-site exposure control, hazardous materials, and a hygienist who works where the work is. Air sampling stays discoverable on `/services/hygiene`.
- About: mining and industrial field experience before the award lines. Names and credentials stay exact.
- Services: pull the mining, manufacturing, shutdown, and COR lines into the page intro and the first sections. Indoor air quality, mould, and general ventilation stay in the list with honest titles. They are not the opening sentence of the site.
- Training and equipment: unchanged in substance. Intros can name the workplaces (plants, mines, shutdowns) when that is true of the course.
- Home lead, written from the meeting note rather than waiting on a slogan from them: **Safety programs, training, and field expertise for mining and industrial work.** That sentence sits under a short headline, **Mining and industrial safety.** "Elevate to Excellence" comes off the home hero. The line names the work they want known for, and it does not open on air quality or particulate.
- Do not add claims, headcount, or project outcomes they have not said. If they later send their own sentence, it replaces this one. Until then this is the line we build with.

**Acceptance.**

- A first-time visitor on home and about can tell the practice is mining and industrial without opening hygiene.
- Hygiene content is still on `/services/hygiene`, intact.
- No new superlatives, no invented project results.
- Jason and Marsha can mark lines they hate without us having changed structure to do it.

**Blocked on.** Nothing. The home lead is the sentence above. They can still mark a line they hate. That does not hold the page.

---

## Open questions

No deadline. Any answer gets folded into task 7 or task 2.

1. **Other sites they like**, besides Minex. Useful as layout references, recorded here with one line on what they liked.
2. **The visitor they want, and the win.** The working picture from the email: a mine manager who sees the training he needs, sees a past job of similar scale, and starts a long engagement. If that is right, projects and training should be the two paths off the home page, and the contact ask should sound like a scoped engagement rather than a generic hello.

## Later docs

When one of these grows, split it out instead of extending this file forever.

- Projects content sheet: one row per job, fields matching the type above.
- SEO title and description table, one row per route.
- **`docs/sms-feature.md`** — SMS / chat bubble options (client `sms:` vs Twilio), phased code plan, open questions for Jason.
- Chat bubble notes, if they later want Marsha on the same button or a different number (see sms-feature.md).
