import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import { site, primaryPhone, formatTime } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Reach The Healing Hub Pharmacy in Ha Leqele, Maseru for prescription questions, health checks or directions. Call ${primaryPhone.display}.`,
  alternates: { canonical: '/contact' },
}

const hours: string[][] = site.hours.length
  ? [...site.hours.map((h) => [h.label, `${formatTime(h.opens)} – ${formatTime(h.closes)}`])]
  : [['Opening hours', `Call ${primaryPhone.display}`]]

const initials = (name: string) => name.split(' ').map((w) => w[0]).join('')

const faqs = [
  {
    q: 'How do I refill a prescription online?',
    a: 'Use the refill form on the home page — enter your name, prescription number and phone number. We will call if anything needs checking before it is ready.',
  },
  {
    q: 'How do the email refill reminders work?',
    a: 'Sign up on the home page with your email address and the date your next refill is due. We email you a few days before, every time. The emails never name your medicine, and each one has a link to stop them.',
  },
  {
    q: 'Can I get my blood pressure or sugar checked?',
    a: 'Yes. Ask at the counter for a blood pressure or glucose check, and a pharmacist will explain what your numbers mean.',
  },
  {
    q: 'Can you tell me if a medicine is in stock?',
    a: `Call us on ${primaryPhone.display} and we will check while you are on the line.`,
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        image="/images/hh-counter.webp"
        eyebrow="Contact"
        title="We're easy to reach"
        description="Prescription questions, health checks, or just directions — our team is ready to help."
      />

      <section className="section section-white">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <span className="eyebrow">Visit or call</span>
              <dl>
                <div>
                  <dt>Address</dt>
                  <dd>
                    {site.address.lines.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                    <br />
                    <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sky-deep)', fontWeight: 600 }}>
                      Get directions &rarr;
                    </a>
                  </dd>
                </div>
                {site.email && (
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
                  </div>
                )}
                <div>
                  <dt>Phone</dt>
                  <dd>
                    {site.phones.map((p, i) => (
                      <span key={p.tel}>
                        {i > 0 && <br />}
                        <a href={`tel:${p.tel}`}>{p.display}</a>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--line)' }}>
                <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>Opening hours</span>
                <table className="hours-table">
                  <tbody>
                    {hours.map((row) => (
                      <tr key={row[0]}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="map-frame">
              <iframe
                src={site.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${site.name} location`}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--mist-dim)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Who we are</span>
            <h2>The people behind the counter</h2>
          </div>
          <div className="team-grid">
            {site.team.map((person) => (
              <figure className="team-card" key={person.name}>
                <div className="team-initials" aria-hidden="true">{initials(person.name)}</div>
                <div className="team-info">
                  <span className="label-tag">{person.role}</span>
                  <h3>{person.name}</h3>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Quick answers</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>
                  {f.q}
                  <span className="faq-icon" aria-hidden="true">+</span>
                </summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
