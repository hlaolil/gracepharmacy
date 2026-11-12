import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { primaryPhone } from '@/lib/site'

export const metadata: Metadata = {
  title: 'What We Stock',
  description:
    'The Healing Hub Pharmacy is authorised by LeMeRA to supply prescription and over-the-counter medicines, herbal medicines, supplements, cosmetics and medical supplies in Ha Leqele, Maseru.',
  alternates: { canonical: '/products' },
}

// Categories follow the scope of our LeMeRA retail pharmacy authorisation.
const categories = [
  {
    tag: 'Prescription',
    title: 'Prescription medicines',
    body: 'Medicines for long-term conditions such as high blood pressure, diabetes and HIV, and short courses like antibiotics. A valid prescription is needed.',
  },
  {
    tag: 'Prescription',
    title: 'Controlled medicines',
    body: 'Dispensed only against a valid prescription, under a registered pharmacist’s supervision.',
  },
  {
    tag: 'Shelf',
    title: 'Over-the-counter medicines',
    body: 'Pain and fever relief, cold and flu, allergy, stomach and skin remedies, with advice on what to take.',
  },
  {
    tag: 'Shelf',
    title: 'Packaged herbal medicines',
    body: 'Registered, packaged herbal products. Ask a pharmacist whether they mix safely with your other medicines.',
  },
  {
    tag: 'Wellness',
    title: 'Supplements & cosmetics',
    body: 'Vitamins, minerals and everyday skin and personal care.',
  },
  {
    tag: 'Supplies',
    title: 'Medical supplies',
    body: 'First-aid items, dressings and everyday health supplies.',
  },
]

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        image="/images/hh-dispensary.webp"
        eyebrow="On the shelf"
        title="What we stock"
        description={`We are authorised to supply the categories below. Stock changes, so call ${primaryPhone.display} to check a specific item before you visit.`}
      />

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Browse by category</span>
            <h2>Our range</h2>
            <p>
              Don&apos;t see what you need? Ask us &mdash; we restock regularly and can often order
              items in.
            </p>
          </div>
          <div className="label-grid">
            {categories.map((c) => (
              <article className="label-card" key={c.title}>
                <span className="label-tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <span className="eyebrow">Not sure what you need?</span>
          <h2>Ask before you buy</h2>
          <p>Our pharmacists can recommend the right product for your symptoms &mdash; no charge for the advice.</p>
          <Link href="/contact" className="btn btn-teal">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  )
}
