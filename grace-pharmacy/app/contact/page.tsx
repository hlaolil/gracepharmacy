import type { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/Hero'

export const metadata: Metadata = {
  title: 'Contact Grace Pharmacy',
  description:
    'Reach out to Grace Pharmacy for any inquiries, prescription questions, or consultations. Our team is here to support your health and wellness journey.',
}

const team = [
  { img: 'employee1', alt: 'Pharmacist', name: 'Dr. Emily Tae', role: 'Head Pharmacist' },
  { img: 'employee2', alt: 'Pharmacy Assistant', name: 'Joyce Morero', role: 'Pharmacy Assistant' },
  { img: 'employee3', alt: 'Consultant', name: 'Sarah Hlaoli', role: 'Medical Consultant' },
]

export default function ContactPage() {
  return (
    <main>
      <Hero title="Contact Us" />

      <section className="section container">
        <p className="lead">
          We are committed to your health. Contact us for prescription refills, medical
          consultations, or any other inquiries. Our team is ready to assist you.
        </p>
      </section>

      <section className="section section-alt container">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member) => (
            <figure className="team-card" key={member.img}>
              <Image
                src={`/images/${member.img}.webp`}
                alt={member.alt}
                width={200}
                height={200}
                loading="lazy"
              />
              <figcaption>
                {member.name} &mdash; {member.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Contact Information</h2>
            <address>
              Along A2 Road
              <br />
              Makotoane Complex
              <br />
              Morija 100, Lesotho
              <br />
              <a href="mailto:grace@pharmacy.com">grace@pharmacy.com</a>
              <br />
              <a href="tel:+26656176099">+266 5617 6099</a>
            </address>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4114.177796578349!2d27.493423676282006!3d-29.62188131181157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sls!4v1730197705329!5m2!1sen!2sls"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Grace Pharmacy location"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  )
}
