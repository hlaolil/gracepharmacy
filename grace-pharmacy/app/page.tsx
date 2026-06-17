import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import RefillForm from '@/components/RefillForm'

export const metadata: Metadata = {
  title: 'Grace Pharmacy | Home',
  description:
    'Grace Pharmacy – Your trusted pharmacy for prescription refills, health consultations, and wellness products.',
}

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Welcome to Grace Pharmacy"
        subtitle="Your trusted partner in health, right here in Morija."
      />

      <section className="section container">
        <h2 className="section-title">Refill Your Prescription Online</h2>
        <p className="lead" style={{ marginBottom: '2rem' }}>
          Save time — submit your refill request below and we&apos;ll have it ready for pickup.
        </p>
        <RefillForm />
      </section>

      <section className="cta-banner">
        <h2>Need a Health Consultation?</h2>
        <p>Our pharmacists are here to assist you with any health-related questions.</p>
        <Link href="/products" className="btn btn-white">
          Explore Products &amp; Services
        </Link>
      </section>
    </main>
  )
}
