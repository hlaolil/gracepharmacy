// Single source of truth for The Healing Hub Pharmacy's business details. Every page,
// the footer, the structured data, the refill API and the reminder emails read from
// here — change a detail once.
//
// TODO before launch: confirm the email address, opening hours and map location below.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healinghubpharmacy.vercel.app'

export interface OpeningHours {
  label: string
  days: string[]
  opens: string
  closes: string
}

export const site = {
  name: 'The Healing Hub Pharmacy',
  shortName: 'Healing Hub',
  tagline: 'Fast refills, lasting care',
  // Certificate of Incorporation, 22 January 2025
  regNumber: '93656',
  // Public contact email. Leave null until the pharmacy has an address it checks —
  // the email link is hidden everywhere while this is null.
  email: null as string | null,
  phones: [{ display: '+266 5617 6099', tel: '+26656176099' }],
  // Set to a number in international format without "+" (e.g. '26656176099') once
  // confirmed it is on WhatsApp — the chat button only appears when this is set.
  whatsapp: null as string | null,
  address: {
    street: 'Ha Leqele',
    lines: ['Ha Leqele', 'Maseru, Lesotho'],
    locality: 'Maseru',
    postalCode: '100',
    country: 'LS',
  },
  // Search link for now; swap for exact coordinates once confirmed.
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Ha+Leqele+Maseru+Lesotho',
  mapEmbedUrl: 'https://www.google.com/maps?q=Ha+Leqele,+Maseru,+Lesotho&output=embed',
  // Leave empty until confirmed: pages then say "call us for opening hours" instead
  // of showing times that might be wrong.
  hours: [] as OpeningHours[],
  team: [
    { name: 'Letlotlo Hlaoli', role: 'Chief Pharmacist & Founder' },
    { name: 'Nthabiseng Mphutlane', role: 'Operations Manager & Founder' },
    { name: 'Thabo Mohapi', role: 'Pharmacist, Technical In-Charge' },
  ],
}

export const primaryPhone = site.phones[0]

// '08:00' -> '8am', '13:30' -> '1:30pm'
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
}
