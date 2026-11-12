import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The Healing Hub Pharmacy is a licensed retail pharmacy in Ha Leqele, Maseru, built around fast refills and ongoing support for people living with long-term conditions.',
  alternates: { canonical: '/about' },
}

const services = [
  { tag: 'Dispensary', title: 'Prescription refills', body: 'Hand in your prescription at the counter or send the number online for pickup.' },
  { tag: 'Wellness Hub', title: 'Health checks', body: 'Blood pressure and glucose checks, with advice on what your numbers mean.' },
  { tag: 'Chronic care', title: 'Diabetes & hypertension support', body: 'Counselling on your medicines, diet and follow-up, from a pharmacist.' },
  { tag: 'Reminders', title: 'Email refill reminders', body: 'A free email a few days before each refill is due, so you never miss a dose.' },
  { tag: 'Shelf', title: 'Over-the-counter care', body: 'Pain relief, cold and flu, vitamins, supplements and medical supplies.' },
]

const photos = [
  { src: '/images/hh-counter.webp', alt: 'The front counter with shelves of medicines behind it', caption: 'The front counter' },
  { src: '/images/hh-dispensary.webp', alt: 'Dispensary shelves stocked with medicines', caption: 'The dispensary' },
  { src: '/images/hh-waiting-area.webp', alt: 'Seating and a water dispenser beside the counter', caption: 'Waiting area' },
  { src: '/images/hh-otc-display.webp', alt: 'Display counter with over-the-counter medicines', caption: 'Over-the-counter medicines' },
]

const timeline = [
  {
    year: 'January 2025',
    title: 'The company is registered',
    body: 'Pharmacist Letlotlo Hlaoli and operations manager Nthabiseng Mphutlane register The Healing Hub Pharmacy (Pty) Ltd.',
  },
  {
    year: 'February 2026',
    title: 'Doors open at Ha Leqele',
    body: 'A licensed retail pharmacy for the Ha Leqele community, with registered pharmacists at the counter.',
  },
  {
    year: 'Next',
    title: 'Care beyond the counter',
    body: 'Email refill reminders, Wellness Hub health checks, referrals from local clinics, and home delivery for patients on long-term medicine.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        image="/images/hh-dispensary.webp"
        eyebrow="About us"
        title="A pharmacy built around the medicines you take every month"
        description="The Healing Hub Pharmacy brings fast refills and ongoing support for long-term conditions to Ha Leqele, Maseru."
      />

      <section className="section section-white">
        <div className="container">
          <p className="lede">
            Many of our neighbours take medicine every month for high blood pressure, diabetes,
            HIV and other long-term conditions. Too often that means long queues for a routine
            refill and no one checking in between visits. We set out to change that: prescriptions
            ready in minutes, health checks at the counter, and a reminder before every refill,
            from registered pharmacists who know your name.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--mist-dim)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our story</span>
            <h2>From an idea to a pharmacy on your doorstep</h2>
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
            <span className="eyebrow">How we help</span>
            <h2>Our services</h2>
            <p>Five ways we help, every day the doors are open.</p>
          </div>
          <div className="label-grid">
            {services.map((s) => (
              <article className="label-card" key={s.title}>
                <span className="label-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--mist-dim)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Inside the pharmacy</span>
            <h2>Come and see for yourself</h2>
          </div>
          <div className="photo-gallery">
            {photos.map((p) => (
              <figure className="photo-frame" key={p.src}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 900px) 50vw, 400px" style={{ objectFit: 'cover' }} loading="lazy" />
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <span className="eyebrow">Come say hello</span>
          <h2>Find us in Ha Leqele</h2>
          <p>Stop by, or call before you visit.</p>
          <Link href="/contact" className="btn btn-teal">
            Get directions &amp; contact details
          </Link>
        </div>
      </section>
    </main>
  )
}
