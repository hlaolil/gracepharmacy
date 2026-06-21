import { NextRequest, NextResponse } from 'next/server'

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

  // In production, this is where you'd persist the request (database, ticketing
  // system, or an email/SMS notification to the pharmacy). For now we log it
  // server-side and acknowledge receipt.
  console.log('[refill request]', {
    name: (name as string).trim(),
    prescription: (prescription as string).trim(),
    phone: (phone as string).trim(),
    notes: typeof notes === 'string' ? notes.trim() : '',
    receivedAt: new Date().toISOString(),
  })

  return NextResponse.json(
    { message: 'Refill request received. We will have it ready for pickup soon.' },
    { status: 200 }
  )
}
