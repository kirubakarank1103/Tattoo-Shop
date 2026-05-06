import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiCalendar, FiClock, FiUser, FiFileText, FiCreditCard } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { artists } from '../data/artists';

const STEPS = ['Select Artist', 'Pick Date & Time', 'Your Details', 'Confirm'];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM',
];

const styles = ['Realism', 'Tribal', 'Geometric', 'Minimalist', 'Watercolor', 'Japanese', 'Neo-Traditional', 'Mandala', 'Fine Line', 'Other'];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    artist: null,
    date: '',
    time: '',
    style: '',
    size: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    payment: 'studio',
  });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="booking-page">
        {/* Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">Book Your Session</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Online Appointment Booking</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Choose your artist, pick a slot, and secure your booking in under 2 minutes.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            {!submitted ? (
              <div className="booking-wrapper">
                {/* Step Indicator */}
                <div className="step-indicator">
                  {STEPS.map((s, i) => (
                    <div key={s} className={`step-item ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                      <div className="step-circle">
                        {i < step ? <FiCheck size={14} /> : i + 1}
                      </div>
                      <span className="step-label">{s}</span>
                      {i < STEPS.length - 1 && <div className="step-line" />}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="booking-card">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      {/* STEP 0: Artist */}
                      {step === 0 && (
                        <div>
                          <h2 className="booking-step-title">
                            <FiUser /> Choose Your Artist
                          </h2>
                          <p className="booking-step-sub">Select an available artist for your session.</p>
                          <div className="artist-select-grid">
                            {artists.map((a) => (
                              <div
                                key={a.id}
                                className={`artist-select-card ${form.artist?.id === a.id ? 'selected' : ''} ${!a.available ? 'disabled' : ''}`}
                                onClick={() => a.available && updateForm('artist', a)}
                                id={`select-artist-${a.id}`}
                              >
                                <img src={a.avatar} alt={a.name} />
                                <div className="asc-info">
                                  <div className="asc-name">{a.name}</div>
                                  <div className="asc-title">{a.title}</div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                                    {a.specializations.slice(0, 2).map((s) => (
                                      <span key={s} className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>{s}</span>
                                    ))}
                                  </div>
                                </div>
                                {!a.available && <div className="asc-busy">Booked Out</div>}
                                {form.artist?.id === a.id && (
                                  <div className="asc-check"><FiCheck /></div>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="booking-step-fields" style={{ marginTop: 28 }}>
                            <div className="form-group">
                              <label className="form-label">Tattoo Style</label>
                              <select
                                className="form-select"
                                value={form.style}
                                onChange={(e) => updateForm('style', e.target.value)}
                                id="select-style"
                              >
                                <option value="">Select a style...</option>
                                {styles.map((s) => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Approximate Size</label>
                              <select
                                className="form-select"
                                value={form.size}
                                onChange={(e) => updateForm('size', e.target.value)}
                                id="select-size"
                              >
                                <option value="">Select size...</option>
                                <option>Under 2 inches (Micro)</option>
                                <option>2–6 inches (Standard)</option>
                                <option>6–12 inches (Large)</option>
                                <option>Full Sleeve</option>
                                <option>Full Back / Chest</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 1: Date & Time */}
                      {step === 1 && (
                        <div>
                          <h2 className="booking-step-title">
                            <FiCalendar /> Pick Date & Time
                          </h2>
                          <p className="booking-step-sub">All bookings require confirmation within 24 hours.</p>
                          <div className="booking-step-fields">
                            <div className="form-group">
                              <label className="form-label">Select Date</label>
                              <input
                                type="date"
                                className="form-input"
                                value={form.date}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => updateForm('date', e.target.value)}
                                id="booking-date"
                              />
                            </div>
                          </div>
                          <label className="form-label" style={{ display: 'block', marginTop: 24, marginBottom: 12 }}>
                            <FiClock style={{ display: 'inline', marginRight: 6 }} />
                            Available Time Slots
                          </label>
                          <div className="time-slots-grid">
                            {timeSlots.map((t) => (
                              <button
                                key={t}
                                className={`time-slot ${form.time === t ? 'selected' : ''}`}
                                onClick={() => updateForm('time', t)}
                                id={`slot-${t.replace(/[:\s]/g, '-')}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* STEP 2: Details */}
                      {step === 2 && (
                        <div>
                          <h2 className="booking-step-title">
                            <FiFileText /> Your Details
                          </h2>
                          <p className="booking-step-sub">We need a few details to confirm your booking.</p>
                          <div className="booking-step-fields">
                            <div className="form-group">
                              <label className="form-label">Full Name</label>
                              <input
                                className="form-input"
                                placeholder="Your full name"
                                value={form.name}
                                onChange={(e) => updateForm('name', e.target.value)}
                                id="booking-name"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Phone Number</label>
                              <input
                                className="form-input"
                                placeholder="+91 XXXXX XXXXX"
                                value={form.phone}
                                onChange={(e) => updateForm('phone', e.target.value)}
                                id="booking-phone"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Email Address</label>
                              <input
                                className="form-input"
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={(e) => updateForm('email', e.target.value)}
                                id="booking-email"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Notes / Design Description</label>
                              <textarea
                                className="form-textarea"
                                placeholder="Describe your tattoo idea, reference images, placement..."
                                value={form.notes}
                                onChange={(e) => updateForm('notes', e.target.value)}
                                id="booking-notes"
                              />
                            </div>

                            {/* Payment */}
                            <div>
                              <label className="form-label" style={{ marginBottom: 12, display: 'block' }}>
                                <FiCreditCard style={{ display: 'inline', marginRight: 6 }} />
                                Advance Payment (Optional)
                              </label>
                              <div className="payment-options">
                                {[
                                  { val: 'studio', label: 'Pay at Studio', sub: 'No advance required' },
                                  { val: 'upi', label: 'UPI Advance', sub: '₹500 advance via UPI' },
                                  { val: 'card', label: 'Card Advance', sub: '₹500 advance via card' },
                                ].map((opt) => (
                                  <div
                                    key={opt.val}
                                    className={`payment-option ${form.payment === opt.val ? 'selected' : ''}`}
                                    onClick={() => updateForm('payment', opt.val)}
                                    id={`payment-${opt.val}`}
                                  >
                                    <div className="payment-radio" />
                                    <div>
                                      <div className="payment-label">{opt.label}</div>
                                      <div className="payment-sub">{opt.sub}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: Confirm */}
                      {step === 3 && (
                        <div>
                          <h2 className="booking-step-title">
                            <FiCheck /> Confirm Booking
                          </h2>
                          <p className="booking-step-sub">Review your details and submit.</p>
                          <div className="booking-summary">
                            {[
                              { label: 'Artist', val: form.artist?.name || '—' },
                              { label: 'Style', val: form.style || '—' },
                              { label: 'Size', val: form.size || '—' },
                              { label: 'Date', val: form.date || '—' },
                              { label: 'Time', val: form.time || '—' },
                              { label: 'Name', val: form.name || '—' },
                              { label: 'Phone', val: form.phone || '—' },
                              { label: 'Email', val: form.email || '—' },
                              { label: 'Payment', val: form.payment === 'studio' ? 'Pay at Studio' : form.payment === 'upi' ? 'UPI Advance' : 'Card Advance' },
                            ].map((row) => (
                              <div key={row.label} className="summary-row">
                                <span className="summary-label">{row.label}</span>
                                <span className="summary-val">{row.val}</span>
                              </div>
                            ))}
                          </div>
                          <div className="booking-terms">
                            <FiCheck style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                            <span>By submitting, you agree to our cancellation policy. You'll receive a WhatsApp/SMS confirmation within 24 hours.</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="booking-nav">
                    {step > 0 && (
                      <button className="btn btn-outline" onClick={prev} id="booking-prev">
                        Back
                      </button>
                    )}
                    <div style={{ flex: 1 }} />
                    {step < STEPS.length - 1 ? (
                      <button className="btn btn-primary" onClick={next} id="booking-next">
                        Continue <FiArrowRight />
                      </button>
                    ) : (
                      <button className="btn btn-primary" onClick={handleSubmit} id="booking-submit">
                        Confirm Booking <FiCheck />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Success Screen */
              <motion.div
                className="booking-success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="success-icon">✅</div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 12 }}>
                  Booking Requested!
                </h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 480 }}>
                  Thank you, <strong style={{ color: 'var(--color-text)' }}>{form.name || 'Client'}</strong>!
                  Your appointment request has been received. Our team will confirm your booking
                  via WhatsApp / SMS within 24 hours.
                </p>
                <div className="success-info">
                  <div>📅 {form.date} at {form.time}</div>
                  <div>🎨 Artist: {form.artist?.name || 'To be assigned'}</div>
                  <div>🔖 Style: {form.style}</div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => { setSubmitted(false); setStep(0); setForm({ artist: null, date: '', time: '', style: '', size: '', name: '', phone: '', email: '', notes: '', payment: 'studio' }); }}
                >
                  Book Another Appointment
                </button>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        .booking-page { min-height: 100vh; }

        .booking-wrapper {
          max-width: 740px;
          margin: 0 auto;
        }

        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 0;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .step-item.active .step-circle {
          border-color: var(--color-primary);
          color: var(--color-primary);
          background: rgba(255,61,0,0.1);
        }

        .step-item.done .step-circle {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .step-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          white-space: nowrap;
          font-weight: 500;
        }

        .step-item.active .step-label {
          color: var(--color-text);
        }

        .step-line {
          width: 40px;
          height: 2px;
          background: var(--color-border);
          margin: 0 8px;
          flex-shrink: 0;
        }

        .step-item.done .step-line { background: var(--color-primary); }

        .booking-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 40px;
        }

        .booking-step-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text);
          margin-bottom: 6px;
        }

        .booking-step-title svg { color: var(--color-primary); }

        .booking-step-sub {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-bottom: 28px;
        }

        .booking-step-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Artist Select */
        .artist-select-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .artist-select-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .artist-select-card:hover:not(.disabled) {
          border-color: var(--color-primary);
          background: rgba(255,61,0,0.05);
        }

        .artist-select-card.selected {
          border-color: var(--color-primary);
          background: rgba(255,61,0,0.08);
        }

        .artist-select-card.disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .artist-select-card img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .asc-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .asc-title {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .asc-busy {
          position: absolute;
          top: 6px;
          right: 6px;
          font-size: 0.65rem;
          background: rgba(255,61,0,0.15);
          color: var(--color-primary);
          padding: 3px 8px;
          border-radius: 10px;
          font-weight: 600;
        }

        .asc-check {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 22px;
          height: 22px;
          background: var(--color-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.75rem;
        }

        /* Time Slots */
        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .time-slot {
          padding: 12px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-bg-2);
          color: var(--color-text-muted);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          font-family: var(--font-body);
          text-align: center;
        }

        .time-slot:hover {
          border-color: var(--color-primary);
          color: var(--color-text);
        }

        .time-slot.selected {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
          box-shadow: 0 4px 16px rgba(255,61,0,0.35);
        }

        /* Payment */
        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.3s;
        }

        .payment-option:hover, .payment-option.selected {
          border-color: var(--color-primary);
          background: rgba(255,61,0,0.05);
        }

        .payment-radio {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          flex-shrink: 0;
          position: relative;
          transition: border-color 0.3s;
        }

        .payment-option.selected .payment-radio {
          border-color: var(--color-primary);
          background: var(--color-primary);
          box-shadow: inset 0 0 0 3px var(--color-bg-2);
        }

        .payment-label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .payment-sub {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        /* Summary */
        .booking-summary {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          border-bottom: 1px solid var(--color-border);
        }

        .summary-row:last-child { border-bottom: none; }

        .summary-label {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .summary-val {
          font-weight: 600;
          font-size: 0.92rem;
        }

        .booking-terms {
          display: flex;
          gap: 10px;
          font-size: 0.82rem;
          color: var(--color-text-muted);
          align-items: flex-start;
          background: rgba(255,61,0,0.05);
          border: 1px solid rgba(255,61,0,0.15);
          border-radius: var(--radius-md);
          padding: 14px;
          margin-bottom: 8px;
        }

        .booking-nav {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
        }

        /* Success */
        .booking-success {
          max-width: 560px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .success-icon {
          font-size: 4rem;
        }

        .success-info {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px 28px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.9rem;
          text-align: left;
          color: var(--color-text-muted);
        }

        @media (max-width: 640px) {
          .booking-card { padding: 24px 16px; }
          .artist-select-grid { grid-template-columns: 1fr; }
          .time-slots-grid { grid-template-columns: repeat(2, 1fr); }
          .step-label { display: none; }
          .step-line { width: 24px; }
        }
      `}</style>
    </PageTransition>
  );
}
