import type { Handler } from '@netlify/functions'

export const handler: Handler = async () => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ok: true,
    mock: process.env.SMS_MOCK === 'true',
    hasCreds:
      !!process.env.TWILIO_ACCOUNT_SID &&
      !!process.env.TWILIO_AUTH_TOKEN &&
      !!process.env.TWILIO_FROM_NUMBER &&
      !!process.env.SMS_NOTIFY_TO,
  }),
})
