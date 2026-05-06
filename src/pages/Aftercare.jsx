import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const aftercareSteps = [
  {
    id: 1,
    icon: '🩹',
    title: 'Keep the Wrap On (2–4 hours)',
    content: `Your artist will cover your fresh tattoo with a sterile plastic wrap or a medical-grade bandage. Keep it on for 2–4 hours (or as directed). This protects against airborne bacteria and keeps plasma from drying on the surface. Do NOT remove it early out of curiosity.`,
    do: ['Leave wrap on for 2–4 hours', 'Keep the area elevated if possible', 'Avoid pressing or squeezing the tattoo'],
    dont: ['Remove the wrap before time', 'Touch the tattoo with unwashed hands', 'Get the wrapped area wet'],
    critical: false,
  },
  {
    id: 2,
    icon: '🧼',
    title: 'Gentle Wash (First Clean)',
    content: `After removing the wrap, wash your hands thoroughly first. Then gently clean the tattoo with lukewarm water and a fragrance-free, antimicrobial soap. Use your fingertips only — no cloth, no sponge. Pat dry with a clean paper towel (not a fabric towel which can harbor bacteria).`,
    do: ['Wash hands before touching', 'Use fragrance-free mild soap', 'Pat dry with clean paper towel', 'Wash 2–3 times daily for first week'],
    dont: ['Scrub or rub the tattoo', 'Use scented soaps or shower gels', 'Dry with a reused fabric towel', 'Soak in water (bath, pool, ocean)'],
    critical: true,
  },
  {
    id: 3,
    icon: '💧',
    title: 'Moisturize Properly',
    content: `After each wash, apply a thin layer of unscented moisturizer. INK DYNASTY recommends Cetaphil, Lubriderm (unscented), or Bepanthen. Apply only a rice-grain-sized amount — too much moisturizer suffocates the skin and can cause infection. Repeat moisturizing 2–3 times daily.`,
    do: ['Use unscented, non-comedogenic lotion', 'Apply a thin layer only', 'Moisturize 2–3 times daily', 'Let the tattoo breathe between applications'],
    dont: ['Use petroleum jelly / Vaseline heavily', 'Apply thick layers of cream', 'Use products with alcohol or fragrance', 'Wrap the tattoo again after moisturizing'],
    critical: false,
  },
  {
    id: 4,
    icon: '☀️',
    title: 'Sun Protection (Critical)',
    content: `UV radiation is your tattoo's worst enemy — especially in the first 30 days. Keep the tattoo out of direct sunlight completely during healing. After healing, always apply SPF 50+ sunscreen on tattooed skin before any sun exposure. A faded tattoo cannot be reversed — prevention is everything.`,
    do: ['Keep tattoo covered or in shade for 30 days', 'Use SPF 50+ after healing', 'Wear loose, breathable clothing over it', 'Reapply sunscreen every 2 hours outdoors'],
    dont: ['Expose fresh tattoo to direct sun', 'Use sunbeds or tanning', 'Skip sunscreen once healed', 'Apply sunscreen on a healing tattoo (wait)'],
    critical: true,
  },
  {
    id: 5,
    icon: '🚫',
    title: 'What to Absolutely Avoid',
    content: `During the 2–4 week healing period, certain activities can ruin your tattoo or cause serious infection. Be mindful of your environment and activities.`,
    do: ['Wear loose, soft clothing over the tattoo', 'Sleep on clean sheets', 'Keep pets away from fresh tattoo', 'Stay hydrated — healthy skin heals better'],
    dont: ['Swim in pools, sea, lakes, or hot tubs', 'Pick or scratch at peeling skin', 'Go to the gym (sweat + friction)', 'Let others touch your fresh tattoo'],
    critical: true,
  },
  {
    id: 6,
    icon: '⏳',
    title: 'The Healing Timeline',
    content: `Understanding what's normal during healing prevents panic and protects your art. Every body heals slightly differently, but this is the standard timeline for most tattoos.`,
    timeline: [
      { day: 'Days 1–3', desc: 'Redness, swelling, slight soreness — this is normal. Plasma may weep.' },
      { day: 'Days 3–7', desc: 'Peeling begins. It looks like sunburn peel — let it fall off naturally.' },
      { day: 'Days 7–14', desc: 'Itching begins. Do NOT scratch. Tap gently instead.' },
      { day: 'Days 14–30', desc: 'Surface healed. Deeper skin layers still healing — avoid sun.' },
      { day: 'Months 2–6', desc: 'Tattoo fully settles. Colors may appear brighter as deeper layers heal.' },
    ],
    do: [],
    dont: [],
    critical: false,
  },
];

export default function Aftercare() {
  return (
    <PageTransition>
      <div className="aftercare-page">
        {/* Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">Protect Your Art</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Tattoo Aftercare Guide</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Your tattoo is a fresh wound. Proper aftercare determines how it heals — and how beautiful it looks forever.
                  Follow every step carefully.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="aftercare-warning-banner">
          <div className="container">
            <div className="warning-banner-inner">
              <span className="warning-emoji">⚠️</span>
              <p>
                <strong>Important:</strong> If you notice excessive redness, swelling beyond 48 hours, pus, fever, or severe pain — contact us immediately or visit a doctor. These may be signs of infection.
              </p>
              <a href="tel:+919876543210" className="btn btn-primary btn-sm">Call Studio</a>
            </div>
          </div>
        </div>

        {/* Steps */}
        <section className="section">
          <div className="container">
            <div className="aftercare-steps">
              {aftercareSteps.map((step, i) => (
                <ScrollReveal key={step.id} delay={i * 0.08} direction="up">
                  <motion.div
                    className={`aftercare-card ${step.critical ? 'critical' : ''}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    id={`aftercare-step-${step.id}`}
                  >
                    <div className="ac-number">0{step.id}</div>
                    {step.critical && <div className="ac-critical-badge">⚡ Critical Step</div>}
                    <div className="ac-icon">{step.icon}</div>
                    <h3 className="ac-title">{step.title}</h3>
                    <p className="ac-content">{step.content}</p>

                    {step.timeline && (
                      <div className="ac-timeline">
                        {step.timeline.map((t) => (
                          <div key={t.day} className="ac-timeline-row">
                            <span className="ac-timeline-day">{t.day}</span>
                            <span className="ac-timeline-desc">{t.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {(step.do.length > 0 || step.dont.length > 0) && (
                      <div className="ac-do-dont">
                        {step.do.length > 0 && (
                          <div className="ac-do">
                            <div className="ac-do-header">✅ DO</div>
                            <ul>
                              {step.do.map((d) => <li key={d}>{d}</li>)}
                            </ul>
                          </div>
                        )}
                        {step.dont.length > 0 && (
                          <div className="ac-dont">
                            <div className="ac-dont-header">❌ DON'T</div>
                            <ul>
                              {step.dont.map((d) => <li key={d}>{d}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Products */}
            <ScrollReveal>
              <div className="recommended-products">
                <h2 className="section-title" style={{ marginBottom: 8 }}>Recommended Products</h2>
                <p className="section-subtitle" style={{ marginBottom: 32 }}>
                  These are the products our artists personally recommend for healing.
                </p>
                <div className="products-grid">
                  {[
                    { name: 'Cetaphil Gentle Cleanser', use: 'Daily washing', phase: 'Week 1–4', rating: '⭐⭐⭐⭐⭐' },
                    { name: 'Bepanthen Ointment', use: 'First 3–5 days moisturizing', phase: 'Days 1–5', rating: '⭐⭐⭐⭐⭐' },
                    { name: 'Lubriderm Unscented Lotion', use: 'Daily moisturizing', phase: 'Week 2–4', rating: '⭐⭐⭐⭐⭐' },
                    { name: 'La Roche-Posay SPF 60+', use: 'Sun protection (healed)', phase: 'Month 1+', rating: '⭐⭐⭐⭐⭐' },
                  ].map((p) => (
                    <div key={p.name} className="product-card">
                      <div className="product-rating">{p.rating}</div>
                      <h4 className="product-name">{p.name}</h4>
                      <div className="product-use">{p.use}</div>
                      <span className="badge badge-gold">{p.phase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        .aftercare-page { min-height: 100vh; }

        .aftercare-warning-banner {
          background: rgba(255, 165, 0, 0.08);
          border-top: 1px solid rgba(255,165,0,0.3);
          border-bottom: 1px solid rgba(255,165,0,0.3);
          padding: 16px 0;
        }

        .warning-banner-inner {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .warning-emoji { font-size: 1.4rem; }

        .warning-banner-inner p {
          flex: 1;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .aftercare-steps {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 80px;
        }

        .aftercare-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 36px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .aftercare-card:hover { border-color: rgba(255,61,0,0.3); }

        .aftercare-card.critical {
          border-color: rgba(255,61,0,0.2);
        }

        .aftercare-card.critical::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-gold));
        }

        .ac-number {
          position: absolute;
          top: 24px;
          right: 28px;
          font-family: var(--font-display);
          font-size: 5rem;
          color: rgba(0, 0, 0, 0.03);
          line-height: 1;
          pointer-events: none;
        }

        .ac-critical-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          background: rgba(255,61,0,0.1);
          border: 1px solid rgba(255,61,0,0.3);
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-primary-light);
          margin-bottom: 12px;
        }

        .ac-icon {
          font-size: 2.2rem;
          margin-bottom: 12px;
        }

        .ac-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .ac-content {
          color: var(--color-text-muted);
          line-height: 1.8;
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .ac-do-dont {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .ac-do, .ac-dont {
          border-radius: var(--radius-md);
          padding: 16px 20px;
        }

        .ac-do {
          background: rgba(0,200,83,0.05);
          border: 1px solid rgba(0,200,83,0.2);
        }

        .ac-dont {
          background: rgba(255,61,0,0.05);
          border: 1px solid rgba(255,61,0,0.2);
        }

        .ac-do-header {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00c853;
          margin-bottom: 10px;
        }

        .ac-dont-header {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 10px;
        }

        .ac-do ul, .ac-dont ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ac-do ul li, .ac-dont ul li {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .ac-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 8px;
        }

        .ac-timeline-row {
          display: flex;
          gap: 16px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--color-border);
          align-items: flex-start;
        }

        .ac-timeline-row:last-child { border-bottom: none; }

        .ac-timeline-day {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-primary);
          white-space: nowrap;
          min-width: 80px;
        }

        .ac-timeline-desc {
          font-size: 0.87rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        /* Products */
        .recommended-products {
          padding: 48px 0;
          border-top: 1px solid var(--color-border);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.3s, transform 0.3s;
        }

        .product-card:hover {
          border-color: rgba(255,215,0,0.3);
          transform: translateY(-3px);
        }

        .product-rating { font-size: 0.7rem; }

        .product-name {
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .product-use {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .aftercare-card { padding: 24px; }
          .ac-do-dont { grid-template-columns: 1fr; }
          .products-grid { grid-template-columns: 1fr; }
          .warning-banner-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </PageTransition>
  );
}
