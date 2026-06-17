import Image from 'next/image'

interface HeroProps {
  title?: string
  subtitle?: string
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="hero">
      <Image
        src="/images/pharmacy-hero.webp"
        alt="Pharmacy Services"
        fill
        priority
        style={{ objectFit: 'cover' }}
        sizes="100vw"
      />
      {(title || subtitle) && (
        <div className="hero-content">
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
    </section>
  )
}
