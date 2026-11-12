import { site } from '@/lib/site'

// Sends email through Resend (https://resend.com). Needs RESEND_API_KEY.
// EMAIL_FROM should be an address on a domain verified in Resend, e.g.
// "The Healing Hub Pharmacy <reminders@yourdomain.com>". Without it, Resend's test
// sender is used, which can only deliver to the Resend account owner's own address.

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY)
}

export interface Email {
  to: string
  subject: string
  text: string
  html?: string
  headers?: Record<string, string>
}

export async function sendEmail(email: Email): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? process.env.REFILL_EMAIL_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: email.to,
      subject: email.subject,
      text: email.text,
      ...(email.html ? { html: email.html } : {}),
      ...(email.headers ? { headers: email.headers } : {}),
    }),
  }).catch(() => null)

  if (!res?.ok) {
    console.error('[email] send failed', res?.status, await res?.text().catch(() => ''))
    return false
  }
  return true
}

export function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
