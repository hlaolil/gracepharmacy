import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { siteUrl } from '@/lib/site'

const title = 'The Healing Hub Pharmacy | Community Pharmacy in Ha Leqele, Maseru'
const description =
  'The Healing Hub Pharmacy in Ha Leqele, Maseru — fast prescription refills, blood pressure and glucose checks, chronic-care support and free email refill reminders.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | The Healing Hub Pharmacy' },
  description,
  keywords: ['Healing Hub Pharmacy', 'Ha Leqele pharmacy', 'Maseru pharmacy', 'Lesotho pharmacy', 'prescription refill', 'refill reminder'],
  authors: [{ name: 'Letlotlo Hlaoli' }],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_US', url: siteUrl, siteName: 'The Healing Hub Pharmacy', title, description },
  twitter: { card: 'summary', title, description },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
