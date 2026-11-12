import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { primaryPhone } from '@/lib/site'
import { FEED_REVALIDATE_SECONDS, formatMaloti, getStockFeed, type FeedProduct } from '@/lib/stockFeed'

export const metadata: Metadata = {
  title: 'What We Stock',
  description:
    'Products and prices at The Healing Hub Pharmacy, Ha Leqele, Maseru — over-the-counter medicines, herbal medicines, supplements, cosmetics and medical supplies, plus prescription medicines.',
  alternates: { canonical: '/products' },
}

// Rebuilt at most every five minutes, so prices and stock follow the till.
export const revalidate = FEED_REVALIDATE_SECONDS

// Shown when the stock system is not connected (or not reachable). They follow
// the scope of our LeMeRA retail pharmacy authorisation.
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

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default async function ProductsPage() {
  const feed = await getStockFeed()
  const products = feed?.products ?? []

  if (!feed || products.length === 0) {
    return <CategoryOverview />
  }

  // Group in the stock system's category order; anything unexpected goes last.
  const order = [...feed.categories, ...products.map((p) => p.category)]
  const groups = Array.from(new Set(order))
    .map((name) => ({ name, items: products.filter((p) => p.category === name) }))
    .filter((g) => g.items.length > 0)
  const inStock = products.filter((p) => p.in_stock).length

  return (
    <main>
      <PageHero
        image="/images/hh-dispensary.webp"
        eyebrow="On the shelf"
        title="What we stock"
        description={`${products.length} products, ${inStock} in stock right now. Prices and stock come straight from our till and are updated every few minutes.`}
      />

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Browse by category</span>
            <h2>Our range</h2>
            <p>
              Prescription medicines are listed without prices: what you pay depends on your
              prescription and medical aid. Call {primaryPhone.display} to check anything before you visit.
            </p>
          </div>
          <div className="category-jump">
            {groups.map((g) => (
              <a key={g.name} href={`#${slugify(g.name)}`}>
                {g.name}
                <span className="category-jump-count">{g.items.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {groups.map((g, i) => (
        <section
          key={g.name}
          id={slugify(g.name)}
          className="section section-tight"
          style={{ background: i % 2 === 0 ? 'var(--mist-dim)' : 'var(--white)' }}
        >
          <div className="container">
            <div className="category-block-head">
              <span className="eyebrow">{g.items.length} products</span>
              <h2>{g.name}</h2>
            </div>
            <ul className="stock-grid">
              {g.items.map((p) => (
                <ProductChip key={p.name} product={p} />
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
          <Link href="/contact" className="btn btn-teal">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  )
}

function ProductChip({ product: p }: { product: FeedProduct }) {
  return (
    <li className={`stock-chip product-chip${p.in_stock ? '' : ' is-out'}`}>
      <span className="product-name">{p.name}</span>
      {p.description && <span className="product-desc">{p.description}</span>}
      <span className="product-meta">
        <span className="product-price">
          {p.prescription_only ? 'Prescription only' : p.price !== null ? formatMaloti(p.price) : 'Ask for price'}
        </span>
        <span className={`product-stock ${p.in_stock ? 'in' : 'out'}`}>{p.in_stock ? 'In stock' : 'Out of stock'}</span>
      </span>
    </li>
  )
}

function CategoryOverview() {
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
