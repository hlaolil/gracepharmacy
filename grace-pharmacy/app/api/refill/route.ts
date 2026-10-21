import { NextRequest, NextResponse } from 'next/server'
import { site, primaryPhone } from '@/lib/site'

const NAME_RE = /^[A-Za-z\s]{2,80}$/
const RX_RE = /^\d{3,12}$/
const PHONE_RE = /^\(\+266\) \d{8}$/

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, prescription, phone, notes } = (body ?? {}) as Record<string, unknown>

  const errors: Record<string, string> = {}

  if (typeof name !== 'string' || !NAME_RE.test(name.trim())) {
    errors.name = 'Enter a valid full name (letters only).'
  }
  if (typeof prescription !== 'string' || !RX_RE.test(prescription.trim())) {
    errors.prescription = 'Prescription number should be 3-12 digits.'
  }
  if (typeof phone !== 'string' || !PHONE_RE.test(phone.trim())) {
    errors.phone = 'Use the format (+266) 58123456.'
  }
  if (typeof notes === 'string' && notes.length > 500) {
    errors.notes = 'Notes must be under 500 characters.'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  const request = {
    name: (name as string).trim(),
    prescription: (prescription as string).trim(),
    phone: (phone as string).trim(),
    notes: typeof notes === 'string' ? notes.trim() : '',
    receivedAt: new Date().toISOString(),
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Without an email provider configured there is nobody to tell about the request,
    // so in production say so rather than pretend it went through.
    if (process.env.NODE_ENV === 'production') {
      console.error('[refill request] RESEND_API_KEY is not set; request not delivered', request)
      return NextResponse.json(
        { error: `Online refills are unavailable right now. Please call us on ${primaryPhone.display}.` },
        { status: 503 }
      )
    }
    console.log('[refill request] (dev, not emailed)', request)
    return NextResponse.json({ message: 'Refill request received (development mode — not emailed).' })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.REFILL_EMAIL_FROM ?? 'Grace Pharmacy website <onboarding@resend.dev>',
      to: process.env.REFILL_EMAIL_TO ?? site.email,
      subject: `Refill request: Rx ${request.prescription} — ${request.name}`,
      text: [
        `Name: ${request.name}`,
        `Prescription number: ${request.prescription}`,
        `Phone: ${request.phone}`,
        `Notes: ${request.notes || '(none)'}`,
        `Received: ${request.receivedAt}`,
      ].join('\n'),
    }),
  }).catch(() => null)

  if (!res?.ok) {
    console.error('[refill request] email failed', res?.status, await res?.text(), request)
    return NextResponse.json(
      { error: `We couldn't send your request. Please try again or call us on ${primaryPhone.display}.` },
      { status: 502 }
    )
  }

  return NextResponse.json(
    { message: 'Refill request received. We will have it ready for pickup soon.' },
    { status: 200 }
  )
}
