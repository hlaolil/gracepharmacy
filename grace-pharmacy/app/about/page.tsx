import type { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: 'Grace Pharmacy | About Us',
  description:
    'Grace Pharmacy is your trusted partner in health, offering a comprehensive range of pharmaceutical products and healthcare services.',
}

const services = [
  { img: 'service1', alt: 'Prescription Refills', label: 'Prescription Refills' },
  { img: 'service2', alt: 'Health Consultations', label: 'Health Consultations' },
  { img: 'service3', alt: 'Over-the-Counter Products', label: 'Over-the-Counter Products' },
  { img: 'service4', alt: 'Medical Equipment', label: 'Medical Equipment' },
  { img: 'service5', alt: 'Immunizations', label: 'Immunizations' },
]

export default function AboutPage() {
  return (
    <main>
      <Hero title="About Grace Pharmacy" />

      <section className="section container">
        <p className="lead">
          At Grace Pharmacy, we believe that health is wealth, and providing top-notch care to
          our customers is at the core of what we do. Our highly qualified pharmacists and
          friendly staff work together to meet your healthcare needs with compassion,
          professionalism, and a personal touch. We offer a wide range of products and services,
          including prescription medications, over-the-counter remedies, and health
          consultations. Whether you are looking for daily vitamins or specialized medical
          equipment, we are here to support your health journey every step of the way.
        </p>
      </section>

      <section className="section section-alt container">
        <h2 className="section-title">Our Story</h2>
        <p className="lead">
          Grace Pharmacy was founded on the belief that healthcare should be both accessible and
          reliable. From our humble beginnings, we&apos;ve grown into a trusted name in the
          community by providing quality healthcare products and personalized services. Over the
          years, we have remained committed to our mission of improving the health and
          well-being of our customers, one interaction at a time. Our story is one of dedication
          to care, innovation in service, and an unwavering commitment to the people we serve.
        </p>
      </section>

      <section className="section container">
        <h2 className="section-title">Our Services</h2>
        <div className="service-grid">
          {services.map((s) => (
            <figure className="service-card" key={s.img}>
              <Image
                src={`/images/${s.img}.webp`}
                alt={s.alt}
                width={300}
                height={140}
                loading="lazy"
              />
              <figcaption>{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
