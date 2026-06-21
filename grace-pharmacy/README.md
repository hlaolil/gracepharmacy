# Grace Pharmacy — Next.js Site

A Next.js 14 (App Router) site for Grace Pharmacy, a community pharmacy in Morija, Lesotho. Built with a distinctive "apothecary label" visual identity, a working refill form, richer content, and SEO fundamentals — ready to deploy on Vercel.

## Design

The site moves away from generic medical blue/teal toward an apothecary palette inspired by prescription labels and pharmacy stock:

- **Pine green** (`#1F3D2B`) — primary, grounded and herbal rather than clinical
- **Parchment** (`#F6F1E4`) — warm background, like label stock
- **Rust** (`#C65D3B`) — accent for calls to action
- **Fraunces** (serif display) + **Inter** (body) + **JetBrains Mono** (labels, dosages, hours)

The signature element is the **prescription-label motif**: rounded cards with a dashed/perforated top edge, used for the hero's opening-hours widget and throughout the services and product layouts.

## What's new in this version

- **Full visual redesign** — new color system, typography, hero, service/product cards, timeline, FAQ accordion, stats strip.
- **Working refill form** — `components/RefillForm.tsx` now submits to a real API route (`app/api/refill/route.ts`) with server-side validation, loading state, and success/error messaging. Currently the route logs submissions server-side; see "Wiring up real submissions" below to connect it to email, SMS, or a database.
- **Richer content** — About page now has a founding story timeline; Contact page has opening hours, a team grid, and an FAQ section; Products page splits featured items from a full price table.
- **SEO** — per-page metadata (title templates, canonical URLs, Open Graph/Twitter tags), `app/sitemap.ts`, `app/robots.ts`, and `Pharmacy` JSON-LD structured data on the home page for local search/maps.
- **Accessibility** — visible focus states, `aria-expanded`/`aria-controls` on the mobile menu, reduced-motion support, decorative images marked `aria-hidden`.

## ⚠️ Placeholder images

No real photos were provided, so `public/images/` contains **generated placeholder `.webp` images** in the new color palette (solid blocks with labels) so the site builds and looks coherent out of the box.

**Before going live, replace these with real photos**, keeping the same filenames (or update the references in the page files):

- `pharmacy-logo.webp`, `pharmacy-hero.webp`, `pharmacy-hero-large.webp` *(hero is currently a CSS gradient, not an image — see below)*
- `service1.webp` – `service5.webp`
- `product1.webp` – `product4.webp`
- `employee1.webp` – `employee3.webp`
- `facebook.webp`, `twitter.webp`, `instagram.webp`

> Note: the homepage hero no longer uses `pharmacy-hero.webp` as a background photo — it's now a solid pine-green panel with the prescription-label graphic, by design. The image files are kept in case you want to reintroduce a photographic hero later.

## Project structure

```
grace-pharmacy/
├── app/
│   ├── layout.tsx            # Root layout, global metadata, Header/Footer
│   ├── page.tsx                # Home: hero, stats, services, refill form, CTA
│   ├── globals.css             # Design tokens + all site styles
│   ├── sitemap.ts               # Auto-generated sitemap.xml
│   ├── robots.ts                 # robots.txt rules
│   ├── favicon.ico
│   ├── api/refill/route.ts        # Refill form submission handler
│   ├── about/page.tsx              # Story timeline + services
│   ├── products/page.tsx            # Featured products + price table
│   └── contact/page.tsx               # Hours, team, map, FAQ
├── components/
│   ├── Header.tsx              # Nav + mobile menu + Refill Rx CTA
│   ├── Footer.tsx
│   ├── HomeHero.tsx              # Homepage hero with label widget
│   ├── PageHero.tsx                # Simple hero for inner pages
│   └── RefillForm.tsx                # Validated form wired to /api/refill
├── public/images/                      # Static images (placeholders — see above)
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

## Wiring up real refill submissions

`app/api/refill/route.ts` validates submissions and currently just logs them server-side. To actually receive them, add one of:

- **Email**: send via [Resend](https://resend.com) or similar from inside the route handler.
- **SMS**: notify the pharmacist via Twilio.
- **Database**: store in Vercel Postgres, Supabase, or another database, and build a simple internal view to see pending refills.

## SEO notes

- `app/layout.tsx` sets `metadataBase` to `https://gracepharmacy.vercel.app` — update this if you use a custom domain, since it's used to build canonical and Open Graph URLs.
- The home page includes `Pharmacy` schema.org JSON-LD with address, phone, and opening hours — useful for Google Maps/local search. Update the address/hours there if they change.
