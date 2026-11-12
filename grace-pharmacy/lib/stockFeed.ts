// Live product list from the Healing Hub stock system (the healing-hub-stock app).
//
// The stock app publishes GET /api/public/products: only items an admin has ticked
// "Show on website", with a price for over-the-counter items, no price for
// prescription-only ones, and in stock / out of stock (never the quantity).
//
// Set STOCK_API_URL to the stock app's address (e.g. https://healing-hub-stock.vercel.app).
// Without it — or if the stock app is unreachable — getStockFeed() returns null and
// the Products page falls back to the category overview.

export const FEED_REVALIDATE_SECONDS = 300

export interface FeedProduct {
  name: string
  category: string
  description: string
  prescription_only: boolean
  price: number | null
  in_stock: boolean
}

export interface StockFeed {
  currency: string
  updated: string
  categories: string[]
  products: FeedProduct[]
}

function isProduct(p: unknown): p is FeedProduct {
  if (!p || typeof p !== 'object') return false
  const o = p as Record<string, unknown>
  return (
    typeof o.name === 'string' &&
    typeof o.category === 'string' &&
    typeof o.prescription_only === 'boolean' &&
    typeof o.in_stock === 'boolean' &&
    (o.price === null || typeof o.price === 'number')
  )
}

export async function getStockFeed(): Promise<StockFeed | null> {
  const base = process.env.STOCK_API_URL
  if (!base) return null
  try {
    const res = await fetch(`${base.replace(/\/+$/, '')}/api/public/products`, {
      next: { revalidate: FEED_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const data = (await res.json()) as Partial<StockFeed>
    if (!Array.isArray(data.products)) return null
    const products = data.products.filter(isProduct).map((p) => ({
      ...p,
      description: typeof p.description === 'string' ? p.description : '',
      // A prescription item is never priced on the website, whatever the feed says.
      price: p.prescription_only ? null : p.price,
    }))
    const categories = Array.isArray(data.categories)
      ? data.categories.filter((c): c is string => typeof c === 'string')
      : []
    return { currency: data.currency ?? 'LSL', updated: data.updated ?? '', categories, products }
  } catch (err) {
    console.error('[stock feed] unavailable', err)
    return null
  }
}

export function formatMaloti(amount: number) {
  return `M${amount.toFixed(2)}`
}
