import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInstagram, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { GiInkSwirl } from 'react-icons/gi';

const footerLinks = [
  {
    title: 'Studio',
    links: [
      { label: 'Home', path: '/' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Our Artists', path: '/artists' },
      { label: 'About Us', path: '/' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Book Appointment', path: '/booking' },
      { label: 'Pricing & Estimates', path: '/pricing' },
      { label: 'Aftercare Guide', path: '/aftercare' },
      { label: 'Offers & Discounts', path: '/offers' },
    ],
  },
  {
    title: 'Styles',
    links: [
      { label: 'Realism & Portrait', path: '/portfolio' },
      { label: 'Tribal & Geometric', path: '/portfolio' },
      { label: 'Watercolor', path: '/portfolio' },
      { label: 'Minimalist & Fine Line', path: '/portfolio' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top CTA Band */}
      <div className="footer-cta-band">
        <div className="container">
          <div className="footer-cta-inner">
            <div>
              <h3 className="footer-cta-title">Ready to wear your story?</h3>
              <p className="footer-cta-sub">Book your consultation with one of our master artists today.</p>
            </div>
            <div className="footer-cta-actions">
              <Link to="/booking" className="btn btn-primary">
                Book Appointment
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FaWhatsapp style={{ color: '#25D366', fontSize: '1.1rem' }} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">
                  <GiInkSwirl />
                </div>
                <span className="logo-text">
                  INK<span className="logo-accent">DYNASTY</span>
                </span>
              </Link>
              <p className="footer-brand-desc">
                Chennai's most awarded tattoo studio. Premium artistry, medical-grade safety,
                and a lifelong commitment to your skin. Since 2012.
              </p>
              {/* Social Links */}
              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <FiInstagram />
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-link whatsapp" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
              {/* Contact Quick */}
              <div className="footer-contact-quick">
                <a href="tel:+919876543210" className="footer-contact-item">
                  <FiPhone /> +91 98765 43210
                </a>
                <a href="mailto:hello@inkdynasty.in" className="footer-contact-item">
                  <FiMail /> hello@inkdynasty.in
                </a>
                <span className="footer-contact-item">
                  <FiMapPin /> 42, Anna Salai, Chennai – 600002
                </span>
              </div>
            </div>

            {/* Link Columns */}
            {footerLinks.map((col) => (
              <div key={col.title} className="footer-col">
                <h4 className="footer-col-title">{col.title}</h4>
                <ul className="footer-col-links">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div className="footer-hours">
            <h4 className="footer-hours-title">Studio Hours</h4>
            <div className="footer-hours-grid">
              <span className="footer-hours-day">Mon – Fri</span>
              <span className="footer-hours-time">10:00 AM – 9:00 PM</span>
              <span className="footer-hours-day">Saturday</span>
              <span className="footer-hours-time">9:00 AM – 10:00 PM</span>
              <span className="footer-hours-day">Sunday</span>
              <span className="footer-hours-time">11:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              © {currentYear} INK DYNASTY. All rights reserved. Crafted with{' '}
              <span style={{ color: 'var(--color-primary)' }}>♥</span> in Chennai.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--color-border);
          margin-top: auto;
        }

        .footer-cta-band {
          background: linear-gradient(135deg, rgba(255,61,0,0.12) 0%, rgba(255,107,0,0.06) 100%);
          border-bottom: 1px solid rgba(255,61,0,0.15);
          padding: 48px 0;
        }

        .footer-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }

        .footer-cta-title {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .footer-cta-sub {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .footer-cta-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footer-main {
          padding: 72px 0 48px;
          background: var(--color-bg-1);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 56px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 20px;
        }

        .footer-logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--color-primary), #ff6b00);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: white;
        }

        .footer-brand-desc {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .social-link {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          box-shadow: 0 0 16px rgba(255,61,0,0.2);
        }

        .social-link.whatsapp:hover {
          border-color: #25D366;
          color: #25D366;
          box-shadow: 0 0 16px rgba(37,211,102,0.2);
        }

        .footer-contact-quick {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-contact-item:hover {
          color: var(--color-text);
        }

        .footer-col-title {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 20px;
        }

        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
        }

        .footer-link {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: var(--color-text);
          transform: translateX(4px);
        }

        .footer-hours {
          padding: 28px 0;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: flex-start;
          gap: 48px;
          flex-wrap: wrap;
        }

        .footer-hours-title {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          white-space: nowrap;
          padding-top: 4px;
        }

        .footer-hours-grid {
          display: grid;
          grid-template-columns: auto auto;
          gap: 6px 32px;
        }

        .footer-hours-day {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .footer-hours-time {
          font-size: 0.88rem;
          color: var(--color-text);
        }

        .footer-bottom {
          background: var(--color-bg);
          padding: 20px 0;
          border-top: 1px solid var(--color-border);
        }

        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-copy {
          font-size: 0.84rem;
          color: var(--color-text-muted);
        }

        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-link {
          font-size: 0.82rem;
          color: var(--color-text-dim);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-bottom-link:hover {
          color: var(--color-text-muted);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-brand { grid-column: 1 / -1; }
        }

        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-brand { grid-column: auto; }
          .footer-cta-inner { flex-direction: column; align-items: flex-start; }
          .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
          .footer-hours { flex-direction: column; gap: 16px; }
        }
      `}</style>
    </footer>
  );
}
