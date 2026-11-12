import Link from 'next/link'

export default function StaffNav({ current }: { current: 'requests' | 'reminders' }) {
  return (
    <nav className="staff-nav" aria-label="Staff pages">
      <Link href="/staff" className={current === 'requests' ? 'active' : ''}>Refill requests</Link>
      <Link href="/staff/reminders" className={current === 'reminders' ? 'active' : ''}>Refill reminders</Link>
    </nav>
  )
}
