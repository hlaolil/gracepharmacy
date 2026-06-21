import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Morija, Lesotho &middot; Est. community pharmacy</span>
          <h1>
            Your prescription, <em>filled with care</em>.
          </h1>
          <p>
            Grace Pharmacy is the corner chemist for the A2 road &mdash; prescriptions,
            consultations, and everyday health, handled by people who know your name.
          </p>
          <div className="hero-actions">
            <Link href="#refill" className="btn btn-rust">
              Refill a prescription
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Find us
            </Link>
          </div>
        </div>

        <div className="hero-label" aria-hidden="true">
          <div className="label-row">
            <span className="label-title">Grace Pharmacy</span>
            <span className="label-tag">Rx Label</span>
          </div>
          <dl>
            <dt>Open</dt>
            <dd>Mon&ndash;Sat, 8am&ndash;6pm</dd>
            <dt>Pharmacist</dt>
            <dd>On site, every day we&apos;re open</dd>
            <dt>Location</dt>
            <dd>Makotoane Complex, A2 Road</dd>
            <dt>Refills</dt>
            <dd>Online or in person</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
