import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiSend } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { pricingPlans, perInchRates } from '../data/pricing';

export default function Pricing() {
  const [quoteForm, setQuoteForm] = useState({ name: '', phone: '', style: '', size: '', details: '' });
  const [quoteSent, setQuoteSent] = useState(false);

  const updateQuote = (k, v) => setQuoteForm((f) => ({ ...f, [k]: v }));

  return (
    <PageTransition>
      <div className="pricing-page">
        {/* Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">Transparent Pricing</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Pricing & Estimates</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  No hidden costs. Honest pricing for world-class art. Get a free quote for your custom design.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="tag-label">Packages</span>
                <div className="divider divider-center" />
                <h2 className="section-title">Choose Your Package</h2>
              </div>
            </ScrollReveal>

            <div className="pricing-grid">
              {pricingPlans.map((plan, i) => (
                <ScrollReveal key={plan.id} delay={i * 0.1} direction="up">
                  <motion.div
                    className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    id={`pricing-${plan.id}`}
                  >
                    {plan.badge && (
                      <div className={`pricing-badge ${plan.popular ? 'badge-fire' : plan.badge === 'VIP' ? 'badge-vip' : 'badge-prem'}`}>
                        {plan.badge}
                      </div>
                    )}
                    <div className="pricing-icon">{plan.icon}</div>
                    <h3 className="pricing-name">{plan.name}</h3>
                    <p className="pricing-size">{plan.size}</p>
                    <div className="pricing-price">
                      <span className="pricing-amount">{plan.price}</span>
                      <span className="pricing-note">{plan.priceNote}</span>
                    </div>
                    <ul className="pricing-features">
                      {plan.features.map((f) => (
                        <li key={f}>
                          <FiCheck className="feature-check" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/booking"
                      className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {plan.price === 'Custom' ? 'Get Quote' : 'Book This Package'}
                      <FiArrowRight />
                    </a>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Per Inch Rates */}
        <section className="section section-bg-alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="tag-label">Rate Card</span>
                <div className="divider divider-center" />
                <h2 className="section-title">Per-Inch Pricing by Style</h2>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Final price depends on complexity, placement, and session count. Consult an artist for an exact quote.
                </p>
              </div>
            </ScrollReveal>

            <div className="rate-table-wrap">
              <ScrollReveal>
                <div className="rate-table">
                  <div className="rate-header">
                    <span>Tattoo Style</span>
                    <span>Rate (per inch)</span>
                  </div>
                  {perInchRates.map((r, i) => (
                    <motion.div
                      key={r.style}
                      className="rate-row"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      viewport={{ once: true }}
                    >
                      <span>{r.style}</span>
                      <span className="rate-val">{r.rate}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="rate-note-cards">
                  <div className="rate-note-card">
                    <div className="rn-icon">💉</div>
                    <h4>Medical Grade Safety</h4>
                    <p>Single-use needles, autoclave-sterilized equipment, and WHO-compliant ink — no compromises.</p>
                  </div>
                  <div className="rate-note-card">
                    <div className="rn-icon">🎨</div>
                    <h4>Free Design Consultation</h4>
                    <p>Every booking includes a free design consultation session with your chosen artist.</p>
                  </div>
                  <div className="rate-note-card">
                    <div className="rn-icon">🔄</div>
                    <h4>Touch-Up Guarantee</h4>
                    <p>Free touch-up sessions included for all packages within the guarantee period.</p>
                  </div>
                  <div className="rate-note-card">
                    <div className="rn-icon">💳</div>
                    <h4>Flexible Payments</h4>
                    <p>UPI, card, cash, and EMI options available. Advance as low as ₹500 to secure your slot.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Get Quote Form */}
        <section className="section">
          <div className="container">
            <div className="quote-wrapper">
              <ScrollReveal direction="left">
                <div className="quote-left">
                  <span className="tag-label">Free Estimate</span>
                  <div className="divider" />
                  <h2 className="section-title">Get Your Custom Quote</h2>
                  <p className="section-subtitle" style={{ marginTop: 16 }}>
                    Fill out the form and one of our artists will reach out within 24 hours with a
                    personalized estimate for your design.
                  </p>
                  <div className="quote-promises">
                    {['No cost, no commitment', '24-hour response guaranteed', 'Direct artist consultation', 'Reference image review'].map((p) => (
                      <div key={p} className="quote-promise">
                        <FiCheck style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                {!quoteSent ? (
                  <div className="quote-form card" style={{ padding: 36 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input className="form-input" placeholder="Full name" value={quoteForm.name} onChange={(e) => updateQuote('name', e.target.value)} id="quote-name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone / WhatsApp</label>
                        <input className="form-input" placeholder="+91 XXXXX XXXXX" value={quoteForm.phone} onChange={(e) => updateQuote('phone', e.target.value)} id="quote-phone" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Preferred Style</label>
                        <input className="form-input" placeholder="e.g. Realism, Tribal, Geometric..." value={quoteForm.style} onChange={(e) => updateQuote('style', e.target.value)} id="quote-style" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Approximate Size & Placement</label>
                        <input className="form-input" placeholder="e.g. 6-inch on forearm" value={quoteForm.size} onChange={(e) => updateQuote('size', e.target.value)} id="quote-size" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Design Description</label>
                        <textarea className="form-textarea" placeholder="Describe your tattoo idea in detail..." value={quoteForm.details} onChange={(e) => updateQuote('details', e.target.value)} id="quote-details" />
                      </div>
                      <button
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => setQuoteSent(true)}
                        id="quote-submit"
                      >
                        <FiSend /> Send Quote Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    className="quote-success card"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ padding: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}
                  >
                    <div style={{ fontSize: '3.5rem' }}>🎨</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Quote Request Received!</h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                      Thank you, <strong>{quoteForm.name}</strong>! Our team will review your request and reach out within 24 hours via WhatsApp.
                    </p>
                    <button className="btn btn-outline" onClick={() => { setQuoteSent(false); setQuoteForm({ name: '', phone: '', style: '', size: '', details: '' }); }}>
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        .pricing-page { min-height: 100vh; }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: start;
        }

        .pricing-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          transition: border-color 0.3s;
        }

        .pricing-card:hover { border-color: rgba(255,61,0,0.3); }

        .pricing-card.popular {
          border-color: var(--color-primary);
          box-shadow: 0 0 40px rgba(255,61,0,0.15);
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 5px 16px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .badge-fire { background: var(--color-primary); color: white; }
        .badge-vip { background: var(--color-gold); color: #000; }
        .badge-prem { background: var(--color-surface-2); color: var(--color-text); border: 1px solid var(--color-border); }

        .pricing-icon { font-size: 2rem; }

        .pricing-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
        }

        .pricing-size {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .pricing-price {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 16px 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }

        .pricing-amount {
          font-family: var(--font-display);
          font-size: 2.2rem;
          letter-spacing: 0.05em;
          color: var(--color-primary);
        }

        .pricing-note {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .pricing-features li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }

        .feature-check {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Rate Table */
        .rate-table-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .rate-table {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .rate-header {
          display: flex;
          justify-content: space-between;
          padding: 14px 20px;
          background: rgba(255,61,0,0.08);
          border-bottom: 1px solid var(--color-border);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-primary);
        }

        .rate-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid var(--color-border);
          transition: background 0.3s;
          font-size: 0.9rem;
        }

        .rate-row:last-child { border-bottom: none; }
        .rate-row:hover { background: rgba(0, 0, 0, 0.03); }

        .rate-val {
          font-weight: 600;
          color: var(--color-gold);
          font-size: 0.85rem;
        }

        .rate-note-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .rate-note-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.3s;
        }

        .rate-note-card:hover { border-color: rgba(255,61,0,0.3); }

        .rn-icon { font-size: 1.6rem; }

        .rate-note-card h4 {
          font-size: 0.92rem;
          font-weight: 600;
        }

        .rate-note-card p {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        /* Quote */
        .quote-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .quote-promises {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .quote-promise {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 1200px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 1024px) {
          .rate-table-wrap { grid-template-columns: 1fr; }
          .quote-wrapper { grid-template-columns: 1fr; gap: 40px; }
        }

        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr; }
          .rate-note-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  );
}
