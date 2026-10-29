import type { Handler } from '@netlify/functions'
import twilio from 'twilio'

const MAX_LEN = 480

const json = (statusCode: number, body: object) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

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

function isMock() {
  return process.env.SMS_MOCK === 'true'
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' })

  let data: { message?: string; page?: string; phone?: string; website?: string }
  try {
    data = JSON.parse(event.body ?? '{}')
  } catch {
    return json(400, { ok: false, error: 'bad_json' })
  }

  // Honeypot: real users never fill this hidden field, bots do.
  if (data.website) return json(200, { ok: true })

  // eslint-disable-next-line no-control-regex
  const message = (data.message ?? '').replace(/[\u0000-\u001f]/gu, ' ').trim()
  const page = (data.page ?? '/').slice(0, 100)
  const phone = (data.phone ?? '').replace(/[^\d+\-() ]/g, '').slice(0, 20)

  if (!message || message.length > MAX_LEN) {
    return json(400, { ok: false, error: 'invalid_message' })
  }

  const notifyTo = process.env.SMS_NOTIFY_TO
  const fromNumber = process.env.TWILIO_FROM_NUMBER

  if (!isMock() && (!notifyTo || !fromNumber)) {
    logError('missing_env', new Error('SMS_NOTIFY_TO or TWILIO_FROM_NUMBER missing'))
    return json(500, { ok: false, error: 'server' })
  }

  const body = [
    `[Uplift site] ${page}`,
    message,
    phone ? `Callback: ${phone}` : 'No callback number given',
  ].join('\n')

  if (isMock()) {
    console.log(
      JSON.stringify({
        stage: 'mock_send',
        mock: true,
        to: notifyTo ?? '(unset)',
        from: fromNumber ?? '(unset)',
        body,
        at: new Date().toISOString(),
      }),
    )
    return json(200, { ok: true, mock: true })
  }

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !notifyTo || !fromNumber) {
    logError('missing_env', new Error('TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN missing'))
    return json(500, { ok: false, error: 'server' })
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )
    await client.messages.create({
      to: notifyTo,
      from: fromNumber,
      body,
    })
    return json(200, { ok: true })
  } catch (err) {
    logError('twilio_create', err)
    return json(502, { ok: false, error: 'send_failed' })
  }
}
