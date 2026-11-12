import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getDb } from '@/lib/db'
import { site, primaryPhone } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Stop refill reminders',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

// The email link only opens this page; nothing is deleted until the patient presses the
// button. (Some email systems open links automatically to scan them.)
async function unsubscribe(formData: FormData) {
  'use server'
  const token = String(formData.get('token') ?? '')
  const sql = await getDb()
  if (sql && token) {
    await sql`DELETE FROM refill_reminders WHERE token = ${token}`
  }
  redirect('/reminders/unsubscribe?done=1')
}

export default async function UnsubscribePage({ searchParams }: { searchParams: { token?: string; done?: string } }) {
  const token = searchParams.token ?? ''
  let found = false
  if (!searchParams.done && token) {
    const sql = await getDb()
    if (sql) {
      const rows = await sql`SELECT 1 FROM refill_reminders WHERE token = ${token} LIMIT 1`
      found = rows.length > 0
    }
  }

  return (
    <main className="section" style={{ background: 'var(--mist-dim)' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="refill-shell">
          <span className="eyebrow">Refill reminders</span>
          {searchParams.done ? (
            <>
              <h1 style={{ fontSize: '1.8rem', margin: '0.6rem 0 1rem' }}>Reminders stopped</h1>
              <p>
                You won&apos;t get any more refill reminders from {site.name}, and we&apos;ve deleted
                your reminder details. You can sign up again any time on our{' '}
                <Link href="/#reminders" style={{ color: 'var(--sky-deep)', fontWeight: 600 }}>home page</Link>.
              </p>
            </>
          ) : found ? (
            <>
              <h1 style={{ fontSize: '1.8rem', margin: '0.6rem 0 1rem' }}>Stop refill reminders?</h1>
              <p style={{ marginBottom: '1.25rem' }}>
                You&apos;ll stop getting reminder emails, and we&apos;ll delete your reminder details.
              </p>
              <form action={unsubscribe}>
                <input type="hidden" name="token" value={token} />
                <button type="submit" className="btn btn-teal btn-block">Stop my reminders</button>
              </form>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '1.8rem', margin: '0.6rem 0 1rem' }}>Link not recognised</h1>
              <p>
                These reminders may already be stopped. If you&apos;re still getting emails, call us on{' '}
                <a href={`tel:${primaryPhone.tel}`} style={{ color: 'var(--sky-deep)', fontWeight: 600 }}>{primaryPhone.display}</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
