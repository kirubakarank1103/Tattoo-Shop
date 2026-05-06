import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { testimonials } from '../data/testimonials';

const hours = [
  { day: 'Monday – Friday', time: '10:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 10:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 7:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <PageTransition>
      <div className="contact-page">
        {/* Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">Get in Touch</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Contact Us</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Questions, consultations, or just want to say hi — we're always happy to connect.
                  Walk in or reach out online.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <section className="section">
          <div className="container">
            <div className="contact-cards-grid">
              {[
                {
                  icon: <FiPhone size={22} />,
                  label: 'Call Us',
                  value: '+91 98765 43210',
                  sub: 'Mon–Sun 10AM–9PM',
                  href: 'tel:+919876543210',
                  color: 'var(--color-primary)',
                  id: 'contact-phone',
                },
                {
                  icon: <FaWhatsapp size={22} />,
                  label: 'WhatsApp',
                  value: '+91 98765 43210',
                  sub: 'Instant response',
                  href: 'https://wa.me/919876543210?text=Hi+INK+DYNASTY!',
                  color: '#25D366',
                  id: 'contact-whatsapp',
                },
                {
                  icon: <FiMail size={22} />,
                  label: 'Email Us',
                  value: 'hello@inkdynasty.in',
                  sub: 'Response within 24 hrs',
                  href: 'mailto:hello@inkdynasty.in',
                  color: 'var(--color-gold)',
                  id: 'contact-email',
                },
                {
                  icon: <FiMapPin size={22} />,
                  label: 'Visit Us',
                  value: '42, Anna Salai',
                  sub: 'Chennai – 600002, Tamil Nadu',
                  href: 'https://maps.google.com',
                  color: 'var(--color-primary-light)',
                  id: 'contact-address',
                },
              ].map((card) => (
                <ScrollReveal key={card.label} direction="up">
                  <motion.a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="contact-card"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    id={card.id}
                  >
                    <div className="contact-card-icon" style={{ color: card.color, background: `${card.color}18` }}>
                      {card.icon}
                    </div>
                    <div className="contact-card-label">{card.label}</div>
                    <div className="contact-card-value">{card.value}</div>
                    <div className="contact-card-sub">{card.sub}</div>
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Map + Form */}
        <section className="section section-bg-alt">
          <div className="container">
            <div className="contact-main-grid">
              {/* Map & Info */}
              <ScrollReveal direction="left">
                <div className="contact-left">
                  <div className="map-embed">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.823766965789!2d80.27075731482216!3d13.052956790793617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sAnna%20Salai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: 'var(--radius-lg)', filter: 'brightness(0.85) contrast(1.1) saturate(0.8)' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="INK DYNASTY Location"
                    />
                  </div>

                  {/* Hours */}
                  <div className="hours-card">
                    <h3 className="hours-title">
                      <FiClock style={{ color: 'var(--color-primary)' }} /> Studio Hours
                    </h3>
                    {hours.map((h) => (
                      <div key={h.day} className="hours-row">
                        <span>{h.day}</span>
                        <span className="hours-time">{h.time}</span>
                      </div>
                    ))}
                    <div className="hours-note">
                      💡 Last appointment 1 hour before closing.
                    </div>
                  </div>

                  {/* Social */}
                  <div className="social-follow-card">
                    <h4>Follow Our Work</h4>
                    <p>See daily tattoo updates, artist stories, and behind-the-scenes content.</p>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ gap: 8 }}
                      id="follow-instagram"
                    >
                      <FiInstagram style={{ color: '#E1306C' }} /> Follow @inkdynasty_chennai
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact Form */}
              <ScrollReveal direction="right">
                {!sent ? (
                  <div className="contact-form-card">
                    <h3 className="contact-form-title">Send a Message</h3>
                    <p className="contact-form-sub">Have a question or want a consultation? We'll get back to you within 24 hours.</p>
                    <div className="contact-form-fields">
                      <div className="contact-form-row">
                        <div className="form-group">
                          <label className="form-label">Your Name</label>
                          <input className="form-input" placeholder="Full name" value={form.name} onChange={(e) => update('name', e.target.value)} id="contact-name" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input className="form-input" placeholder="+91..." value={form.phone} onChange={(e) => update('phone', e.target.value)} id="contact-phone-field" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} id="contact-email-field" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <select className="form-select" value={form.subject} onChange={(e) => update('subject', e.target.value)} id="contact-subject">
                          <option value="">Select a topic...</option>
                          <option>Booking Inquiry</option>
                          <option>Design Consultation</option>
                          <option>Pricing Question</option>
                          <option>Aftercare Support</option>
                          <option>Touch-Up Request</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="form-textarea" style={{ minHeight: 140 }} placeholder="Tell us about your tattoo idea or question..." value={form.message} onChange={(e) => update('message', e.target.value)} id="contact-message" />
                      </div>
                      <button
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => setSent(true)}
                        id="contact-submit"
                      >
                        <FiSend /> Send Message
                      </button>

                      <div className="contact-or-divider">
                        <span>or</span>
                      </div>

                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ width: '100%', justifyContent: 'center' }}
                        id="whatsapp-contact"
                      >
                        <FaWhatsapp style={{ color: '#25D366', fontSize: '1.1rem' }} />
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    className="contact-form-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16, padding: '60px 36px' }}
                  >
                    <div style={{ fontSize: '3.5rem' }}>💌</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                      Thanks <strong>{form.name}</strong>! We've received your message and will reply within 24 hours via email or WhatsApp.
                    </p>
                    <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Testimonials mini section */}
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="tag-label">Client Love</span>
                <div className="divider divider-center" />
                <h2 className="section-title">What Our Clients Say</h2>
              </div>
            </ScrollReveal>
            <div className="testimonials-mini-grid">
              {testimonials.slice(3, 6).map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 0.1} direction="up">
                  <div className="testimonial-card card" style={{ padding: 24 }}>
                    <div className="testimonial-top">
                      <div className="stars" style={{ fontSize: '0.75rem' }}>
                        {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: 'var(--color-gold)' }}>★</span>)}
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{t.style}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>"{t.review.substring(0, 160)}..."</p>
                    <div className="testimonial-author">
                      <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                      <div>
                        <div className="testimonial-name" style={{ fontSize: '0.88rem' }}>{t.name}</div>
                        <div className="testimonial-meta">{t.piece} · {t.date}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        .contact-page { min-height: 100vh; }

        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .contact-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-decoration: none;
          color: var(--color-text);
          transition: border-color 0.3s;
        }

        .contact-card:hover {
          border-color: rgba(255,61,0,0.3);
        }

        .contact-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .contact-card-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .contact-card-value {
          font-weight: 700;
          font-size: 1rem;
        }

        .contact-card-sub {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        /* Main grid */
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: start;
        }

        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hours-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hours-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--color-border);
          font-size: 0.88rem;
        }

        .hours-row:last-of-type { border-bottom: none; }

        .hours-time {
          font-weight: 600;
          color: var(--color-text);
        }

        .hours-note {
          margin-top: 12px;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .social-follow-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .social-follow-card h4 {
          font-size: 1rem;
          font-weight: 700;
        }

        .social-follow-card p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        /* Form */
        .contact-form-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 36px;
        }

        .contact-form-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: 6px;
        }

        .contact-form-sub {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-bottom: 28px;
        }

        .contact-form-fields {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .contact-or-divider {
          text-align: center;
          position: relative;
          color: var(--color-text-dim);
          font-size: 0.82rem;
        }

        .contact-or-divider::before,
        .contact-or-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 44%;
          height: 1px;
          background: var(--color-border);
        }

        .contact-or-divider::before { left: 0; }
        .contact-or-divider::after { right: 0; }

        /* Testimonials mini */
        .testimonials-mini-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .testimonial-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
        }

        .testimonial-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--color-primary);
        }

        .testimonial-name {
          font-weight: 600;
          font-size: 0.88rem;
        }

        .testimonial-meta {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 1024px) {
          .contact-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .contact-main-grid { grid-template-columns: 1fr; }
          .testimonials-mini-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .contact-cards-grid { grid-template-columns: 1fr 1fr; }
          .contact-form-card { padding: 24px; }
          .contact-form-row { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .contact-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  );
}
