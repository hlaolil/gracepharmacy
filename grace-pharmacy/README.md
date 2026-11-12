# The Healing Hub Pharmacy — Next.js Site

A Next.js 14 (App Router) site for The Healing Hub Pharmacy, Ha Leqele, Maseru, Lesotho. Built from the Grace Pharmacy site (this is the `healing-hub` branch; Grace Pharmacy stays on `main`).

Features:

- **Fast online refills** — patients send their prescription number; requests are saved to a database and shown to staff at `/staff`.
- **Email refill reminders** — patients sign up on the home page (or staff enrol them at the counter), and get an email a few days before each refill is due. See [Refill reminders](#refill-reminders).
- Pages: Home, About (story + photos), What We Stock (the categories on our LeMeRA authorisation), Contact (team, map, FAQ).
- SEO: per-page metadata, sitemap, robots.txt, and `Pharmacy` structured data for Google Maps / local search.

## Before launch: details to confirm

All business details live in **`lib/site.ts`**. These are still unconfirmed:

| Detail | Now | What to do |
| --- | --- | --- |
| Opening hours | empty, so pages say "call us" | fill in `hours` |
| Public email | `null`, so no email is shown | set `email` |
| Map / directions | search for "Ha Leqele, Maseru" | swap `directionsUrl` / `mapEmbedUrl` for the exact pin |
| WhatsApp | off | set `whatsapp` to show a chat button |
| Logo | simple placeholder cross (`components/LogoMark.tsx`, `app/icon.svg`) | replace with the pharmacy's logo artwork |

Photos of the pharmacy are in `public/images/hh-*.webp`. Add staff photos there when available.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel

1. Create a new Vercel project from this repository, branch `healing-hub`, with **Root Directory** set to `grace-pharmacy`. (Or copy this folder into its own repository.)
2. **Storage → Create Database → Neon** (free plan, a region close to Lesotho). This adds `DATABASE_URL`.
3. Add the environment variables below, then redeploy.

Vercel's free Hobby plan is meant for non-commercial use; check Vercel's plan terms for a business site.

| Variable | Needed for | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | refills + reminders | Added by Vercel when Neon is connected |
| `STAFF_PASSWORD` | staff pages | Password for `/staff`; changing it signs everyone out |
| `RESEND_API_KEY` | all email | API key from [Resend](https://resend.com) |
| `EMAIL_FROM` | all email | Sender on a domain verified in Resend, e.g. `The Healing Hub Pharmacy <reminders@yourdomain.com>`. Without a verified domain, Resend only delivers to the account owner's own address. |
| `CRON_SECRET` | reminders | Any long random string; Vercel Cron sends it so only Vercel can trigger the daily run |
| `REFILL_EMAIL_TO` | optional | Where refill requests are emailed (defaults to `email` in `lib/site.ts`) |
| `NEXT_PUBLIC_SITE_URL` | optional | Public address if not `https://healinghubpharmacy.vercel.app` (used in links, sitemap and emails) |

## Refill reminders

**How it works**

- Patients sign up on the home page (`#reminders`) with their name, email, next refill date and how often they refill (every 4 weeks, 1, 2 or 3 months). They must tick a consent box. Staff can also add a patient at **`/staff/reminders`** after the patient agrees.
- Every day at 08:00 Lesotho time, Vercel Cron calls `/api/reminders/run` (schedule in `vercel.json`). Anyone whose refill is due within 3 days gets one email for that due date.
- When the patient collects, staff press **Collected today** and the next due date moves forward by their interval. If nobody presses it, the date moves on by itself once it is more than 7 days overdue, so next month's reminder still goes out.
- Staff can also change a date, pause, remove, or press **Send due reminders now**.

**Privacy**

- Emails never name the medicine (inboxes are often shared). The optional "medicine" field is a staff-only note.
- Every email has a one-click link to stop reminders. The link opens a confirmation page, and pressing the button deletes the patient's reminder record entirely.
- Refill *requests* are still deleted automatically after 30 days.

**Code**: `lib/reminders.ts` (logic and email wording), `lib/email.ts` (Resend), `lib/db.ts` (tables, created automatically), `app/api/reminders/` (sign-up and daily run), `app/staff/reminders/` (staff page), `app/reminders/unsubscribe/` (stop page), `components/ReminderSignupForm.tsx`.

## Project structure

```
grace-pharmacy/
├── app/
│   ├── page.tsx                    # Home: hero, services, refill form, reminder sign-up
│   ├── about/  products/  contact/
│   ├── api/refill/route.ts         # Refill request handler
│   ├── api/reminders/route.ts      # Reminder sign-up
│   ├── api/reminders/run/route.ts  # Daily reminder job (Vercel Cron)
│   ├── reminders/unsubscribe/      # Stop-reminders page
│   └── staff/                      # Password-protected: requests + reminders
├── components/                     # Header, Footer, forms, hero, StaffNav, HoursList
├── lib/                            # site.ts, db.ts, email.ts, reminders.ts, staffAuth.ts
├── public/images/                  # Pharmacy photos
└── vercel.json                     # Cron schedule
```
