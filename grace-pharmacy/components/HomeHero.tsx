import Link from 'next/link'
import Image from 'next/image'
import { site, primaryPhone } from '@/lib/site'
import HoursList from '@/components/HoursList'

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Ha Leqele &middot; Maseru, Lesotho</span>
          <h1>
            Your prescription, <em>ready in minutes</em>.
          </h1>
          <p>
            {site.name} fills prescriptions fast, checks your blood pressure and glucose, and
            emails you before every refill so you never run out.
          </p>
          <div className="hero-actions">
            <Link href="#refill" className="btn btn-sky">
              Refill a prescription
            </Link>
            <Link href="#reminders" className="btn btn-outline">
              Get refill reminders
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <figure className="hero-figure">
            <Image
              src="/images/hh-counter.webp"
              alt="The Healing Hub Pharmacy counter, with stocked shelves behind it"
              width={686}
              height={668}
              priority
              sizes="(max-width: 900px) 100vw, 520px"
            />
          </figure>

          <div className="hero-label">
            <div className="label-row">
              <span className="label-title">Opening hours</span>
            </div>
            <HoursList fallback={<>Call <a href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a></>} />
          </div>
        </div>
      </div>
    </section>
  )
}
