import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import { catalog } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Products',
  description:
    "Grace Pharmacy's full dispensary stock list — tablets, topicals, syrups, and supplies we carry in Morija.",
  alternates: { canonical: '/products' },
}

const totalItems = catalog.reduce((sum, c) => sum + c.items.length, 0)

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="On the shelf"
        title="What we stock"
        description={`Our dispensary carries ${totalItems} medicines and supplies across ${catalog.length} categories. This is our real stock list — call ahead to confirm current availability before you visit.`}
      />

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Browse by category</span>
            <h2>Full stock list</h2>
            <p>
              Tap a category to jump straight to it. Don&apos;t see what you need? Ask us &mdash;
              we restock regularly and can often order items in.
            </p>
          </div>

          <div className="category-jump">
            {catalog.map((cat) => (
              <a key={cat.name} href={`#${slugify(cat.name)}`}>
                {cat.name}
                <span className="category-jump-count">{cat.items.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {catalog.map((cat, i) => (
        <section
          key={cat.name}
          id={slugify(cat.name)}
          className="section section-tight"
          style={{ background: i % 2 === 0 ? 'var(--parchment-dim)' : 'var(--white)' }}
        >
          <div className="container">
            <div className="category-block-head category-block-head--with-image">
              <div>
                <span className="eyebrow">{cat.items.length} items</span>
                <h2>{cat.name}</h2>
                <p className="category-blurb">{cat.blurb}</p>
              </div>
              <figure className="category-photo">
                <Image
                  src={cat.image.src}
                  alt={cat.image.alt}
                  width={400}
                  height={280}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  unoptimized
                />
                <figcaption>
                  Photo:{' '}
                  <a href={cat.image.creditUrl} target="_blank" rel="noopener noreferrer">
                    {cat.image.credit}
                  </a>{' '}
                  / Pexels
                </figcaption>
              </figure>
            </div>
            <ul className="stock-grid">
              {cat.items.map((item) => (
                <li key={item} className="stock-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="cta-banner">
        <div className="container">
          <span className="eyebrow">Not sure what you need?</span>
          <h2>Ask before you buy</h2>
          <p>Our pharmacists can recommend the right product for your symptoms &mdash; no charge for the advice.</p>
          <Link href="/contact" className="btn btn-pine">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  )
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
