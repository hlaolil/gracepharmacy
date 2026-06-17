import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: 'Products | Grace Pharmacy',
  description:
    "Explore Grace Pharmacy's extensive range of health and wellness products. From prescription medicines to over-the-counter remedies, we provide quality care for you and your family.",
}

const products = [
  {
    img: 'product1',
    alt: 'Pain Relief Medication',
    name: 'Pain Relief Medication',
    desc: 'Effective relief from headaches, muscle aches, and joint pain. Available in both prescription and over-the-counter options.',
    tags: ['Dosage: 200mg tablets', 'Price: $15 per pack', '20 tablets per pack'],
  },
  {
    img: 'product2',
    alt: 'Cold & Flu Relief',
    name: 'Cold & Flu Relief',
    desc: 'Stay on top of your cold symptoms with our fast-acting cold and flu remedy, providing relief from congestion and fever.',
    tags: ['Dosage: 500mg capsules', 'Price: $12 per pack', '10 capsules per pack'],
  },
  {
    img: 'product3',
    alt: 'Vitamins & Supplements',
    name: 'Vitamins & Supplements',
    desc: 'Boost your immunity and health with our range of vitamins, including Vitamin C, D, and multivitamins.',
    tags: ['Capsules and gummies', 'Price: $10 per bottle', '30 servings per bottle'],
  },
  {
    img: 'product4',
    alt: 'Blood Pressure Monitor',
    name: 'Blood Pressure Monitor',
    desc: 'Track your health with ease using our reliable, easy-to-use blood pressure monitor for home use.',
    tags: ['Digital, battery-operated', 'Price: $50', 'Monitor, batteries, case'],
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
      <Hero title="Explore Our Health Products" />

      <section className="cta-banner">
        <h2>Find Everything You Need</h2>
        <p>For more information on any product, reach out to our team.</p>
        <Link href="/contact" className="btn btn-white">
          Contact Us
        </Link>
      </section>

      <section className="section container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-list">
          {products.map((p) => (
            <article className="product-card" key={p.img}>
              <Image src={`/images/${p.img}.webp`} alt={p.alt} width={300} height={160} loading="lazy" />
              <div className="product-info">
                <h2>{p.name}</h2>
                <p>{p.desc}</p>
                <ul>
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-alt container product-table">
        <h2 className="section-title">Available Products</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Dosage/Type</th>
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
      </section>
    </main>
  )
}
