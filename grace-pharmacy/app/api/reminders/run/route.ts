import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { getDb } from '@/lib/db'
import { emailConfigured } from '@/lib/email'
import { runDueReminders } from '@/lib/reminders'

export const dynamic = 'force-dynamic'

// Called once a day by Vercel Cron (see vercel.json). Vercel sends
// "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set in the project.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const given = req.headers.get('authorization') ?? ''
  const expected = `Bearer ${secret}`
  const ok =
    Boolean(secret) && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected))
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!emailConfigured()) {
    return NextResponse.json({ error: 'RESEND_API_KEY is not set; no reminders sent.' }, { status: 503 })
  }
  const sql = await getDb()
  if (!sql) {
    return NextResponse.json({ error: 'DATABASE_URL is not set; no reminders sent.' }, { status: 503 })
  }

  const result = await runDueReminders(sql)
  console.log('[reminders] daily run', result)
  return NextResponse.json(result)
}
