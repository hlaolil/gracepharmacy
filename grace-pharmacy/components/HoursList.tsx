import type { ReactNode } from 'react'
import { site, formatTime } from '@/lib/site'

// Opening hours as a <dl>. While site.hours is empty (hours not yet confirmed),
// shows the fallback instead of guessing.
export default function HoursList({ fallback }: { fallback: ReactNode }) {
  if (site.hours.length === 0) {
    return (
      <dl>
        <div>
          <dt>Hours</dt>
          <dd>{fallback}</dd>
        </div>
      </dl>
    )
  }
  return (
    <dl>
      {site.hours.map((h) => (
        <div key={h.label}>
          <dt>{h.label}</dt>
          <dd>
            {formatTime(h.opens)} &ndash; {formatTime(h.closes)}
          </dd>
        </div>
      ))}
    </dl>
  )
}
