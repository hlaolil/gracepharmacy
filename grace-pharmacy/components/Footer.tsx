import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-text">Grace Pharmacy</span>
            <p>
              Community pharmacy on the A2 road in Morija, dispensing prescriptions, advice, and
              a bit of grace since day one.
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
              <li>Along A2 Road</li>
              <li>Makotoane Complex</li>
              <li>Morija 100, Lesotho</li>
              <li><a href="tel:+26656176099">+266 5617 6099</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Grace Pharmacy &mdash; Morija, LS</p>
          <nav className="social-links" aria-label="Social media">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Image src="/images/facebook.webp" alt="" width={16} height={16} aria-hidden="true" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Image src="/images/twitter.webp" alt="" width={16} height={16} aria-hidden="true" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Image src="/images/instagram.webp" alt="" width={16} height={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
