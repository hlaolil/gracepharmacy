import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import HomeHero from '@/components/HomeHero'
import RefillForm from '@/components/RefillForm'
import ReminderSignupForm from '@/components/ReminderSignupForm'
import { site, siteUrl, primaryPhone } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Community Pharmacy in Ha Leqele, Maseru',
  description:
    'The Healing Hub Pharmacy in Ha Leqele, Maseru — prescriptions ready in minutes, blood pressure and glucose checks, chronic-care support and free email refill reminders.',
  alternates: { canonical: '/' },
}

const services = [
  {
    tag: 'Dispensary',
    title: 'Fast prescription refills',
    body: 'Most prescriptions are ready in about 10 minutes. Send your prescription number online and skip the queue.',
    meta: 'Online or in person',
  },
  {
    tag: 'Wellness Hub',
    title: 'Blood pressure & glucose checks',
    body: 'Quick checks at the counter, and counselling on living well with diabetes and high blood pressure.',
    meta: 'Ask at the counter',
  },
  {
    tag: 'Reminders',
    title: 'Never run out',
    body: 'Sign up once and we email you a few days before every refill is due. Free, and you can stop any time.',
    meta: 'Free email service',
  },
  {
    tag: 'Shelf',
    title: 'Over-the-counter care',
    body: 'Pain relief, cold and flu remedies, vitamins and supplements, with a pharmacist to help you choose.',
    meta: 'Walk-in',
  },
]

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: site.name,
    slogan: site.tagline,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/hh-counter.webp`,
    description:
      'Community pharmacy in Ha Leqele, Maseru, Lesotho offering fast prescription refills, blood pressure and glucose checks, and email refill reminders.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    hasMap: site.directionsUrl,
    telephone: site.phones.map((p) => p.tel),
    ...(site.email ? { email: site.email } : {}),
    ...(site.hours.length
      ? {
          openingHoursSpecification: site.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />

      <section className="section-teal">
        <div className="container">
          <div className="stat-strip">
            <div className="stat-item">
              <div className="stat-num">~10 min</div>
              <div className="stat-label">Typical wait for a prescription</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Free reminders</div>
              <div className="stat-label">An email before every refill is due</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">Ha Leqele</div>
              <div className="stat-label">Maseru, Lesotho</div>
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
              Fast refills for the medicines you take every month, and the support to keep your
              blood pressure, sugar and other long-term conditions under control.
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

      <section className="section" style={{ background: 'var(--white)', paddingTop: 0 }}>
        <div className="container">
          <div className="photo-feature">
            <figure className="photo-frame">
              <Image
                src="/images/hh-otc-display.webp"
                alt="Glass display counter with over-the-counter medicines in front of stocked shelves"
                width={655}
                height={668}
                sizes="(max-width: 900px) 100vw, 560px"
              />
            </figure>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">On our shelves</span>
              <h2>More than prescriptions</h2>
              <p>
                Over-the-counter medicines, packaged herbal medicines, supplements, skin care and
                medical supplies &mdash; with a pharmacist on hand to help you choose.
              </p>
              <p>
                <Link href="/products" style={{ color: 'var(--sky-deep)', fontWeight: 600 }}>
                  See what we stock &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight" id="refill" style={{ background: 'var(--mist-dim)' }}>
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
                Prefer to talk it through? Call{' '}
                <a href={`tel:${primaryPhone.tel}`} style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>
                  {primaryPhone.display}
                </a>
                .
              </p>
            </div>
            <div className="refill-shell">
              <RefillForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight" id="reminders" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="refill-layout">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Free refill reminders</span>
              <h2>We&apos;ll email you before you run out</h2>
              <p>
                Taking medicine every month for blood pressure, diabetes, HIV or another
                long-term condition? Tell us when your next refill is due and we&apos;ll email
                you a few days before, every time.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Our emails never name your medicine, and every email has a link to stop them.
              </p>
            </div>
            <div className="refill-shell">
              <ReminderSignupForm />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container" style={{ position: 'relative' }}>
          <span className="eyebrow">Have a question first?</span>
          <h2>Talk to a pharmacist before you decide</h2>
          <p>No charge for a quick chat about symptoms, side effects, or your regular medicines.</p>
          <a href={`tel:${primaryPhone.tel}`} className="btn btn-teal">
            Call {primaryPhone.display}
          </a>
        </div>
      </section>
    </main>
  )
}
