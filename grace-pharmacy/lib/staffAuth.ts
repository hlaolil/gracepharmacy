import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

// Password protection for the /staff pages. The password lives in the STAFF_PASSWORD
// environment variable; a successful login sets a signed cookie that expires after
// SESSION_HOURS. Changing STAFF_PASSWORD signs everyone out.

export const STAFF_COOKIE = 'gp_staff'
const SESSION_HOURS = 12

function sign(value: string, password: string) {
  return createHmac('sha256', password).update(value).digest('hex')
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export function staffPasswordConfigured() {
  return Boolean(process.env.STAFF_PASSWORD)
}

export function checkPassword(attempt: string) {
  const password = process.env.STAFF_PASSWORD
  return Boolean(password) && safeEqual(attempt, password as string)
}

export function startStaffSession() {
  const password = process.env.STAFF_PASSWORD as string
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000
  cookies().set(STAFF_COOKIE, `${expires}.${sign(String(expires), password)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/staff',
    maxAge: SESSION_HOURS * 60 * 60,
  })
}

export function endStaffSession() {
  cookies().delete({ name: STAFF_COOKIE, path: '/staff' })
}

export function isStaff() {
  const password = process.env.STAFF_PASSWORD
  const value = cookies().get(STAFF_COOKIE)?.value
  if (!password || !value) return false
  const [expires, signature] = value.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  return safeEqual(signature, sign(expires, password))
}
