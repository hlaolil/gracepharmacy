import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>&copy; {year} Grace Pharmacy &mdash; Morija, LS</p>
        <nav className="social-links" aria-label="Social media">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <Image src="/images/facebook.webp" alt="Facebook" width={18} height={18} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <Image src="/images/twitter.webp" alt="Twitter" width={18} height={18} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <Image src="/images/instagram.webp" alt="Instagram" width={18} height={18} />
          </a>
        </nav>
      </div>
    </footer>
  )
}
