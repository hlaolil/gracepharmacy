import Link from 'next/link'
import Image from 'next/image'
import { site, primaryPhone, formatTime } from '@/lib/site'

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Morija, Lesotho &middot; Along the A2 road</span>
          <h1>
            Your prescription, <em>filled with care</em>.
          </h1>
          <p>
            Grace Pharmacy is your local pharmacy in Makotoane Complex &mdash; prescriptions,
            advice, and everyday health, from people who know your name.
          </p>
          <div className="hero-actions">
            <Link href="#refill" className="btn btn-sky">
              Refill a prescription
            </Link>
            <a href={`tel:${primaryPhone.tel}`} className="btn btn-outline">
              Call {primaryPhone.display}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <figure className="hero-figure">
            <Image
              src="/images/pick-up.webp"
              alt="The Grace Pharmacy counter, with shelves of medicines behind it"
              width={794}
              height={579}
              priority
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </figure>

          <div className="hero-label">
            <div className="label-row">
              <span className="label-title">Opening hours</span>
            </div>
            <dl>
              {site.hours.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{formatTime(h.opens)} &ndash; {formatTime(h.closes)}</dd>
                </div>
              ))}
              <div>
                <dt>Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
