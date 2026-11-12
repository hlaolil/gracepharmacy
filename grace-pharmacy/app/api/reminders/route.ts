import { NextRequest, NextResponse } from 'next/server'
import { primaryPhone } from '@/lib/site'
import { getDb } from '@/lib/db'
import { emailConfigured, sendEmail } from '@/lib/email'
import {
  DATE_RE,
  EMAIL_RE,
  INTERVAL_OPTIONS,
  NAME_RE,
  confirmationEmail,
  daysBetween,
  newToken,
  todayInMaseru,
} from '@/lib/reminders'

const PHONE_RE = /^\(\+266\) \d{8}$/

// Public sign-up for email refill reminders (form on the home page).
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) ?? {}
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: real people never see or fill this field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ message: 'You are signed up.' })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const nextDue = typeof body.nextDue === 'string' ? body.nextDue.trim() : ''
  const intervalDays = Number(body.intervalDays)

  const errors: Record<string, string> = {}
  if (!NAME_RE.test(name)) errors.name = 'Enter your name (letters only).'
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'Enter a valid email address.'
  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Use the format (+266) 58123456, or leave it blank.'
  if (!INTERVAL_OPTIONS.some((o) => o.days === intervalDays)) errors.intervalDays = 'Choose how often you refill.'
  if (!DATE_RE.test(nextDue) || Number.isNaN(Date.parse(nextDue))) errors.nextDue = 'Choose the date your next refill is due.'
  if (body.consent !== true) errors.consent = 'Please tick the box to agree to reminder emails.'

  const sql = await getDb().catch((err) => {
    console.error('[reminders] database unavailable', err)
    return null
  })
  if (!sql || !emailConfigured()) {
    return NextResponse.json(
      { error: `Email reminders aren't available yet. Please call us on ${primaryPhone.display} to be reminded.` },
      { status: 503 }
    )
  }

  if (!errors.nextDue) {
    const today = await todayInMaseru(sql)
    const ahead = daysBetween(today, nextDue)
    if (ahead < 0) errors.nextDue = 'That date has passed. Choose your next refill date.'
    else if (ahead > 180) errors.nextDue = 'Choose a date within the next 6 months.'
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  const token = newToken()
  try {
    await sql`
      INSERT INTO refill_reminders (name, email, phone, interval_days, next_due, token, source)
      VALUES (${name}, ${email}, ${phone}, ${intervalDays}, ${nextDue}::date, ${token}, 'web')
    `
  } catch (err) {
    console.error('[reminders] insert failed', err)
    return NextResponse.json(
      { error: `We couldn't sign you up. Please try again or call us on ${primaryPhone.display}.` },
      { status: 502 }
    )
  }

  const confirmed = await sendEmail({
    ...confirmationEmail({ name, next_due: nextDue, token, interval_days: intervalDays, remind_days_before: 3 }),
    to: email,
  })

  return NextResponse.json({
    message: confirmed
      ? "You're signed up. We've sent a confirmation email — check your spam folder if you can't see it."
      : "You're signed up. We'll email you a few days before your refill is due.",
  })
}
