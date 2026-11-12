import { randomBytes } from 'crypto'
import type postgres from 'postgres'
import { site, siteUrl, primaryPhone } from '@/lib/site'
import { sendEmail, escapeHtml } from '@/lib/email'

// Email refill reminders.
//
// Each reminder row has a next_due date and an interval (e.g. every 30 days). Once a day
// (Vercel Cron → /api/reminders/run) we email everyone whose refill is due within
// remind_days_before days and who hasn't been reminded for that due date yet.
//
// When staff mark a refill "Collected", next_due moves to today + interval. If nobody
// marks it, next_due moves on by itself once it is more than GRACE_DAYS overdue, so a
// patient who collected without staff ticking the box still gets next month's reminder.

type Sql = ReturnType<typeof postgres>

export const GRACE_DAYS = 7
// Keeps each daily run small; anything left over is still due and goes out tomorrow.
export const MAX_PER_RUN = 50

export const INTERVAL_OPTIONS = [
  { days: 28, label: 'Every 4 weeks' },
  { days: 30, label: 'Every month' },
  { days: 60, label: 'Every 2 months' },
  { days: 90, label: 'Every 3 months' },
]

export interface ReminderRow {
  id: string
  name: string
  email: string
  phone: string
  medicine: string
  interval_days: number
  next_due: string // 'YYYY-MM-DD' (selected with to_char so time zones can't shift it)
  remind_days_before: number
  active: boolean
  last_reminded_for: string | null
  last_sent_at: Date | null
  token: string
  source: 'web' | 'staff'
  created_at: Date
}

// Columns with dates as plain 'YYYY-MM-DD' text.
export const REMINDER_COLUMNS = (sql: Sql) => sql`
  id, name, email, phone, medicine, interval_days,
  to_char(next_due, 'YYYY-MM-DD') AS next_due,
  remind_days_before, active,
  to_char(last_reminded_for, 'YYYY-MM-DD') AS last_reminded_for,
  last_sent_at, token, source, created_at
`

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const NAME_RE = /^[A-Za-z][A-Za-z\s'.-]{1,79}$/
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function newToken() {
  return randomBytes(24).toString('base64url')
}

export async function todayInMaseru(sql: Sql): Promise<string> {
  const [row] = await sql<{ today: string }[]>`SELECT to_char((now() AT TIME ZONE 'Africa/Maseru')::date, 'YYYY-MM-DD') AS today`
  return row.today
}

// 'YYYY-MM-DD' -> 'Monday 2 February'
export function formatDue(ymd: string) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' }).format(
    new Date(`${ymd}T00:00:00Z`)
  )
}

export function daysBetween(fromYmd: string, toYmd: string) {
  return Math.round((Date.parse(`${toYmd}T00:00:00Z`) - Date.parse(`${fromYmd}T00:00:00Z`)) / 86_400_000)
}

const firstName = (name: string) => name.trim().split(/\s+/)[0]
export const unsubscribeUrl = (token: string) => `${siteUrl}/reminders/unsubscribe?token=${encodeURIComponent(token)}`

function wrapHtml(paragraphs: string[], token: string) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 14px">${p}</p>`).join('')
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#17302A;max-width:520px">
${body}
<p style="margin:24px 0 0;font-size:12px;color:#4A635A">You are getting this because you signed up for refill reminders from ${escapeHtml(site.name)}.
<a href="${unsubscribeUrl(token)}" style="color:#21664A">Stop these reminders</a>.</p></div>`
}

// The email never names the medicine: inboxes are often shared or seen by others.
export function reminderEmail(row: Pick<ReminderRow, 'name' | 'next_due' | 'token'>, today: string) {
  const due = formatDue(row.next_due)
  const overdue = daysBetween(today, row.next_due) < 0
  const lead = overdue ? `your refill was due on ${due}` : `your next refill is due on ${due}`
  const refillUrl = `${siteUrl}/#refill`
  const text = [
    `Hi ${firstName(row.name)},`,
    '',
    `This is a reminder from ${site.name} that ${lead}.`,
    `To have it ready when you arrive, request it online at ${refillUrl} or call us on ${primaryPhone.display}.`,
    '',
    `${site.name}, ${site.address.lines.join(', ')}`,
    '',
    `Stop these reminders: ${unsubscribeUrl(row.token)}`,
  ].join('\n')
  const html = wrapHtml(
    [
      `Hi ${escapeHtml(firstName(row.name))},`,
      `This is a reminder from ${escapeHtml(site.name)} that <strong>${escapeHtml(lead)}</strong>.`,
      `To have it ready when you arrive, <a href="${refillUrl}" style="color:#21664A">request it online</a> or call us on <a href="tel:${primaryPhone.tel}" style="color:#21664A">${primaryPhone.display}</a>.`,
      `${escapeHtml(site.name)}<br>${site.address.lines.map(escapeHtml).join('<br>')}`,
    ],
    row.token
  )
  return {
    to: '', // filled in by caller
    subject: overdue ? `Your refill was due on ${due}` : `Your refill is due on ${due}`,
    text,
    html,
    headers: { 'List-Unsubscribe': `<${unsubscribeUrl(row.token)}>` },
  }
}

export function confirmationEmail(row: Pick<ReminderRow, 'name' | 'next_due' | 'token' | 'interval_days' | 'remind_days_before'>) {
  const due = formatDue(row.next_due)
  const option = INTERVAL_OPTIONS.find((o) => o.days === row.interval_days)
  const every = option ? option.label.toLowerCase() : `every ${row.interval_days} days`
  const text = [
    `Hi ${firstName(row.name)},`,
    '',
    `You're signed up for refill reminders from ${site.name}.`,
    `Your next refill is due on ${due}. We'll email you ${row.remind_days_before} days before, then ${every} after that.`,
    `If your dates change, call us on ${primaryPhone.display} and we'll update them.`,
    '',
    `Didn't sign up, or changed your mind? Stop these reminders: ${unsubscribeUrl(row.token)}`,
  ].join('\n')
  const html = wrapHtml(
    [
      `Hi ${escapeHtml(firstName(row.name))},`,
      `You're signed up for refill reminders from ${escapeHtml(site.name)}.`,
      `Your next refill is due on <strong>${escapeHtml(due)}</strong>. We'll email you ${row.remind_days_before} days before, then ${escapeHtml(every)} after that.`,
      `If your dates change, call us on <a href="tel:${primaryPhone.tel}" style="color:#21664A">${primaryPhone.display}</a> and we'll update them.`,
    ],
    row.token
  )
  return {
    to: '',
    subject: `You're signed up for refill reminders`,
    text,
    html,
    headers: { 'List-Unsubscribe': `<${unsubscribeUrl(row.token)}>` },
  }
}

// Moves forward the due date of anyone more than GRACE_DAYS overdue, to the first
// cycle date on or after today. Returns how many rows moved.
export async function rollForwardOverdue(sql: Sql, today: string) {
  const rows = await sql`
    UPDATE refill_reminders
    SET next_due = next_due + interval_days * ((${today}::date - next_due + interval_days - 1) / interval_days),
        last_reminded_for = NULL
    WHERE active AND ${today}::date - next_due > ${GRACE_DAYS}
    RETURNING id
  `
  return rows.length
}

export async function findDue(sql: Sql, today: string, limit = MAX_PER_RUN) {
  return sql<ReminderRow[]>`
    SELECT ${REMINDER_COLUMNS(sql)}
    FROM refill_reminders
    WHERE active
      AND next_due - remind_days_before <= ${today}::date
      AND next_due >= ${today}::date - ${GRACE_DAYS}::integer
      AND last_reminded_for IS DISTINCT FROM next_due
    ORDER BY next_due, id
    LIMIT ${limit}
  `
}

export async function markReminded(sql: Sql, id: string) {
  await sql`UPDATE refill_reminders SET last_reminded_for = next_due, last_sent_at = now() WHERE id = ${id}`
}

// The daily job. Safe to run more than once a day: a due date is only emailed once.
export async function runDueReminders(sql: Sql, send = sendEmail) {
  const today = await todayInMaseru(sql)
  const rolled = await rollForwardOverdue(sql, today)
  const due = await findDue(sql, today)
  let sent = 0
  let failed = 0
  for (const row of due) {
    const ok = await send({ ...reminderEmail(row, today), to: row.email })
    if (ok) {
      await markReminded(sql, row.id)
      sent++
    } else {
      failed++
    }
  }
  return { today, rolled, due: due.length, sent, failed }
}
