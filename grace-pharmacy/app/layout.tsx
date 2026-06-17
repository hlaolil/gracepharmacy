import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Grace Pharmacy',
    template: '%s',
  },
  description:
    'Grace Pharmacy is your trusted partner in health, offering a comprehensive range of pharmaceutical products and healthcare services.',
  authors: [{ name: 'Letlotlo Hlaoli' }],
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
