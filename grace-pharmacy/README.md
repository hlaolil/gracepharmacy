# Grace Pharmacy — Next.js Site

A Next.js (App Router) rebuild of the Grace Pharmacy static site, ready to deploy on Vercel.

## What changed from the original HTML site

- Converted to Next.js 14 App Router with TypeScript.
- Shared `Header` and `Footer` are now single React components rendered once in `app/layout.tsx`, instead of being copy-pasted into every page.
- The hamburger menu and active nav-link highlighting are handled with React state (`components/Header.tsx`) instead of vanilla JS.
- The prescription refill form (`components/RefillForm.tsx`) does the same validation as the original `pattern` attributes, but in React with inline error messages.
- All `images/*.webp` references now live in `public/images/` and are served by `next/image`.
- Per-page `<title>` and meta description tags are set via each page's `metadata` export.

## ⚠️ Placeholder images

No image assets were included in the files you uploaded — only the HTML. So this project ships with **generated placeholder `.webp` images** (solid color blocks with labels) in `public/images/` so the site builds and runs correctly out of the box.

**Before going live, replace these with your real photos**, keeping the same filenames (or update the references in the page files):

- `pharmacy-logo.webp`, `pharmacy-hero.webp`, `pharmacy-hero-large.webp`
- `service1.webp` – `service5.webp`
- `product1.webp` – `product4.webp`
- `employee1.webp` – `employee3.webp`
- `facebook.webp`, `twitter.webp`, `instagram.webp`

## Project structure

```
grace-pharmacy/
├── app/
│   ├── layout.tsx          # Root layout: <Header>, <Footer>, global CSS
│   ├── page.tsx             # Home page (hero, refill form, CTA)
│   ├── globals.css          # All site styles (ported from the original CSS plan)
│   ├── about/page.tsx
│   ├── products/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Header.tsx            # Nav + mobile hamburger menu
│   ├── Footer.tsx
│   ├── Hero.tsx               # Reusable hero banner
│   └── RefillForm.tsx          # Prescription refill form with validation
├── public/images/             # Static images (placeholders — see above)
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
1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.

**Option B — via Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts; Vercel will build and give you a live URL.

## Notes

- The contact page's Google Maps embed and the social links point to the same URLs as the original site — update them if needed.
- The refill form currently only validates and shows a confirmation message client-side; it does not submit anywhere. Wire it up to an API route (`app/api/refill/route.ts`) or a third-party form service when you're ready to actually receive submissions.
