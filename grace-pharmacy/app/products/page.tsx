import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Products',
  description:
    "Explore Grace Pharmacy's range of health and wellness products — pain relief, cold and flu remedies, vitamins, and home health devices.",
  alternates: { canonical: '/products' },
}

const products = [
  {
    img: 'product1',
    alt: 'Pain relief medication',
    tag: 'Dispensary & OTC',
    name: 'Pain Relief Medication',
    desc: 'Effective relief from headaches, muscle aches, and joint pain. Available in both prescription and over-the-counter options.',
    specs: ['200mg tablets', '$15 / pack', '20 tablets / pack'],
  },
  {
    img: 'product2',
    alt: 'Cold and flu relief',
    tag: 'OTC',
    name: 'Cold & Flu Relief',
    desc: 'Stay on top of your cold symptoms with our fast-acting cold and flu remedy, providing relief from congestion and fever.',
    specs: ['500mg capsules', '$12 / pack', '10 capsules / pack'],
  },
  {
    img: 'product3',
    alt: 'Vitamins and supplements',
    tag: 'Wellness',
    name: 'Vitamins & Supplements',
    desc: 'Boost your immunity and health with our range of vitamins, including Vitamin C, D, and multivitamins.',
    specs: ['Capsules & gummies', '$10 / bottle', '30 servings / bottle'],
  },
  {
    img: 'product4',
    alt: 'Blood pressure monitor',
    tag: 'Home device',
    name: 'Blood Pressure Monitor',
    desc: 'Track your health with ease using our reliable, easy-to-use blood pressure monitor for home use.',
    specs: ['Digital, battery-operated', '$50', 'Monitor + batteries + case'],
  },
]

const tableRows = [
  ['Pain Relief Medication', '200mg tablets', '$15', '20 tablets per pack'],
  ['Cold & Flu Relief', '500mg capsules', '$12', '10 capsules per pack'],
  ['Vitamins & Supplements', 'Capsules and gummies', '$10', '30 servings per bottle'],
  ['Blood Pressure Monitor', 'Digital', '$50', 'Monitor, batteries, case'],
  ['Antibiotic Ointment', 'Topical cream', '$8', '15g tube'],
  ['Allergy Relief', '10mg tablets', '$10', '14 tablets per pack'],
]

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="On the shelf"
        title="Everything you need for everyday health"
        description="From dispensary medication to the things you grab on your way out — stocked, explained, and ready when you are."
      />

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Featured</span>
            <h2>Popular products</h2>
          </div>
          <div className="product-list">
            {products.map((p) => (
              <article className="product-card" key={p.img}>
                <div className="product-media">
                  <Image src={`/images/${p.img}.webp`} alt={p.alt} fill style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <div className="product-body">
                  <span className="label-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="product-specs">
                    {p.specs.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--parchment-dim)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Full list</span>
            <h2>Available products</h2>
            <p>Prices shown are guideline retail prices — ask in-store for current stock and insurance coverage.</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Dosage / Type</th>
                  <th>Price</th>
                  <th>Includes</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <span className="eyebrow">Not sure what you need?</span>
          <h2>Ask before you buy</h2>
          <p>Our pharmacists can recommend the right product for your symptoms — no charge for the advice.</p>
          <Link href="/contact" className="btn btn-pine">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  )
}
