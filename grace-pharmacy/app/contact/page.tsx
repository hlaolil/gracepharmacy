import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Reach Grace Pharmacy in Morija, Lesotho for prescription questions, consultations, or directions. Call +266 5617 6099 or visit us on the A2 road.',
  alternates: { canonical: '/contact' },
}

const team = [
  { img: 'employee1', alt: 'Head pharmacist', name: 'Dr. Emily Tae', role: 'Head Pharmacist' },
  { img: 'employee2', alt: 'Pharmacy assistant', name: 'Joyce Morero', role: 'Pharmacy Assistant' },
  { img: 'employee3', alt: 'Medical consultant', name: 'Sarah Hlaoli', role: 'Medical Consultant' },
]

const hours = [
  ['Monday – Friday', '8:00 – 18:00'],
  ['Saturday', '8:00 – 14:00'],
  ['Sunday', 'Closed'],
]

const faqs = [
  {
    q: 'How do I refill a prescription online?',
    a: 'Use the refill form on the home page — enter your name, prescription number, and phone number. We will call if anything needs checking before it is ready.',
  },
  {
    q: 'Do I need an appointment for a consultation?',
    a: 'No. Walk in during opening hours and a pharmacist will see you, usually within a few minutes.',
  },
  {
    q: 'Can you tell me if a medication is in stock?',
    a: 'Call us at +266 5617 6099 and we will check while you are on the line.',
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="We're easy to reach"
        description="Prescription questions, consultations, or just directions — our team is ready to help."
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
                    Along A2 Road
                    <br />
                    Makotoane Complex
                    <br />
                    Morija 100, Lesotho
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:grace@pharmacy.com">grace@pharmacy.com</a></dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd><a href="tel:+26656176099">+266 5617 6099</a></dd>
                </div>
              </dl>

              <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--sage-line)' }}>
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4114.177796578349!2d27.493423676282006!3d-29.62188131181157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sls!4v1730197705329!5m2!1sen!2sls"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grace Pharmacy location"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--parchment-dim)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Meet the team</span>
            <h2>Who you&apos;ll talk to</h2>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <figure className="team-card" key={member.img}>
                <div className="team-img">
                  <Image src={`/images/${member.img}.webp`} alt={member.alt} fill style={{ objectFit: 'cover' }} loading="lazy" />
                </div>
                <div className="team-info">
                  <span className="label-tag">{member.role}</span>
                  <h3>{member.name}</h3>
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
