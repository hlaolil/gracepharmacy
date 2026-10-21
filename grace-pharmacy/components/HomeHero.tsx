import Link from 'next/link'
import Image from 'next/image'
import { site, formatTime } from '@/lib/site'

export default function HomeHero() {
  return (
    <section className="hero">
      <Image src="/images/pick-up.webp" alt="" fill priority sizes="100vw" className="hero-photo" />
      <div className="hero-photo-overlay" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Morija, Lesotho &middot; Est. community pharmacy</span>
          <h1>
            Your prescription, <em>filled with care</em>.
          </h1>
          <p>
            Grace Pharmacy is the corner chemist for the A2 road &mdash; prescriptions,
            consultations, and everyday health, handled by people who know your name.
          </p>
          <div className="hero-actions">
            <Link href="#refill" className="btn btn-sky">
              Refill a prescription
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Find us
            </Link>
          </div>
        </div>

        <div className="hero-label" aria-hidden="true">
          <div className="label-row">
            <span className="label-title">Grace Pharmacy</span>
            <span className="label-tag">Rx Label</span>
          </div>
          <dl>
            <dt>Open</dt>
            <dd>
              {site.hours.map((h) => (
                <span key={h.label} style={{ display: 'block' }}>
                  {h.days.length > 1 ? 'Mon–Fri' : h.label.slice(0, 3)} {formatTime(h.opens)}&ndash;{formatTime(h.closes)}
                </span>
              ))}
            </dd>
            <dt>Pharmacist</dt>
            <dd>On site, every day we&apos;re open</dd>
            <dt>Location</dt>
            <dd>Makotoane Complex, A2 Road</dd>
            <dt>Refills</dt>
            <dd>Online or in person</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
