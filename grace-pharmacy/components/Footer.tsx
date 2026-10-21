import Link from 'next/link'
import LogoMark from '@/components/LogoMark'
import { site, formatTime } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <LogoMark className="logo-mark" />
              <span className="logo-text">{site.name}</span>
            </div>
            <p>
              Community pharmacy on the A2 road in Morija &mdash; {site.tagline.toLowerCase()}.
            </p>
          </div>

          <div className="footer-col">
            <h4>Site</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <ul>
              {site.address.lines.map((line) => <li key={line}>{line}</li>)}
              <li><a href={site.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions &rarr;</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              {site.phones.map((p) => (
                <li key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></li>
              ))}
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              {site.hours.map((h) => (
                <li key={h.label}>{h.label}: {formatTime(h.opens)}&ndash;{formatTime(h.closes)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} {site.name} &mdash; Morija, Lesotho &middot; Reg. No. {site.regNumber}</p>
        </div>
      </div>
    </footer>
  )
}
