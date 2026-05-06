import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiTag, FiCopy, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const offers = [
  {
    id: 1,
    title: 'First Tattoo Special',
    badge: '🎉 New Client',
    discount: '20% OFF',
    code: 'FIRSTINK20',
    description: 'Getting your first tattoo? Welcome to INK DYNASTY! Enjoy 20% off on any design under 6 inches as a new client. Valid for walk-ins and bookings.',
    validUntil: 'June 30, 2026',
    terms: 'New clients only. Valid Mon–Thu. Not combinable with other offers.',
    category: 'new-client',
    color: '#FF3D00',
    popular: true,
  },
  {
    id: 2,
    title: 'Summer Flash Sale',
    badge: '☀️ Limited Time',
    discount: '30% OFF',
    code: 'SUMMER30',
    description: 'Our biggest sale of the year! Get 30% off on select flash designs from our pre-drawn collection. Designs available on a first-come, first-served basis.',
    validUntil: 'May 31, 2026',
    terms: 'Flash designs only. Cannot be used on custom or large pieces. Limited slots.',
    category: 'seasonal',
    color: '#FFD700',
    popular: true,
  },
  {
    id: 3,
    title: 'Refer a Friend',
    badge: '👥 Referral',
    discount: '₹1,000 OFF',
    code: 'REFER1000',
    description: 'Love your tattoo? Refer a friend and both of you get ₹1,000 off your next session. No limit on referrals — the more friends you bring, the more you save!',
    validUntil: 'December 31, 2026',
    terms: 'Referral must book and complete a session. Both parties receive discount.',
    category: 'referral',
    color: '#00c853',
    popular: false,
  },
  {
    id: 4,
    title: 'Couples Package',
    badge: '💕 Couples',
    discount: '25% OFF Each',
    code: 'COUPLES25',
    description: 'Ink your bond! When you book simultaneously with a partner, both get 25% off. Matching tattoos, complementary designs, or completely separate pieces — your choice.',
    validUntil: 'July 31, 2026',
    terms: 'Both partners must book in the same session. Prior appointment required.',
    category: 'package',
    color: '#FF69B4',
    popular: false,
  },
  {
    id: 5,
    title: 'Birthday Ink',
    badge: '🎂 Birthday',
    discount: '15% OFF',
    code: 'BDAY15',
    description: 'Celebrate your birthday with a tattoo! Show your ID and book within 7 days of your birthday for 15% off any design. A gift to yourself that lasts forever.',
    validUntil: 'Ongoing',
    terms: 'Valid ID required. Booking must be within 7 days of birthday.',
    category: 'birthday',
    color: '#9c27b0',
    popular: false,
  },
  {
    id: 6,
    title: 'Full Sleeve Deal',
    badge: '💎 Premium',
    discount: '₹5,000 OFF',
    code: 'SLEEVE5K',
    description: 'Planning a full sleeve? Get ₹5,000 off on full sleeve packages when you book all sessions upfront. Includes dedicated artist, priority scheduling, and progress photo album.',
    validUntil: 'August 31, 2026',
    terms: 'All sessions must be pre-booked. Minimum 3 sessions required.',
    category: 'package',
    color: '#FFD700',
    popular: false,
  },
];

function OfferCard({ offer, index }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ScrollReveal delay={index * 0.08} direction="up">
      <motion.div
        className={`offer-card ${offer.popular ? 'offer-popular' : ''}`}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        id={`offer-${offer.id}`}
      >
        {offer.popular && <div className="offer-hot-badge">🔥 HOT DEAL</div>}

        <div className="offer-top">
          <span className="offer-category-badge">{offer.badge}</span>
          <div className="offer-discount" style={{ color: offer.color }}>
            {offer.discount}
          </div>
        </div>

        <h3 className="offer-title">{offer.title}</h3>
        <p className="offer-desc">{offer.description}</p>

        <div className="offer-code-row">
          <div className="offer-code">
            <FiTag size={13} />
            <code>{offer.code}</code>
          </div>
          <button
            className="copy-btn"
            onClick={copyCode}
            title="Copy code"
            id={`copy-${offer.id}`}
          >
            {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="offer-meta">
          <span><FiClock size={12} /> Valid until: <strong>{offer.validUntil}</strong></span>
        </div>

        <div className="offer-terms">* {offer.terms}</div>

        <Link to="/booking" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
          Claim This Offer <FiArrowRight />
        </Link>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Offers() {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'new-client', 'seasonal', 'referral', 'package', 'birthday'];

  const filtered = filter === 'all' ? offers : offers.filter((o) => o.category === filter);

  return (
    <PageTransition>
      <div className="offers-page">
        {/* Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">Save Big</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Exclusive Offers & Discounts</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Premium tattoos at exceptional value. Use the promo codes at booking to redeem your discount.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="filter-section">
          <div className="container">
            <div className="filter-bar">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  id={`offer-filter-${cat}`}
                >
                  {cat === 'all' ? 'All Offers' :
                   cat === 'new-client' ? 'New Client' :
                   cat === 'seasonal' ? 'Seasonal' :
                   cat === 'referral' ? 'Referral' :
                   cat === 'package' ? 'Packages' : 'Birthday'}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <section className="section">
          <div className="container">
            <div className="offers-grid">
              {filtered.map((offer, i) => (
                <OfferCard key={offer.id} offer={offer} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / WhatsApp Updates */}
        <section className="section section-bg-alt">
          <div className="container">
            <ScrollReveal>
              <div className="newsletter-section">
                <div className="newsletter-content">
                  <h2 className="section-title">Never Miss a Deal</h2>
                  <p className="section-subtitle" style={{ marginTop: 12 }}>
                    Join our WhatsApp update list and be the first to know about flash sales, seasonal discounts, and exclusive offers.
                  </p>
                </div>
                <div className="newsletter-form">
                  <input className="form-input" placeholder="Your WhatsApp number..." style={{ maxWidth: 280 }} id="newsletter-input" />
                  <a
                    href="https://wa.me/919876543210?text=I+want+to+join+INK+DYNASTY+offers+list"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Join WhatsApp List <FiArrowRight />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        .offers-page { min-height: 100vh; }

        .filter-section {
          padding: 24px 0;
          background: var(--color-bg-1);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: var(--nav-height);
          z-index: 10;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .offer-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .offer-card:hover { border-color: rgba(255,61,0,0.3); }

        .offer-card.offer-popular {
          border-color: rgba(255,61,0,0.3);
          box-shadow: 0 0 30px rgba(255,61,0,0.1);
        }

        .offer-hot-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 0.68rem;
          font-weight: 700;
          background: var(--color-primary);
          color: white;
          padding: 3px 10px;
          border-radius: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .offer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .offer-category-badge {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .offer-discount {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.05em;
          line-height: 1;
          text-align: right;
        }

        .offer-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
        }

        .offer-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.7;
        }

        .offer-code-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          justify-content: space-between;
        }

        .offer-code {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-primary);
          font-size: 0.95rem;
        }

        .offer-code code {
          font-family: monospace;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          color: var(--color-text-muted);
          cursor: pointer;
          border: 1px solid var(--color-border);
          padding: 5px 10px;
          border-radius: 6px;
          background: transparent;
          font-family: var(--font-body);
          transition: all 0.3s;
        }

        .copy-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .offer-meta {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .offer-terms {
          font-size: 0.75rem;
          color: var(--color-text-dim);
          font-style: italic;
        }

        /* Newsletter */
        .newsletter-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 40px;
          background: var(--color-surface);
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .offers-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .offers-grid { grid-template-columns: 1fr; }
          .newsletter-section { flex-direction: column; }
          .newsletter-form { width: 100%; }
        }
      `}</style>
    </PageTransition>
  );
}
