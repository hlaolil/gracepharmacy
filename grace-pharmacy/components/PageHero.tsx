import Image from 'next/image'

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  // Decorative background photo from /public, shown under a teal overlay
  image?: string
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="hero">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="hero-photo" />
          <div className="hero-photo-overlay" aria-hidden="true" />
        </>
      )}
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'left', paddingBottom: '3.5rem' }}>
        <div className="hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)' }}>{title}</h1>
          {description && <p style={{ maxWidth: '560px' }}>{description}</p>}
        </div>
      </div>
    </section>
  )
}
