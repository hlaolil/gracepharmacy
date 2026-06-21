'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <Link href="/" className="logo" onClick={() => setOpen(false)}>
        <span className="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z" fill="#F6F1E4" />
          </svg>
        </span>
        <span className="logo-text">Grace Pharmacy</span>
      </Link>

      <button
        className="ham-button"
        aria-expanded={open}
        aria-controls="navigation"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <nav id="navigation" className={`primary-nav ${open ? 'open' : ''}`}>
        <ul>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link href="/#refill" className="btn btn-rust header-cta">
        Refill Rx
      </Link>
    </header>
  )
}
