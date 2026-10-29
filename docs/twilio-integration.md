# Twilio SMS chat bubble — dev ticket

**Feature:** Chat bubble on the Uplift Safety site that sends a visitor's message as an SMS to Jason's phone via Twilio. Works on desktop and mobile. No email, no chat history, no database.

**Option:** B (Twilio outbound only) from `docs/sms-feature.md`.

**Stack:** Vite, React, TypeScript, Tailwind v4, React Router, Netlify Functions.

**Related docs**

- `docs/sms-feature.md` — options comparison (A/B/C/D), client-facing explanation
- `docs/first-tasks.md` — task 5 (zero-server `sms:` bubble)

**Status:** `.env` is populated and gitignored. Twilio trial account is provisioned with a trial `FROM` number and at least one Verified Caller ID.

---

## Phases

| Phase | Goal | Sections |
| --- | --- | --- |
| 0 — Setup and credentials | Twilio account, verified test number, local tooling | §5 |
| 1 — Backend function | Netlify Function that validates and calls Twilio | §3, §8 |
| 2 — Frontend API helper | Typed client with error kinds | §4.1, §8.4–8.5 |
| 3 — Chat bubble component | Floating bubble, accessible, per-error copy | §4.2–4.4 |
| 4 — Local testing | End-to-end send to a real phone | §5, §8.6 |
| 5 — Production deploy and cutover | Live on Netlify, sending to Jason | §5, §9 |

---

## 1. The flow in plain English

1. A visitor clicks the bubble, types a message, and hits Send.
2. The browser sends that message to a small backend function on Netlify. This is a Netlify Function: a single file of server code that runs on demand. There is no server to maintain.
3. The function checks the message (not empty, not too long, not a bot) and calls Twilio with Jason's number and the message text.
4. Twilio sends it as a normal text to Jason's phone.
5. The function tells the browser "ok", and the bubble shows "Thanks, someone at Uplift Safety will get this."

The backend exists because the Twilio secret keys cannot live in the website code. Anyone could view the page source, steal them, and send texts on your account. The function keeps the keys private.

```
Browser (React bubble)  →  Netlify Function  →  Twilio  →  Jason's phone
   no secrets            holds secret keys     sends SMS
```

**Third-party services**

| Service | Role |
| --- | --- |
| Twilio | Sends the SMS. We rent a business phone number from Twilio; it is the "from" line on texts the site triggers. |
| Netlify | Already hosts the site. Runs the serverless function and stores the secret environment variables. |
| Our React site | The bubble UI. Holds no secrets. |

---

## 2. Why serverless, and why Netlify

React alone cannot do this. React runs in the browser and has nowhere safe to keep Twilio keys, so a serverless function (or API route) is always required. It is the only extra backend piece.

| Option | Fits Uplift? | Notes |
| --- | --- | --- |
| **Netlify Functions** (this plan) | Best fit | Site is Vite + React on Netlify. Add one file in `netlify/functions/`. No migration. |
| Vercel Functions (`/api` folder) | Fine | Only worth it if hosting moves to Vercel. |
| Next.js API routes / Route Handlers | Only if adopting Next | Works well, but the site is a Vite SPA. Moving to Next is a rewrite. |

**Is Next.js worth it for this?** Not for SMS alone. One real upside: `first-tasks.md` task 6 (SEO) calls for prerendering routes, which Next.js does natively while Vite needs a prerender plugin. If we move to Next for SEO anyway, put the Twilio logic in `app/api/sms-inquiry/route.ts` and the SMS feature comes along. Only the wrapper changes:

```ts
// app/api/sms-inquiry/route.ts  (only if the site ever moves to Next.js)
import twilio from 'twilio'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message, page, phone, website } = await req.json()
  if (website) return NextResponse.json({ ok: true }) // honeypot
  // ...same validation as the Netlify version...
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  await client.messages.create({
    to: process.env.SMS_NOTIFY_TO!,
    from: process.env.TWILIO_FROM_NUMBER!,
    body: `[Uplift site] ${page}\n${message}`,
  })
  return NextResponse.json({ ok: true })
}
```

The frontend would then call `/api/sms-inquiry` instead of `/.netlify/functions/sms-inquiry`.

**Decision:** stay on Vite and Netlify and use a Netlify Function. Revisit Next.js only if SEO prerendering justifies the move.

---

## 3. Backend: `netlify/functions/sms-inquiry.ts`

The backend is only this one serverless function.

### 3.1 Install dependencies

```bash
npm i twilio
npm i -D @netlify/functions
```

### 3.2 Environment variables

Set in the Netlify dashboard (Site settings → Environment variables) and in a local `.env` file for dev. Never commit them. Make sure `.env` is in `.gitignore`.

```
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxx
TWILIO_FROM_NUMBER=+1778xxxxxxx     # the number rented from Twilio
SMS_NOTIFY_TO=+12505403511          # Jason (use your own phone while testing)
```

`SMS_NOTIFY_TO` being an env var lets staging point at a developer phone and production at Jason without a code change.

### 3.3 The function

```ts
import type { Handler } from '@netlify/functions'
import twilio from 'twilio'

const MAX_LEN = 480
const TIMEOUT_MS = 8000

const json = (statusCode: number, body: object) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

function requireEnv(): { sid: string; token: string; from: string; to: string } | null {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_FROM_NUMBER
  const to = process.env.SMS_NOTIFY_TO
  if (!sid || !token || !from || !to) {
    console.error('[sms-inquiry] missing env vars', {
      sid: !!sid, token: !!token, from: !!from, to: !!to,
    })
    return null
  }
  return { sid, token, from, to }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'method' })

  let data: { message?: string; page?: string; phone?: string; website?: string }
  try {
    data = JSON.parse(event.body ?? '{}')
  } catch {
    return json(400, { ok: false, error: 'bad_json' })
  }

  // Honeypot: real users never fill this hidden field, bots do.
  if (data.website) return json(200, { ok: true })

  const message = (data.message ?? '').replace(/[\u0000-\u001f]/g, ' ').trim()
  const page = (data.page ?? '/').slice(0, 100)
  const phone = (data.phone ?? '').replace(/[^\d+\-() ]/g, '').slice(0, 20)

  if (!message) return json(400, { ok: false, error: 'empty_message' })
  if (message.length > MAX_LEN) return json(400, { ok: false, error: 'too_long' })

  const env = requireEnv()
  if (!env) return json(500, { ok: false, error: 'config' })

  const body = [
    `[Uplift site] ${page}`,
    message,
    phone ? `Callback: ${phone}` : 'No callback number given',
  ].join('\n')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const client = twilio(env.sid, env.token, {
      timeout: TIMEOUT_MS,
    })
    const result = await client.messages.create({
      to: env.to,
      from: env.from,
      body,
    })
    console.log('[sms-inquiry] sent', { sid: result.sid, page, phone: !!phone })
    return json(200, { ok: true })
  } catch (err: any) {
    // Twilio error codes: 21606 = trial can't send to unverified,
    // 21211 = invalid number, 21614 = not SMS-capable, 20429 = rate limit.
    console.error('[sms-inquiry] Twilio failed', {
      code: err?.code,
      status: err?.status,
      message: err?.message,
      moreInfo: err?.moreInfo,
    })
    if (err?.code === 21606) {
      return json(403, { ok: false, error: 'unverified_recipient' })
    }
    return json(502, { ok: false, error: 'twilio_failed' })
  } finally {
    clearTimeout(timer)
  }
}
```

### 3.4 What the function does

- Rejects anything that is not a POST.
- Throws out bots using the honeypot field (returns a fake success).
- Strips control characters, trims, and length-limits the message (480 chars), page (100), and phone (20, digits and phone punctuation only).
- Checks all four env vars are present before calling Twilio; logs which are missing without printing values.
- Calls Twilio with an 8s timeout so a hung request can't burn the function.
- Logs the Twilio `MessageSid` on success, and the Twilio error `code`, `status`, and `moreInfo` on failure.
- Maps Twilio `21606` (trial sending to an unverified number) to a `403 unverified_recipient` so the frontend can show a setup hint during testing instead of a generic error.
- Never returns the real Twilio error to the browser; only a short error code string the frontend can switch on.

The function URL is automatically `/.netlify/functions/sms-inquiry`.

### 3.4 What the function does

- Rejects anything that is not a POST.
- Throws out bots using the honeypot field (returns a fake success).
- Strips control characters, trims, and length-limits the message (480 chars), page (100), and phone (20, digits and phone punctuation only).
- Builds the text and hands it to Twilio. If Twilio fails, the real error goes only to the server log; the visitor gets a generic failure.

The function URL is automatically `/.netlify/functions/sms-inquiry`.

### 3.5 Example text Jason receives

```
[Uplift site] /training
Need a quote for confined space training for 12 people.
Callback: 778-555-0100
```

---

## 4. Frontend

### 4.1 API call: `src/lib/api/sms-inquiry.ts`

```ts
const ENDPOINT = '/.netlify/functions/sms-inquiry'
const TIMEOUT_MS = 10000

export type SmsInquiryError =
  | 'empty_message'
  | 'too_long'
  | 'unverified_recipient'
  | 'config'
  | 'twilio_failed'
  | 'network'
  | 'timeout'
  | 'unknown'

export async function postSmsInquiry(input: {
  message: string
  page: string
  phone?: string
  website?: string
}): Promise<{ ok: true } | { ok: false; error: SmsInquiryError }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: controller.signal,
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data?.ok) return { ok: true }
    return { ok: false, error: data?.error ?? 'unknown' }
  } catch (err: any) {
    if (err?.name === 'AbortError') return { ok: false, error: 'timeout' }
    return { ok: false, error: 'network' }
  } finally {
    clearTimeout(timer)
  }
}
```

### 4.2 The bubble: `src/components/ChatBubble.tsx`

```tsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { postSmsInquiry } from '../lib/api/sms-inquiry'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ChatBubble() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending' || !message.trim()) return
    setStatus('sending')
    try {
      await postSmsInquiry({ message, page: pathname, phone, website: honeypot })
      setStatus('sent')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-40">
      {open && (
        <form
          onSubmit={onSubmit}
          className="mb-3 w-80 rounded bg-paper p-4 text-ink shadow-xl"
        >
          {status === 'sent' ? (
            <p>Thanks. Someone at Uplift Safety will get this and reach out.</p>
          ) : (
            <>
              <p className="mb-2 text-sm">
                A person at Uplift Safety will read your message.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={480}
                required
                rows={4}
                className="w-full border p-2"
                placeholder="How can we help?"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="mt-2 w-full border p-2"
                placeholder="Your phone (optional, so we can call back)"
              />
              {/* Honeypot: hidden from humans */}
              <input
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px]"
              />
              <p className="mt-2 text-xs opacity-70">
                By sending, you agree we may text you back about this inquiry.
              </p>
              <button
                disabled={status === 'sending'}
                className="mt-3 w-full bg-accent px-3 py-2 font-bold text-ink"
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              {status === 'error' && (
                <p role="alert" className="mt-2 text-sm">
                  Couldn't send. Please call 250-540-3511.
                </p>
              )}
            </>
          )}
        </form>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Message Uplift Safety"
        className="ml-auto block h-14 w-14 rounded-full bg-accent text-ink shadow-lg"
      >
        💬
      </button>
    </div>
  )
}
```

The emoji is a placeholder; swap in an icon from the project's icon library (the design skill discourages emoji in shipped UI).

### 4.3 Mount once: `src/components/Layout.tsx`

```tsx
import ChatBubble from './ChatBubble'
// ...
<Footer />
<ChatBubble />
```

Placement notes carried over from task 5: bottom-right, above the phone home indicator, under the header so it does not cover **Talk to us**, not covering the project back arrow. Hide it on `/contact` only if it actually covers the form's send button (check `pathname` in `ChatBubble`).

### 4.4 Optional mobile bonus (Option A hybrid)

On phones, show a second button beside the form, **Text Jason directly**:

```tsx
<a href={`sms:+12505403511?&body=${encodeURIComponent("Hi, I'm on the Uplift Safety site.")}`}>
  Text Jason directly
</a>
```

That text comes from the visitor's own number, so Jason can reply in one tap. Use `?&body=` for consistent behavior on iOS and Android. In-app browsers (Instagram, Facebook) often block `sms:`, so the form stays the primary path.

---

## 5. Twilio and Netlify setup

1. Create a Twilio account. On the trial plan, claim the **trial number** shown in the "Send an SMS" card (it becomes `TWILIO_FROM_NUMBER` for testing). Upgrade later to swap it for a Canadian number.
2. **Verify caller IDs** for any number the trial account will text: **Phone Numbers → Manage → Verified Caller IDs → Add a new caller ID**, enter the number, confirm the SMS code Twilio sends it. Do this for your own cell first, then Jason's. Trial accounts cannot send to unverified numbers.
3. Reveal and copy the **Account SID** and **Auth Token** from the Twilio home page (eye icon next to Auth Token).
4. Install the Netlify CLI and link the site so `netlify dev` can run the function locally:
   ```bash
   npm i -g netlify-cli
   netlify login
   netlify link        # in the project root, pick the Uplift site
   ```
5. Create a local `.env` at the project root with the four vars. **Confirm `.env` is in `.gitignore`** before adding anything:
   ```bash
   grep -q '^\.env$' .gitignore || echo '.env' >> .gitignore
   ```
6. Add the same four vars in the Netlify dashboard: **Site settings → Environment variables**. Redeploy after adding them.
7. Test locally with `netlify dev`. It runs the Vite site and the function together and reads the local `.env`.
8. Point `SMS_NOTIFY_TO` at your own phone until Jason signs off, then switch it to `+12505403511`.
9. Add `netlify.toml` redirects only if you want a cleaner URL (see 8.6 step 5). The default `/.netlify/functions/...` path works without them.

---

## 6. Behavior, mobile and desktop

| Step | Visitor on phone | Visitor on laptop |
| --- | --- | --- |
| 1 | Tap the bubble | Tap the bubble |
| 2 | Type message (optional phone) | Same |
| 3 | Submit | Same |
| 4 | Site → Netlify → Twilio → Jason's phone | Identical; no texting app needed |
| 5 | Confirmation in panel | Same |

---

## 7. Security and abuse

- Honeypot field, hidden from users.
- Server-side length limit and control-character stripping.
- Twilio errors are logged server-side only, never returned to the client.
- Secrets live only in Netlify env vars.
- Rate limiting: simple in-memory limits do not work well on serverless, since each call can run in a fresh instance. If real spam shows up, add Cloudflare Turnstile or an external store (e.g. Upstash) for limits.

---

## 8. Error handling and debugging

### 8.1 Backend error categories and responses

| Cause | Twilio error code (typical) | HTTP we return | What the visitor sees |
| --- | --- | --- | --- |
| Bad JSON / not POST | — | 400 / 405 | Generic error |
| Empty or oversized message | — | 400 | "Please enter a message." |
| Honeypot filled | — | 200 (fake ok) | Nothing (bot) |
| Missing env var | — | 500 | Generic error + server log |
| Unverified destination (trial) | 21408 | 502 | Generic error + server log |
| Invalid / unreachable "to" number | 21612, 21211 | 502 | Generic error + server log |
| Wrong auth token / SID | 20003 | 500 | Generic error + server log |
| Twilio rate limit / outage | 20429, 5xx | 503 | "Try again in a moment." |

### 8.2 Structured server logging

Replace the bare `console.error` with a structured line so Netlify function logs are scannable:

```ts
function logError(stage: string, err: unknown) {
  const e = err as { code?: number; message?: string; moreInfo?: string }
  console.error(
    JSON.stringify({
      stage,
      code: e?.code,
      message: e?.message,
      moreInfo: e?.moreInfo,
      at: new Date().toISOString(),
    }),
  )
}
```

Call it in the catch block: `logError('twilio_create', err)`. Netlify keeps function logs in **Functions → Logs**; filter by your function name.

### 8.3 Health check endpoint (optional but cheap)

Add a second tiny function, `netlify/functions/sms-health.ts`, that returns `{ ok: true, hasCreds: !!SID && !!TOKEN && !!FROM && !!TO }` without sending a text. Hit it once after deploy to confirm env vars landed. Never expose the values, only the boolean.

### 8.4 Frontend error handling (upgrade from current)

The current `ChatBubble` lumps every failure into one `error` state. Improve it:

```tsx
type Status = 'idle' | 'sending' | 'sent' | 'error'
type ErrorKind = 'network' | 'validation' | 'server' | null

const [errorKind, setErrorKind] = useState<ErrorKind>(null)

async function onSubmit(e: React.FormEvent) {
  e.preventDefault()
  if (status === 'sending' || !message.trim()) return
  setStatus('sending')
  setErrorKind(null)
  try {
    await postSmsInquiry({ message, page: pathname, phone, website: honeypot })
    setStatus('sent')
    setMessage('')
  } catch (err) {
    setStatus('error')
    // postSmsInquiry can attach a kind based on res.status; see 8.5
    setErrorKind((err as { kind?: ErrorKind }).kind ?? 'server')
  }
}
```

Render different copy per kind:

- `network` → "Couldn't reach the server. Check your connection and try again." + a **Retry** button.
- `validation` → "Please enter a short message (under 480 characters)."
- `server` → "Couldn't send right now. Please call 250-540-3511."

### 8.5 API helper with status-aware errors

```ts
export async function postSmsInquiry(input: {
  message: string
  page: string
  phone?: string
  website?: string
}) {
  let res: Response
  try {
    res = await fetch('/.netlify/functions/sms-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  } catch {
    const e = new Error('network') as Error & { kind: 'network' }
    e.kind = 'network'
    throw e
  }
  if (res.status === 400) {
    const e = new Error('validation') as Error & { kind: 'validation' }
    e.kind = 'validation'
    throw e
  }
  if (!res.ok) {
    const e = new Error('server') as Error & { kind: 'server' }
    e.kind = 'server'
    throw e
  }
}
```

### 8.6 Local debugging checklist

When a send fails locally with `netlify dev`:

1. **Function not found (404 on `/.netlify/functions/sms-inquiry`):** run `netlify dev` from the project root, not a subfolder. Confirm `netlify/functions/sms-inquiry.ts` exists and the CLI linked the site (`netlify link`).
2. **Twilio 21408:** destination number isn't verified. Add it under **Phone Numbers → Verified Caller IDs** and confirm the SMS code.
3. **Twilio 20003:** auth token wrong. Reveal it on the Twilio home page (eye icon), copy the whole string, restart `netlify dev`.
4. **500 with "missing creds":** `.env` not loaded. `netlify dev` reads `.env` automatically, but confirm the file is at the project root and has no trailing spaces on the keys.
5. **CORS error in browser console:** add to `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/api/sms-inquiry"
     to = "/.netlify/functions/sms-inquiry"
     status = 200
   ```
   and call `/api/sms-inquiry` instead. Usually not needed on Netlify, but cleans the URL.
6. **No text arrives but function returns 200:** check **Twilio Console → Messaging → Logs**. Trial messages get a "Sent from a Twilio trial account" prefix and only deliver to verified numbers.

### 8.7 Frontend devtools

- **Network tab:** filter by `sms-inquiry`. Look at the request body and the response status.
- **Console:** the function never returns Twilio's error to the browser on purpose, so the console only shows what `postSmsInquiry` threw. For deeper detail during dev, temporarily log `res.status` and `await res.text()` in the helper, then remove before shipping.

### 8.8 Production monitoring

- **Netlify function logs:** Functions → your function → Logs. Keep the structured JSON lines from 8.2 so you can grep.
- **Twilio logs:** Console → Messaging → Logs shows every send, delivery status, and error code. This is the source of truth for "did it actually send."
- **Optional alert:** if you want to know when sends fail in prod without checking logs, route the function's `logError` output to Netlify's log drain to a service like Logflare, or send yourself an email via Resend on failure (a second small function). Not needed on day one.

### 8.9 Retry and idempotency

- Frontend **Retry** button on `network` errors only. Don't retry `validation` or `server` automatically.
- The function is naturally idempotent for the visitor (each submit = one Twilio call). No need for an idempotency key unless we add payment or storage later.

---

## 9. Things to know

- **Replies:** Jason sees the text from the Twilio number. He can only call or text the visitor back if they typed a phone number. Consider making the phone field prominent or required.
- **Compliance (CASL):** keep the one-line consent under the form. This is requested contact, not marketing. No blasts without opt-in.
- **Cost:** about $1 to $2 a month for the number plus a few cents per text. Netlify's free tier is usually enough for the function.
- **No database:** nothing is stored, so there is no chat history. Twilio keeps its own message logs.
- **Not included:** replies inside the site (Option C) and stored chat history.

---

## 10. Build checklist

| Step | Work |
| --- | --- |
| 1 | Create Twilio account, claim trial number |
| 2 | Verify your cell + Jason's cell as Verified Caller IDs |
| 3 | Copy Account SID + Auth Token |
| 4 | Install Netlify CLI, `netlify login`, `netlify link` |
| 5 | Confirm `.env` is in `.gitignore`, then create local `.env` with 4 vars |
| 6 | `npm i twilio` and `npm i -D @netlify/functions` |
| 7 | Write `netlify/functions/sms-inquiry.ts` (with structured logging from §8.2) |
| 8 | Write `src/lib/api/sms-inquiry.ts` (with status-aware errors from §8.5) |
| 9 | Write `src/components/ChatBubble.tsx` (with error kinds from §8.4) |
| 10 | Mount `ChatBubble` in `src/components/Layout.tsx` |
| 11 | Add the 4 env vars in Netlify dashboard, redeploy |
| 12 | Test with `netlify dev` against your own phone (use §8.6 checklist on failure) |
| 13 | QA: iPhone Safari, Android Chrome, desktop Safari/Chrome, one in-app browser; keyboard (Tab, Escape); bubble does not cover header button or back arrow |
| 14 | Switch `SMS_NOTIFY_TO` to Jason after sign-off; upgrade Twilio from trial; swap `TWILIO_FROM_NUMBER` to a Canadian number |

**Acceptance**

- Desktop submit delivers an SMS to `SMS_NOTIFY_TO` within about 30 seconds.
- Honeypot-filled, empty, or oversized payloads are rejected without sending an SMS.
- Twilio failure shows the visitor a generic error with the phone number to call.
- The bubble is reachable by keyboard, has `aria-expanded`, and Escape closes it.
- No secrets in the client bundle.

---

## TL;DR

- **Frontend:** floating `ChatBubble.tsx` with a small form (message, optional phone, hidden honeypot) that POSTs JSON to `/.netlify/functions/sms-inquiry`, mounted once in `Layout.tsx`.
- **Backend:** one Netlify Function, `netlify/functions/sms-inquiry.ts`, validates input and calls Twilio's `messages.create()` to Jason's number. Keys live in Netlify env vars.
- **Result:** visitor types, Jason gets a text, same on desktop and mobile.
- **Extras:** one new dependency (`twilio`), a Twilio account and number, four env vars.
- **Not included:** in-site replies (Option C) and stored chat history.
