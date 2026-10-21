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
  { tag: 'Dispensary', title: 'Prescription refills', body: 'Hand in your script at the counter or send it online for pickup.' },
  { tag: 'Advice', title: 'Health consultations', body: 'Talk through symptoms, side effects, and interactions with a pharmacist.' },
  { tag: 'Shelf', title: 'Over-the-counter care', body: 'Pain relief, cold and flu, vitamins and supplements.' },
  { tag: 'Equipment', title: 'Medical equipment', body: 'Blood pressure monitors, glucometers, and test strips.' },
  { tag: 'Clinic', title: 'Immunizations & testing', body: 'Vaccinations and HIV self-test kits — ask at the counter.' },
]

const photos = [
  { src: '/images/pick-up.webp', w: 794, h: 579, alt: 'The Grace Pharmacy counter with stocked shelves behind it', caption: 'The dispensary counter' },
  { src: '/images/vaccination.webp', w: 311, h: 443, alt: 'Shelves of medicines beside an HIV self-testing poster', caption: 'Testing & immunizations' },
  { src: '/images/wellness.webp', w: 877, h: 1004, alt: 'Two bottles of Zinplex Forte zinc and selenium supplement', caption: 'Vitamins & supplements' },
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
        image="/images/wellness.webp"
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

      <section className="section" style={{ background: 'var(--mist-dim)' }}>
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
            <span className="eyebrow">Inside Grace Pharmacy</span>
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
          <h2>We&apos;re easy to find on the A2</h2>
          <p>Stop by during opening hours, or reach out before you visit.</p>
          <Link href="/contact" className="btn btn-teal">
            Get directions &amp; contact details
          </Link>
        </div>
      </section>
    </main>
  )
}
