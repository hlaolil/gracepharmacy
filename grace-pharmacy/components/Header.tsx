'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoMark from '@/components/LogoMark'
import { site } from '@/lib/site'

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
        <LogoMark className="logo-mark" />
        <span className="logo-words">
          <span className="logo-text">{site.name}</span>
          <span className="logo-tagline">{site.tagline}</span>
        </span>
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

      <Link href="/#refill" className="btn btn-sky header-cta">
        Refill Rx
      </Link>
    </header>
  )
}
