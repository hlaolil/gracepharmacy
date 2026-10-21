# Grace Pharmacy — Next.js Site

A Next.js 14 (App Router) site for Grace Pharmacy, a community pharmacy in Morija, Lesotho. Built with a distinctive "apothecary label" visual identity, a working refill form, richer content, and SEO fundamentals — ready to deploy on Vercel.

## Design

The colours come from Grace Pharmacy's own flyer and logo banner (`public/images/consultation.webp`):

- **Teal** (`#1F5A6E`) — the logo banner; headers, dark sections, footer
- **Sky blue** (`#1D78B2`, light `#8FD0F2`) — the flyer background; buttons and accents
- **Mist** (`#F2F8FC`) — light page background; **navy ink** (`#16313D`) for text
- **Fraunces** (serif display) + **Inter** (body) + **JetBrains Mono** (labels, dosages, hours)

The logo (`components/LogoMark.tsx`, also `app/icon.svg` for the browser tab) is a redrawn mortar-and-pestle "Rx" mark from the flyer. The **prescription-label motif** — rounded cards with a dashed/perforated top edge — is used for the hero's opening-hours widget and the service cards.

## Business details

Opening hours, phone numbers, email, address, directions link and directors live in **`lib/site.ts`**, taken from the flyer. The header, footer, home page, contact page, structured data and refill email all read from there, so change a detail in that one file.

- **WhatsApp:** set `whatsapp` in `lib/site.ts` (e.g. `'26656176099'`) once the number is confirmed to be on WhatsApp, and a floating "WhatsApp us" button appears on every page.
- **Social media:** the footer has no social icons. Add them back with links to the pharmacy's real pages when those exist.

## Real product catalog

The Products page now reflects Grace Pharmacy's actual 2019 dispensary stock list (117 items across 5 categories), sourced from `Grace_Pharmacy_2019_Stock_Control.xlsx`. The data lives in `lib/catalog.ts` and is rendered as a categorized, jump-linkable stock list — no prices are shown, since the source file only contains wholesale/purchase costs, not retail prices.

To update the catalog later, edit `lib/catalog.ts` directly, or regenerate it from a new spreadsheet — each category is a `{ name, blurb, items, image }` object.

A companion spreadsheet, `Grace_Pharmacy_Product_Catalog.xlsx`, organizes the same 117 items with their sourced wholesale costs (where available) and notes which purchase-order sheet each cost came from — useful for internal pricing decisions, but not used directly by the website.

### Category photos

Each category section on the Products page has a representative photo (tablets, a cream tube, cough syrup, softgel capsules, a blood pressure monitor). These are **generic stock photos, not photos of Grace Pharmacy's actual products** — there's no way to get a real photo of, say, your specific stocked paracetamol without you supplying one. They're loaded directly from Pexels' CDN under Pexels' free license (pexels.com/license), with photographer credit shown in a caption on each image. No files are stored in this repo for these — they're remote URLs in `lib/catalog.ts`, so if Pexels ever takes a photo down, swap in a new URL there.

If you'd rather not use stock photos at all, set `unoptimized` aside and just delete the `<figure className="category-photo">` block in `app/products/page.tsx`, or replace `image.src` with your own photos under `public/images/`.

## What's new in this version

- **Full visual redesign** — new color system, typography, hero, service/product cards, timeline, FAQ accordion, stats strip.
- **Real product catalog** — see above.
- **Working refill form** — `components/RefillForm.tsx` now submits to a real API route (`app/api/refill/route.ts`) with server-side validation, loading state, and success/error messaging. Requests are emailed to the pharmacy — see "Refill request emails" below.
- **Richer content** — About page now has a founding story timeline; Contact page has opening hours, the directors, and an FAQ section.
- **SEO** — per-page metadata (title templates, canonical URLs, Open Graph/Twitter tags), `app/sitemap.ts`, `app/robots.ts`, and `Pharmacy` JSON-LD structured data on the home page for local search/maps.
- **Accessibility** — visible focus states, `aria-expanded`/`aria-controls` on the mobile menu, reduced-motion support, decorative images marked `aria-hidden`.

## Photos

`public/images/` holds the pharmacy's real photos: the counter (`pick-up.webp`), the testing/immunization shelf (`vaccination.webp`), supplements (`wellness.webp`), and the flyer (`consultation.webp`, used as the colour reference — not shown on the site). The home page features the counter photo; the About page has a gallery of all three. Add more real photos here as they become available. Design wireframes are in `docs/`.

## Project structure

```
grace-pharmacy/
├── app/
│   ├── layout.tsx            # Root layout, global metadata, Header/Footer
│   ├── page.tsx                # Home: hero, stats, services, refill form, CTA
│   ├── globals.css             # Design tokens + all site styles
│   ├── sitemap.ts               # Auto-generated sitemap.xml
│   ├── robots.ts                 # robots.txt rules
│   ├── icon.svg                # Browser-tab icon (logo)
│   ├── api/refill/route.ts        # Refill form submission handler
│   ├── about/page.tsx              # Story timeline, services, photo gallery
│   ├── products/page.tsx            # Real categorized stock list
│   └── contact/page.tsx               # Hours, directors, map, FAQ
├── components/
│   ├── Header.tsx              # Nav + mobile menu + Refill Rx CTA
│   ├── Footer.tsx
│   ├── LogoMark.tsx             # Mortar-and-pestle Rx logo
│   ├── WhatsAppButton.tsx        # Shown only when lib/site.ts has a WhatsApp number
│   ├── HomeHero.tsx              # Homepage hero with label widget
│   ├── PageHero.tsx                # Simple hero for inner pages
│   └── RefillForm.tsx                # Validated form wired to /api/refill
├── lib/
│   ├── catalog.ts                      # Real product catalog data (see above)
│   └── site.ts                         # Hours, phones, email, address (see above)
├── public/images/                      # Real pharmacy photos
├── docs/                               # Design wireframes
├── next.config.js
├── tsconfig.json
└── package.json
```

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel

**Option A — via GitHub (recommended)**
1. Push this folder's *contents* to the root of a GitHub repository — `package.json` should be at the repo root, not nested in a subfolder.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.

**Option B — via Vercel CLI**
```bash
npm install -g vercel
vercel
```

## Refill request emails

`app/api/refill/route.ts` validates each request and emails it to the pharmacy using [Resend](https://resend.com). Set these environment variables in Vercel (Project → Settings → Environment Variables):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from your Resend account |
| `REFILL_EMAIL_TO` | no | Where requests go — defaults to the email in `lib/site.ts` |
| `REFILL_EMAIL_FROM` | no | Sender, e.g. `Grace Pharmacy <refills@yourdomain.com>` once a domain is verified in Resend. Defaults to Resend's test sender, which can only deliver to the Resend account's own email address. |

Without `RESEND_API_KEY`, the production site tells customers online refills are unavailable and to call, instead of pretending the request went through. In development (`npm run dev`) requests are just logged.

## SEO notes

- The site's public address defaults to `https://gracepharmacy.vercel.app`. If it's hosted anywhere else (e.g. a custom domain), set `NEXT_PUBLIC_SITE_URL` — canonical URLs, Open Graph, the sitemap, robots.txt and structured data all use it.
- The home page includes `Pharmacy` schema.org JSON-LD built from `lib/site.ts` (address, phones, email, hours, map link) — useful for Google Maps/local search.
