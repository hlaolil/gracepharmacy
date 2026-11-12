import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getDb, deleteExpiredRefills, RETENTION_DAYS, type RefillRow } from '@/lib/db'
import { endStaffSession, isStaff } from '@/lib/staffAuth'
import StaffNav from '@/components/StaffNav'

export const metadata: Metadata = {
  title: 'Refill requests',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const formatReceived = (d: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Maseru',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)

async function setStatus(formData: FormData) {
  'use server'
  if (!isStaff()) redirect('/staff/login')
  const id = Number(formData.get('id'))
  const status = formData.get('status') === 'done' ? 'done' : 'pending'
  const sql = await getDb()
  if (sql && Number.isInteger(id)) {
    await sql`
      UPDATE refill_requests
      SET status = ${status}, done_at = ${status === 'done' ? sql`now()` : null}
      WHERE id = ${id}
    `
  }
  revalidatePath('/staff')
}

async function logout() {
  'use server'
  endStaffSession()
  redirect('/staff/login')
}

export default async function StaffPage() {
  if (!isStaff()) redirect('/staff/login')

  const sql = await getDb()
  let rows: RefillRow[] = []
  if (sql) {
    await deleteExpiredRefills(sql)
    rows = await sql<RefillRow[]>`SELECT * FROM refill_requests ORDER BY created_at DESC`
  }
  const pending = rows.filter((r) => r.status === 'pending').reverse() // oldest first
  const done = rows.filter((r) => r.status === 'done')

  return (
    <main className="section" style={{ background: 'var(--mist-dim)' }}>
      <div className="container">
        <div className="staff-head">
          <div>
            <span className="eyebrow">Staff only</span>
            <h1>Refill requests</h1>
            <p>Requests are deleted automatically after {RETENTION_DAYS} days.</p>
          </div>
          <form action={logout}>
            <button type="submit" className="btn btn-ghost">Sign out</button>
          </form>
        </div>
        <StaffNav current="requests" />

        {!sql ? (
          <p className="form-status error">
            No database is connected. In Vercel, open the project&apos;s Storage tab and connect a Neon database.
          </p>
        ) : (
          <>
            <h2 className="staff-section-title">Waiting ({pending.length})</h2>
            {pending.length === 0 ? (
              <p className="staff-empty">No refill requests waiting.</p>
            ) : (
              <ul className="staff-list">
                {pending.map((r) => (
                  <RefillCard key={r.id} row={r} />
                ))}
              </ul>
            )}

            {done.length > 0 && (
              <details className="staff-done">
                <summary>Done ({done.length})</summary>
                <ul className="staff-list">
                  {done.map((r) => (
                    <RefillCard key={r.id} row={r} />
                  ))}
                </ul>
              </details>
            )}
          </>
        )}
      </div>
    </main>
  )
}

function RefillCard({ row }: { row: RefillRow }) {
  const isDone = row.status === 'done'
  return (
    <li className={`staff-card ${isDone ? 'is-done' : ''}`}>
      <div className="staff-card-main">
        <h3>{row.name}</h3>
        <dl>
          <div><dt>Rx number</dt><dd>{row.prescription}</dd></div>
          <div><dt>Phone</dt><dd><a href={`tel:${row.phone.replace(/[^\d+]/g, '')}`}>{row.phone}</a></dd></div>
          <div><dt>Received</dt><dd>{formatReceived(row.created_at)}</dd></div>
        </dl>
        {row.notes && <p className="staff-notes">{row.notes}</p>}
      </div>
      <form action={setStatus}>
        <input type="hidden" name="id" value={row.id} />
        <input type="hidden" name="status" value={isDone ? 'pending' : 'done'} />
        <button type="submit" className={`btn ${isDone ? 'btn-ghost' : 'btn-teal'}`}>
          {isDone ? 'Move back to waiting' : 'Mark done'}
        </button>
      </form>
    </li>
  )
}
