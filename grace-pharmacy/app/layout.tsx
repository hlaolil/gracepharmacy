import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = 'https://gracepharmacy.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Grace Pharmacy | Community Pharmacy in Morija, Lesotho',
    template: '%s | Grace Pharmacy',
  },
  description:
    'Grace Pharmacy is your trusted partner in health on the A2 road in Morija, Lesotho — prescription refills, health consultations, and quality pharmaceutical products.',
  keywords: ['Grace Pharmacy', 'Morija pharmacy', 'Lesotho pharmacy', 'prescription refill', 'health consultation'],
  authors: [{ name: 'Letlotlo Hlaoli' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Grace Pharmacy',
    title: 'Grace Pharmacy | Community Pharmacy in Morija, Lesotho',
    description:
      'Prescription refills, health consultations, and quality pharmaceutical products on the A2 road in Morija.',
  },
  twitter: {
    card: 'summary',
    title: 'Grace Pharmacy | Community Pharmacy in Morija, Lesotho',
    description:
      'Prescription refills, health consultations, and quality pharmaceutical products on the A2 road in Morija.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
