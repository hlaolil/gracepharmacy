// Single source of truth for Grace Pharmacy's business details, taken from the
// pharmacy's own flyer (public/images/consultation.webp). Every page, the footer,
// the structured data, and the refill API read from here — change a detail once.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gracepharmacy.vercel.app'

export const site = {
  name: 'Grace Pharmacy',
  tagline: 'For all your medication needs',
  regNumber: '61792',
  email: 'gracepharmacy8@gmail.com',
  phones: [
    { display: '+266 5617 6099', tel: '+26656176099' },
    { display: '+266 5883 0420', tel: '+26658830420' },
  ],
  // Set to a number in international format without "+" (e.g. '26656176099') once
  // confirmed it is on WhatsApp — the chat button only appears when this is set.
  whatsapp: null as string | null,
  address: {
    street: 'Along A2 Road, Makotoane Complex',
    lines: ['Along A2 Road', 'Makotoane Complex', 'Morija 100, Lesotho'],
    locality: 'Morija',
    postalCode: '100',
    country: 'LS',
  },
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-29.62188,27.49342',
  hours: [
    { label: 'Monday – Friday', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { label: 'Saturday', days: ['Saturday'], opens: '08:00', closes: '13:00' },
  ],
  directors: ['Daniel Mothe', 'Letlotlo Hlaoli'],
}

export const primaryPhone = site.phones[0]

// '08:00' -> '8am', '13:30' -> '1:30pm'
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
}
