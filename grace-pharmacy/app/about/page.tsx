import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Grace Pharmacy is a community pharmacy in Morija, Lesotho, offering prescription medications, over-the-counter remedies, and health consultations with a personal touch.',
  alternates: { canonical: '/about' },
}

const services = [
  { img: 'service1', alt: 'Prescription refills', tag: 'Dispensary', title: 'Prescription Refills' },
  { img: 'service2', alt: 'Health consultations', tag: 'Advice', title: 'Health Consultations' },
  { img: 'service3', alt: 'Over-the-counter products', tag: 'Shelf', title: 'OTC Products' },
  { img: 'service4', alt: 'Medical equipment', tag: 'Equipment', title: 'Medical Equipment' },
  { img: 'service5', alt: 'Immunizations', tag: 'Clinic', title: 'Immunizations' },
]

const timeline = [
  {
    year: 'The beginning',
    title: 'A counter, a shelf, a reason to open',
    body: 'Grace Pharmacy started on the belief that healthcare should be both accessible and reliable for the community along the A2 road.',
  },
  {
    year: 'Growing in',
    title: 'Becoming the pharmacy people call first',
    body: 'Word of mouth, not advertising, grew the shop — one prescription, one consultation, one returning customer at a time.',
  },
  {
    year: 'Today',
    title: 'Care that still fits on a label',
    body: 'We keep growing, but the goal stays the same: clear advice, the right medicine, and a bit of grace at the counter.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="Health is wealth, and we mean that"
        description="Grace Pharmacy brings qualified pharmacists and a friendly counter to the A2 road in Morija — for prescriptions, consultations, and everything in between."
      />

      <section className="section section-white">
        <div className="container">
          <p className="lede">
            Our highly qualified pharmacists and friendly staff work together to meet your
            healthcare needs with compassion, professionalism, and a personal touch. We offer a
            wide range of products and services, including prescription medications,
            over-the-counter remedies, and health consultations. Whether you&apos;re looking for
            daily vitamins or specialized medical equipment, we&apos;re here to support your
            health journey every step of the way.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--parchment-dim)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our story</span>
            <h2>From a small counter to a name people trust</h2>
          </div>
          <div className="timeline">
            {timeline.map((t) => (
              <div className="timeline-item" key={t.title}>
                <span className="timeline-year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What&apos;s on the shelf</span>
            <h2>Our services</h2>
            <p>Five ways we help, every day the doors are open.</p>
          </div>
          <div className="label-grid">
            {services.map((s) => (
              <figure className="label-card" key={s.img} style={{ paddingTop: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', margin: '0 -1.5rem 1rem', borderRadius: 0 }}>
                  <Image src={`/images/${s.img}.webp`} alt={s.alt} fill style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <span className="label-tag">{s.tag}</span>
                <figcaption>
                  <h3 style={{ marginTop: '0.4rem' }}>{s.title}</h3>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <span className="eyebrow">Come say hello</span>
          <h2>We&apos;re easy to find on the A2</h2>
          <p>Stop by during opening hours, or reach out before you visit.</p>
          <Link href="/contact" className="btn btn-pine">
            Get directions &amp; contact details
          </Link>
        </div>
      </section>
    </main>
  )
}
