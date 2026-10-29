export type SmsErrorKind = 'network' | 'validation' | 'server'

export class SmsInquiryError extends Error {
  kind: SmsErrorKind
  status?: number
  constructor(kind: SmsErrorKind, status?: number) {
    super(kind)
    this.name = 'SmsInquiryError'
    this.kind = kind
    this.status = status
  }
}

const isDev = import.meta.env.DEV

export async function postSmsInquiry(input: {
  message: string
  page: string
  phone?: string
  website?: string
}): Promise<{ mock?: boolean }> {
  const payload = {
    message: input.message,
    page: input.page,
    phone: input.phone,
    website: input.website,
  }

  if (isDev) {
    console.groupCollapsed('%c[SMS] POST /.netlify/functions/sms-inquiry', 'color:#175873;font-weight:bold')
    console.log('payload', payload)
    console.groupEnd()
  }

  let res: Response
  try {
    res = await fetch('/.netlify/functions/sms-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    if (isDev) console.error('[SMS] network failure', err)
    throw new SmsInquiryError('network')
  }

  if (isDev) {
    console.log('%c[SMS] response', 'color:#175873;font-weight:bold', res.status, res.statusText)
  }

  if (res.status === 400) {
    let body: { error?: string } = {}
    try { body = await res.json() } catch { /* ignore */ }
    if (isDev) console.warn('[SMS] validation error', body)
    throw new SmsInquiryError('validation', 400)
  }
  if (!res.ok) {
    let body: { error?: string; mock?: boolean } = {}
    try { body = await res.json() } catch { /* ignore */ }
    if (isDev) console.error('[SMS] server error', res.status, body)
    throw new SmsInquiryError('server', res.status)
  }

  let data: { ok?: boolean; mock?: boolean } = {}
  try { data = await res.json() } catch { /* ignore */ }
  if (isDev) console.info('%c[SMS] sent ok', 'color:#1f7a1f;font-weight:bold', data)
  return { mock: data.mock }
}
