# Grace Pharmacy — website

The website of **Grace Pharmacy**, a community pharmacy in Morija, Lesotho. Built with Next.js 14 (App Router) and deployed on Vercel.

**Live site:** https://gracepharmacy.vercel.app

## What it has

- **Pages:** Home, About, Products and Contact, plus a staff login and refill list.
- **Online refills:** patients send their prescription number from the refill form. Requests are saved to a Postgres database (Neon) and listed for staff at `/staff`, behind a staff password.
- **Products:** the pharmacy's dispensary stock list (117 items in 5 categories), shown as a list grouped by category with no prices.
- **One place for business details:** hours, phone numbers, address and directors live in `lib/site.ts`, and the whole site reads from there.
- **SEO:** per-page metadata, a sitemap, robots.txt and `Pharmacy` structured data for local search.

## Where the code is

The app is in the [`grace-pharmacy/`](grace-pharmacy/) folder. Its [README](grace-pharmacy/README.md) covers the design, the catalogue, the project structure and how to set up the refill database.

## Run it locally

```bash
cd grace-pharmacy
npm install
npm run dev        # http://localhost:3000
```

## Deploy

Import the repository into Vercel and set **Root Directory** to `grace-pharmacy`. Add these environment variables:

| Variable | What |
| --- | --- |
| `DATABASE_URL` | Postgres connection string. Vercel adds it when you connect a Neon database |
| `STAFF_PASSWORD` | Password for the `/staff` refill list |
| `RESEND_API_KEY` | Optional. Also emails each refill request (via Resend) |
| `NEXT_PUBLIC_SITE_URL` | Optional. The public address if it isn't `https://gracepharmacy.vercel.app` |

Refill requests are deleted after 30 days. If neither the database nor email is set up, the live site tells customers that online refills are unavailable and asks them to call.

## Related

- [wdd131/project](https://hlaolil.github.io/wdd131/project/index.html): the first Grace Pharmacy site, built as my WDD 131 final project
