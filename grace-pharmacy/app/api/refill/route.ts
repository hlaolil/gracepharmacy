import { NextRequest, NextResponse } from 'next/server'
import { site, primaryPhone } from '@/lib/site'
import { getDb, deleteExpiredRefills } from '@/lib/db'
import { sendEmail as deliverEmail } from '@/lib/email'

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

  // Deliver to whichever channels are configured: the Neon database (shown on the
  // /staff page) and/or email. The request counts as received if either succeeds.
  const hasDb = Boolean(process.env.DATABASE_URL)
  // Email needs both a Resend key and somewhere to send it.
  const emailTo = process.env.REFILL_EMAIL_TO ?? site.email
  const apiKey = emailTo ? process.env.RESEND_API_KEY : undefined

  if (!hasDb && !apiKey) {
    // Nowhere to send the request, so in production say so rather than pretend it went through.
    if (process.env.NODE_ENV === 'production') {
      console.error('[refill request] no DATABASE_URL or RESEND_API_KEY set; request not delivered')
      return NextResponse.json(
        { error: `Online refills are unavailable right now. Please call us on ${primaryPhone.display}.` },
        { status: 503 }
      )
    }
    console.log('[refill request] (dev, not saved or emailed)', request)
    return NextResponse.json({ message: 'Refill request received (development mode — not saved or emailed).' })
  }

  const [saved, emailed] = await Promise.all([
    hasDb ? saveToDatabase(request) : Promise.resolve(false),
    apiKey && emailTo ? sendEmail(emailTo, request) : Promise.resolve(false),
  ])

  if (!saved && !emailed) {
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

type RefillRequest = { name: string; prescription: string; phone: string; notes: string; receivedAt: string }

async function saveToDatabase(request: RefillRequest) {
  try {
    const sql = await getDb()
    if (!sql) return false
    await sql`
      INSERT INTO refill_requests (name, prescription, phone, notes)
      VALUES (${request.name}, ${request.prescription}, ${request.phone}, ${request.notes})
    `
    await deleteExpiredRefills(sql)
    return true
  } catch (err) {
    console.error('[refill request] database insert failed', err)
    return false
  }
}

async function sendEmail(to: string, request: RefillRequest) {
  return deliverEmail({
    to,
    subject: `Refill request: Rx ${request.prescription} — ${request.name}`,
    text: [
      `Name: ${request.name}`,
      `Prescription number: ${request.prescription}`,
      `Phone: ${request.phone}`,
      `Notes: ${request.notes || '(none)'}`,
      `Received: ${request.receivedAt}`,
    ].join('\n'),
  })
}
