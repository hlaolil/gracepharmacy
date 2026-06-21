import type { Metadata } from 'next'
import Link from 'next/link'
import HomeHero from '@/components/HomeHero'
import RefillForm from '@/components/RefillForm'

export const metadata: Metadata = {
  title: 'Community Pharmacy in Morija, Lesotho',
  description:
    'Grace Pharmacy is your trusted pharmacy on the A2 road in Morija — prescription refills, health consultations, and wellness products for the whole family.',
  alternates: { canonical: '/' },
}

const services = [
  {
    tag: 'Dispensary',
    title: 'Prescription refills',
    body: 'Bring your script in or send it online. Most refills are ready the same day.',
    meta: 'Same-day · In-store pickup',
  },
  {
    tag: 'Advice',
    title: 'Health consultations',
    body: 'Our pharmacists talk through symptoms, interactions, and what actually helps.',
    meta: 'No appointment needed',
  },
  {
    tag: 'Shelf',
    title: 'Over-the-counter care',
    body: 'Pain relief, cold and flu remedies, vitamins — stocked and explained, not just sold.',
    meta: 'Walk-in',
  },
  {
    tag: 'Equipment',
    title: 'Home health devices',
    body: 'Blood pressure monitors and more, with a quick how-to-use from our staff.',
    meta: 'Demonstration included',
  },
]

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: 'Grace Pharmacy',
    description:
      'Community pharmacy in Morija, Lesotho offering prescription refills, health consultations, and wellness products.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Along A2 Road, Makotoane Complex',
      addressLocality: 'Morija',
      postalCode: '100',
      addressCountry: 'LS',
    },
    telephone: '+266-5617-6099',
    email: 'grace@pharmacy.com',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />

      <section className="section-pine">
        <div className="container">
          <div className="stat-strip">
            <div className="stat-item">
              <div className="stat-num">8am&ndash;6pm</div>
              <div className="stat-label">Open Monday to Saturday</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Same-day</div>
              <div className="stat-label">Most refills ready in hours</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">A2 Road</div>
              <div className="stat-label">Makotoane Complex, Morija</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Pharmacy care, without the wait</h2>
            <p>
              From the dispensary counter to the shelf, everything at Grace Pharmacy is handled
              by people who&apos;ll explain what they&apos;re giving you and why.
            </p>
          </div>
          <div className="label-grid">
            {services.map((s) => (
              <article className="label-card" key={s.title}>
                <span className="label-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="label-meta">
                  <span>{s.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight" id="refill" style={{ background: 'var(--parchment-dim)' }}>
        <div className="container">
          <div className="refill-layout">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Refill online</span>
              <h2>Send your prescription number, skip the line</h2>
              <p>
                Fill in your details below and we&apos;ll have your refill ready for pickup.
                You&apos;ll get a call if anything needs checking first.
              </p>
              <p style={{ marginTop: '1.5rem' }}>
                Prefer to talk it through? Call <a href="tel:+26656176099" style={{ color: 'var(--pine-deep)', fontWeight: 600 }}>+266 5617 6099</a> during opening hours.
              </p>
            </div>
            <div className="refill-shell">
              <RefillForm />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container" style={{ position: 'relative' }}>
          <span className="eyebrow">Have a question first?</span>
          <h2>Talk to a pharmacist before you decide</h2>
          <p>No charge for a quick chat about symptoms, interactions, or what to stock at home.</p>
          <Link href="/products" className="btn btn-pine">
            Browse products &amp; services
          </Link>
        </div>
      </section>
    </main>
  )
}
