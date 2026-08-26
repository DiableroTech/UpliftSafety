# Uplift Safety — Demo v1

Client demo. Two days. Not a production rebuild.

Show them their business in a site that does not look like Wix: dark, sharp, lime as an accent, real motion, a real footer. Same company. New skin.

---

## Goal

A clickable React site they can open on a laptop and say “yes, that is us, but better.”

Primary job of the demo: **look hired.** Secondary: prove the sitemap still works (home, about, services, training, contact).

---

## What this is not

- Not a CMS, not their domain, not a form that emails anyone
- Not a Wix chat bubble
- Not Google Maps with 80 pins
- Not a training calendar
- Not a page for every service and every course
- Not their exact photos (we do not have the files). Industrial stock + named portrait frames. Swap later.
- Not Taste Skill / a long brief. `BRIEF.md` can wait.

---

## Pages (five)

Their Services and Training tabs are the same layout repeated. Demo does **one** of each, with lanes inside.

| Route | What ships |
|-------|------------|
| `/` | The sell. Hero, 3 lanes, one featured offer (asbestos), region strip, CTA |
| `/about` | Story, Marsha + Jason, where they work |
| `/services` | Consulting: hygiene + safety programs. Not two clone pages. |
| `/training` | Classroom, equipment, online. Not three clone pages. |
| `/contact` | People, phones, emails, UI-only form |

Shared on every page: sticky header, footer. No “Let’s Chat!” FAB.

---

## Kill / keep

**Kill:** checkerboard 50/50 tiles, equal-weight service grids, slogan-only hero, lime on every button, pages that just stop.

**Keep:** the mark (twin peaks), the lime, charcoal, Kamloops / Western Canada, real names and credentials, WorkSafeBC / COR / asbestos as proof, the actual service map.

**Lime rule:** logo, one primary button, active nav, thin rules. Everything else charcoal / off-white / zinc.

---

## Design read

Industrial consultancy, not a SaaS landing page.

Dark surfaces, lime used like high-vis tape, tight display type, workhorse body, photos full-bleed or overlapping — never boxed into a checkerboard. Motion is considered: sticky header, scroll fade/rise, slow image scale, hover. Not a loading movie.

Vibe words: **sharp, trusted, regional, high-vis, quiet boast.**

---

## Content (from their live site, shortened)

- **Who:** Occupational health and safety partnership. Kamloops, BC. Western Canada.
- **People:** Marsha Bell, MSc, CIH. Jason Zaffino, MBA, CRSP. Both principal consultants.
- **Contact:** jason.zaffino@upliftsafety.ca · 250-540-3511 · marsha.bell@upliftsafety.ca · 778-257-1863
- **Lanes:** industrial hygiene · safety programs / audits · training (leadership, confined space, equipment, online)
- **Featured:** asbestos certification (WorkSafeBC levels 1–3)
- **Hero line (replace their slogan):** something that says what they do, not “Elevate to Excellence”

Copy gets cut. Credentials and cities stay real. No fake metrics.

---

## Build order

**Day 1 — shell + home**
1. Tokens, type, header, footer, router
2. Home end-to-end (the page they will screenshot)
3. Contact (fast; they will try it)

**Day 2 — inner pages + polish**
4. About (people are the proof)
5. Services + Training (same page system, different content)
6. Motion pass, desktop + a phone-width check

If time dies, cut Training density before cutting Home or About.

---

## Done when

- Five routes, none empty
- Home does not use a checkerboard
- Footer exists and has contact + cities
- One lime primary CTA, not six
- `npm run build` passes
- Looks like a pitch on a 13" laptop

Ship it. Then argue about calendars, maps, and a real CMS.
