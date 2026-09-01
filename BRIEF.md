# Uplift Safety — Site Brief

## 1. One-liner

Occupational health and safety partnership in Kamloops. This site is a pitch demo: their business, their names, a sharper skin than Wix.

## 2. Page kind

- [x] Other: multi-page consultancy site (home, about, services, training, contact)

**Primary job:** look hired. A laptop demo they can click and recognize as themselves.

**Secondary job:** prove the sitemap still works.

## 3. Audience

1. Safety managers / ops leaders at industrial sites in Western Canada (the aesthetic picker)
2. Marsha and Jason, reviewing a redesign of their own site
3. Procurement / COR / contractor prequal people who need credentials, not vibe

After 10 seconds: this is a serious regional consultancy, not a template.

Before they leave: talk to Jason or Marsha (email, phone, or the form).

## 4. Positioning

**What the product claims to be:** occupational health, hygiene, safety programs, and training.

**How you want it to be read:** sharp, trusted, regional, high-vis, quiet boast.

**Boast level:** credentials and cities only. No fake metrics.

**What this is *not*:** a SaaS platform, a Wix checkerboard, a lime-everywhere construction meme.

## 5. Vibe

**Keep:** sharp, trusted, regional, high-vis, quiet boast, industrial.

**Kill:** playful, glassy, neon, SaaS-template, checkerboard, equal photo cards, Inter, purple.

Tone: their copy. Close third. Cut, don't invent.

## 6. References

1. URL: https://www.upliftsafety.ca/
   Why: source of truth for copy, people, services, phones.
2. Pattern: industrial consultancy, not a product landing page.

Sites / patterns you actively dislike: Wix 50/50 tiles, three equal feature cards, slogan-only hero with no job description.

## 7. Design constraints

**Color:** brand lime `#c8e000` on charcoal `#0b0b0b`. Dark only. Lime as tape, not paint.

**Type:** Archivo display, Source Sans 3 body. Self-hosted.

**Motion:** considered. Page crossfade ~400ms. Slow hero scale. Accordion/tabs already. Not a loading movie.

**Density:** packed enough for a services firm, with air around the hero.

**Must never ship:** generic purple gradients, three equal feature cards, Inter-as-identity, lorem, fake metrics, stock “team collaborating.”

**Extra nos:** em-dashes in UI, eyebrow on every section, rewriting their names or credentials.

## 8. Site map

| Route | v1 |
|-------|----|
| `/` Home | yes |
| `/about` | yes |
| `/services` Safety | yes |
| `/services/hygiene` | yes |
| `/training` | yes |
| `/training/equipment` | yes |
| `/contact` | yes |

## 9. Product

**Name:** Uplift Safety

**One-line:** Occupational health and safety partnership. Kamloops, BC. Western Canada.

**Who it is for:** employers who need programs, hygiene, audits, and training that will stand up to a regulator.

**The problem it solves:** they do not have the time or the CIH/CRSP on staff.

**How it works:** hygiene → programs/audits → training. Asbestos certification is the featured offer.

**What a visitor should try:** click the real sitemap. Form is UI-only.

**Out of scope:** CMS, maps, chat, calendar, real form mail, online-training page.

## 10. Copy / voice

Use their lines. Hero: “Elevate to Excellence.” People bios stay theirs. Cut length, do not punch up.

## 11. Proof

- Marsha Bell, MSc, CIH. Canada’s Top Women in Safety, 2023.
- Jason Zaffino, MBA, CRSP. Safety innovation award (lockout), 2021. Top safety leaders under 35, 2023.
- WorkSafeBC asbestos levels 1–3. COR / OSSE. Ives / PTI equipment.

## 12. Contact & links

**Primary CTA:** Talk to us → `/contact`

| Handle | URL | Show |
|--------|-----|------|
| Jason | jason.zaffino@upliftsafety.ca · 250-540-3511 | yes |
| Marsha | marsha.bell@upliftsafety.ca · 778-257-1863 | yes |
| Website | https://www.upliftsafety.ca/ | no (this is the demo) |

## 13. Assets on hand

- [x] Wordmark (twin peaks SVG)
- [x] Color values (lime / charcoal)
- [x] Portraits: `public/123.avif` Marsha, `public/1234.avif` Jason
- [ ] Their site photography (using Unsplash jobsite until they send files)

## 14. Practical

**Stack:** Vite + React + TypeScript + Tailwind v4.

**v1 done:** five-plus routes, no checkerboard, one lime primary CTA, looks like a pitch on a 13" laptop.

## 15. Design read

Reading this as: redesign of an industrial OHS consultancy site for Western Canada safety managers, with a high-vis / trusted / sharp language, leaning toward native CSS + Tailwind (not a product design system).

**Mode:** Redesign, preserve. Keep lime, logo, Archivo, dark theme, routes, their copy.

**Dials:** `DESIGN_VARIANCE: 5` · `MOTION_INTENSITY: 4` · `VISUAL_DENSITY: 4`
