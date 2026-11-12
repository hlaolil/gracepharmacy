import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getDb } from '@/lib/db'
import { isStaff, endStaffSession } from '@/lib/staffAuth'
import { emailConfigured, sendEmail } from '@/lib/email'
import StaffNav from '@/components/StaffNav'
import {
  DATE_RE,
  EMAIL_RE,
  INTERVAL_OPTIONS,
  NAME_RE,
  REMINDER_COLUMNS,
  type ReminderRow,
  confirmationEmail,
  daysBetween,
  formatDue,
  newToken,
  runDueReminders,
  todayInMaseru,
} from '@/lib/reminders'

export const metadata: Metadata = {
  title: 'Refill reminders',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

async function requireStaff() {
  if (!isStaff()) redirect('/staff/login')
  const sql = await getDb()
  if (!sql) redirect('/staff/reminders')
  return sql
}

const back = (msg: string) => redirect(`/staff/reminders?msg=${encodeURIComponent(msg)}`)

async function addReminder(formData: FormData) {
  'use server'
  const sql = await requireStaff()
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const phone = String(formData.get('phone') ?? '').trim().slice(0, 40)
  const medicine = String(formData.get('medicine') ?? '').trim().slice(0, 200)
  const nextDue = String(formData.get('nextDue') ?? '')
  const intervalDays = Number(formData.get('intervalDays'))
  const consent = formData.get('consent') === 'on'

  if (!NAME_RE.test(name)) back('Enter the patient’s name (letters only).')
  if (!EMAIL_RE.test(email)) back('Enter a valid email address.')
  if (!DATE_RE.test(nextDue)) back('Choose the next refill date.')
  if (!INTERVAL_OPTIONS.some((o) => o.days === intervalDays)) back('Choose how often they refill.')
  if (!consent) back('The patient must agree to reminder emails before you add them.')
  const today = await todayInMaseru(sql)
  if (daysBetween(today, nextDue) < 0) back('The next refill date has already passed.')

  const token = newToken()
  await sql`
    INSERT INTO refill_reminders (name, email, phone, medicine, interval_days, next_due, token, source)
    VALUES (${name}, ${email}, ${phone}, ${medicine}, ${intervalDays}, ${nextDue}::date, ${token}, 'staff')
  `
  if (emailConfigured()) {
    await sendEmail({
      ...confirmationEmail({ name, next_due: nextDue, token, interval_days: intervalDays, remind_days_before: 3 }),
      to: email,
    })
  }
  revalidatePath('/staff/reminders')
  back(`${name} added. A confirmation email has been sent.`)
}

async function markCollected(formData: FormData) {
  'use server'
  const sql = await requireStaff()
  const id = Number(formData.get('id'))
  if (Number.isInteger(id)) {
    const today = await todayInMaseru(sql)
    await sql`
      UPDATE refill_reminders
      SET next_due = ${today}::date + interval_days, last_reminded_for = NULL
      WHERE id = ${id}
    `
  }
  revalidatePath('/staff/reminders')
}

async function setNextDue(formData: FormData) {
  'use server'
  const sql = await requireStaff()
  const id = Number(formData.get('id'))
  const nextDue = String(formData.get('nextDue') ?? '')
  if (Number.isInteger(id) && DATE_RE.test(nextDue)) {
    await sql`UPDATE refill_reminders SET next_due = ${nextDue}::date, last_reminded_for = NULL WHERE id = ${id}`
  }
  revalidatePath('/staff/reminders')
}

async function toggleActive(formData: FormData) {
  'use server'
  const sql = await requireStaff()
  const id = Number(formData.get('id'))
  if (Number.isInteger(id)) await sql`UPDATE refill_reminders SET active = NOT active WHERE id = ${id}`
  revalidatePath('/staff/reminders')
}

async function remove(formData: FormData) {
  'use server'
  const sql = await requireStaff()
  const id = Number(formData.get('id'))
  if (Number.isInteger(id)) await sql`DELETE FROM refill_reminders WHERE id = ${id}`
  revalidatePath('/staff/reminders')
}

async function sendDueNow() {
  'use server'
  const sql = await requireStaff()
  if (!emailConfigured()) back('Email is not set up (RESEND_API_KEY is missing).')
  const r = await runDueReminders(sql)
  revalidatePath('/staff/reminders')
  back(`Sent ${r.sent} reminder${r.sent === 1 ? '' : 's'}${r.failed ? `, ${r.failed} failed` : ''}.`)
}

async function logout() {
  'use server'
  endStaffSession()
  redirect('/staff/login')
}

export default async function RemindersPage({ searchParams }: { searchParams: { msg?: string } }) {
  if (!isStaff()) redirect('/staff/login')
  const sql = await getDb()
  let rows: ReminderRow[] = []
  let today = ''
  if (sql) {
    today = await todayInMaseru(sql)
    rows = await sql<ReminderRow[]>`SELECT ${REMINDER_COLUMNS(sql)} FROM refill_reminders ORDER BY active DESC, next_due, id`
  }
  const dueSoon = rows.filter((r) => r.active && daysBetween(today, r.next_due) <= r.remind_days_before)
  const later = rows.filter((r) => r.active && daysBetween(today, r.next_due) > r.remind_days_before)
  const paused = rows.filter((r) => !r.active)

  return (
    <main className="section" style={{ background: 'var(--mist-dim)' }}>
      <div className="container">
        <div className="staff-head">
          <div>
            <span className="eyebrow">Staff only</span>
            <h1>Refill reminders</h1>
            <p>Patients get an email {3} days before each refill is due. Emails never name the medicine.</p>
          </div>
          <form action={logout}>
            <button type="submit" className="btn btn-ghost">Sign out</button>
          </form>
        </div>
        <StaffNav current="reminders" />

        {searchParams.msg && <p className="form-status success" style={{ marginBottom: '1.25rem' }}>{searchParams.msg}</p>}
        {!emailConfigured() && (
          <p className="form-status error" style={{ marginBottom: '1.25rem' }}>
            Email is not set up yet: add RESEND_API_KEY in the Vercel project settings. Reminders are saved but not sent.
          </p>
        )}

        {!sql ? (
          <p className="form-status error">
            No database is connected. In Vercel, open the project&apos;s Storage tab and connect a Neon database.
          </p>
        ) : (
          <>
            <details className="staff-done" style={{ marginBottom: '2rem' }}>
              <summary>Add a patient</summary>
              <div className="refill-shell" style={{ marginTop: '1rem' }}>
                <form action={addReminder}>
                  <div className="form-grid-2">
                    <div className="form-row"><label htmlFor="s-name">Name*</label><input id="s-name" name="name" required /></div>
                    <div className="form-row"><label htmlFor="s-email">Email*</label><input id="s-email" name="email" type="email" required /></div>
                    <div className="form-row"><label htmlFor="s-phone">Phone</label><input id="s-phone" name="phone" placeholder="(+266) 58123456" /></div>
                    <div className="form-row">
                      <label htmlFor="s-med">Medicine (staff note, never emailed)</label>
                      <input id="s-med" name="medicine" placeholder="e.g. Amlodipine 5mg" />
                    </div>
                    <div className="form-row"><label htmlFor="s-due">Next refill due*</label><input id="s-due" name="nextDue" type="date" min={today} required /></div>
                    <div className="form-row">
                      <label htmlFor="s-int">How often*</label>
                      <select id="s-int" name="intervalDays" defaultValue="30">
                        {INTERVAL_OPTIONS.map((o) => <option key={o.days} value={o.days}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row checkbox-row">
                    <input type="checkbox" id="s-consent" name="consent" required />
                    <label htmlFor="s-consent">The patient has agreed to receive refill reminder emails.</label>
                  </div>
                  <button type="submit" className="btn btn-teal">Add patient</button>
                </form>
              </div>
            </details>

            <div className="staff-actions" style={{ marginBottom: '1rem' }}>
              <h2 className="staff-section-title" style={{ margin: 0 }}>Due now or within 3 days ({dueSoon.length})</h2>
              {dueSoon.length > 0 && (
                <form action={sendDueNow}>
                  <button type="submit" className="btn btn-ghost">Send due reminders now</button>
                </form>
              )}
            </div>
            <ReminderList rows={dueSoon} today={today} empty="No refills due in the next few days." />

            <h2 className="staff-section-title">Coming up ({later.length})</h2>
            <ReminderList rows={later} today={today} empty="No other patients yet." />

            {paused.length > 0 && (
              <details className="staff-done">
                <summary>Paused ({paused.length})</summary>
                <ReminderList rows={paused} today={today} empty="" />
              </details>
            )}
          </>
        )}
      </div>
    </main>
  )
}

function ReminderList({ rows, today, empty }: { rows: ReminderRow[]; today: string; empty: string }) {
  if (rows.length === 0) return empty ? <p className="staff-empty">{empty}</p> : null
  return (
    <ul className="staff-list" style={{ marginBottom: '2rem' }}>
      {rows.map((r) => (
        <ReminderCard key={r.id} row={r} today={today} />
      ))}
    </ul>
  )
}

function ReminderCard({ row, today }: { row: ReminderRow; today: string }) {
  const days = daysBetween(today, row.next_due)
  const when = days === 0 ? 'today' : days > 0 ? `in ${days} day${days === 1 ? '' : 's'}` : `${-days} day${days === -1 ? '' : 's'} ago`
  const option = INTERVAL_OPTIONS.find((o) => o.days === row.interval_days)
  const reminded = row.last_reminded_for === row.next_due
  return (
    <li className={`staff-card ${row.active ? '' : 'is-done'}`}>
      <div className="staff-card-main">
        <h3>
          {row.name}
          {!row.active && <span className="badge paused">Paused</span>}
          {row.active && days <= row.remind_days_before && <span className="badge due">{reminded ? 'Reminded' : 'Due'}</span>}
        </h3>
        <dl>
          <div><dt>Next refill</dt><dd>{formatDue(row.next_due)} ({when})</dd></div>
          <div><dt>Repeats</dt><dd>{option ? option.label : `Every ${row.interval_days} days`}</dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${row.email}`}>{row.email}</a></dd></div>
          {row.phone && <div><dt>Phone</dt><dd><a href={`tel:${row.phone.replace(/[^\d+]/g, '')}`}>{row.phone}</a></dd></div>}
          {row.medicine && <div><dt>Medicine</dt><dd>{row.medicine}</dd></div>}
        </dl>
      </div>
      <div className="staff-actions">
        {row.active && (
          <form action={markCollected}>
            <input type="hidden" name="id" value={row.id} />
            <button type="submit" className="btn btn-teal">Collected today</button>
          </form>
        )}
        <form action={setNextDue} className="staff-actions">
          <input type="hidden" name="id" value={row.id} />
          <input type="date" name="nextDue" defaultValue={row.next_due} aria-label={`Next refill date for ${row.name}`} />
          <button type="submit" className="btn btn-ghost">Change date</button>
        </form>
        <form action={toggleActive}>
          <input type="hidden" name="id" value={row.id} />
          <button type="submit" className="btn btn-ghost">{row.active ? 'Pause' : 'Resume'}</button>
        </form>
        <form action={remove}>
          <input type="hidden" name="id" value={row.id} />
          <button type="submit" className="btn btn-ghost">Remove</button>
        </form>
      </div>
    </li>
  )
}
