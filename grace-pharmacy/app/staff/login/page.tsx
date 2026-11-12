import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { checkPassword, isStaff, startStaffSession, staffPasswordConfigured } from '@/lib/staffAuth'

export const metadata: Metadata = {
  title: 'Staff sign in',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

async function login(formData: FormData) {
  'use server'
  const password = String(formData.get('password') ?? '')
  if (!checkPassword(password)) {
    // Slow down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    redirect('/staff/login?error=1')
  }
  startStaffSession()
  redirect('/staff')
}

export default function StaffLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  if (isStaff()) redirect('/staff')

  return (
    <main className="section" style={{ background: 'var(--mist-dim)' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="refill-shell">
          <span className="eyebrow">Staff only</span>
          <h1 style={{ fontSize: '1.8rem', margin: '0.6rem 0 1.25rem' }}>Staff sign in</h1>

          {!staffPasswordConfigured() ? (
            <p className="form-status error">
              The staff page is turned off. Set STAFF_PASSWORD in the Vercel project settings to turn it on.
            </p>
          ) : (
            <form action={login}>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required autoComplete="current-password" autoFocus />
                {searchParams.error && <p className="field-error">That password is not correct.</p>}
              </div>
              <button type="submit" className="btn btn-teal btn-block">Sign in</button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
