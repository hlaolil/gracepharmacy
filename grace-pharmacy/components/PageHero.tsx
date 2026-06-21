interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
}

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="hero">
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
