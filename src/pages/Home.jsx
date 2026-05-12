import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlay, FiStar, FiAward, FiUsers, FiZap } from 'react-icons/fi';
import { GiInkSwirl } from 'react-icons/gi';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { testimonials } from '../data/testimonials';
import { portfolioItems } from '../data/portfolio';

const stats = [
  { value: 5000, suffix: '+', label: 'Tattoos Done', icon: <GiInkSwirl /> },
  { value: 12, suffix: '', label: 'Years of Excellence', icon: <FiAward /> },
  { value: 4, suffix: '', label: 'Master Artists', icon: <FiUsers /> },
  { value: 99, suffix: '%', label: 'Client Satisfaction', icon: <FiStar /> },
];

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(value / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(start);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const heroImages = [
  'https://cdn.shopify.com/s/files/1/0639/1237/8602/files/3D_Tattoos_for_Men_480x480.webp?v=1744022695',
  'https://menshaircuts.com/wp-content/uploads/2023/05/tp-tattoos-for-men-500x333.jpg',
  'https://menshaircuts.com/wp-content/uploads/2023/05/tattoos-for-men-crow-green-blue-black-moon-683x1024.jpg',
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <PageTransition>
      <div className="home-page">
        {/* ═══ HERO ═══ */}
        <section className="hero" id="hero">
          {/* Background Images */}
          {heroImages.map((src, i) => (
            <motion.div
              key={i}
              className="hero-bg"
              animate={{ opacity: i === heroIdx ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${src})`,
                y: heroY,
              }}
            />
          ))}

          {/* Overlay */}
          <div className="hero-overlay" />

          {/* Particles */}
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Content */}
          <motion.div className="hero-content container" style={{ opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="hero-badge">
                <FiZap /> Chennai's #1 Tattoo Studio
              </div>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Skin.<br />
              Our <span className="gradient-text-animate">Canvas.</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              World-class tattoo artistry in Chennai. From delicate fine lines to bold
              full sleeves — we craft permanent art that tells your story.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/booking" className="btn btn-primary btn-lg">
                Book Appointment <FiArrowRight />
              </Link>
              <Link to="/portfolio" className="btn btn-outline btn-lg">
                <FiPlay style={{ fontSize: '0.9rem' }} /> View Portfolio
              </Link>
            </motion.div>

            {/* Slide indicators */}
            <motion.div
              className="hero-indicators"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  className={`indicator ${i === heroIdx ? 'active' : ''}`}
                  onClick={() => setHeroIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Hint */}
          <motion.div
            className="scroll-hint"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="scroll-hint-line" />
            <span>Scroll</span>
          </motion.div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 0.1} direction="up">
                  <div className="stat-card">
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-value">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ABOUT STRIP ═══ */}
        <section className="about-strip section">
          <div className="container">
            <div className="about-strip-inner">
              <ScrollReveal direction="left" className="about-img-wrap">
                <div className="about-img">
                  <img
                    src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=700&auto=format&fit=crop"
                    alt="INK DYNASTY Studio"
                  />
                  <div className="about-img-badge">
                    <FiAward />
                    <span>Best Tattoo Studio<br />Chennai 2023</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" className="about-text">
                <span className="tag-label">About INK DYNASTY</span>
                <div className="divider" />
                <h2 className="section-title">
                  Where Art Meets<br />
                  <em style={{ color: 'var(--color-primary)' }}>Skin</em>
                </h2>
                <p className="section-subtitle" style={{ marginTop: 16, marginBottom: 24 }}>
                  Founded in 2012 in Chennai, INK DYNASTY has been creating masterpiece tattoos
                  for over a decade. Our studio combines sterile medical-grade safety standards with
                  world-class artistry, giving you the confidence to wear your story forever.
                </p>
                <p className="section-subtitle">
                  From your first consultation to your final healed result, we're with you every
                  step of the journey. No compromise. No shortcuts. Only art.
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
                  <Link to="/artists" className="btn btn-primary">
                    Meet Our Artists <FiArrowRight />
                  </Link>
                  <Link to="/portfolio" className="btn btn-outline">
                    View Portfolio
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══ PORTFOLIO PREVIEW ═══ */}
        <section className="section section-bg-alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="tag-label">Our Work</span>
                <div className="divider divider-center" />
                <h2 className="section-title">Latest Masterpieces</h2>
                <p className="section-subtitle">
                  Each tattoo is a unique collaboration between artist and client — a permanent work of art.
                </p>
              </div>
            </ScrollReveal>

            <div className="portfolio-preview-grid">
              {portfolioItems.slice(0, 6).map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.08} direction="up">
                  <motion.div
                    className="portfolio-card"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <div className="portfolio-card-img">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="portfolio-card-overlay">
                        <div className="portfolio-card-info">
                          <span className="badge badge-primary">{item.style}</span>
                          <h4>{item.title}</h4>
                          <p>{item.artist}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/portfolio" className="btn btn-primary btn-lg">
                View Full Portfolio <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="section section-radial">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="tag-label">Client Stories</span>
                <div className="divider divider-center" />
                <h2 className="section-title">What They Say</h2>
              </div>
            </ScrollReveal>

            <div className="testimonials-grid">
              {testimonials.slice(0, 3).map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 0.12} direction="up">
                  <div className="testimonial-card card">
                    <div className="testimonial-top">
                      <div className="stars">
                        {[...Array(t.rating)].map((_, j) => <FiStar key={j} fill="currentColor" />)}
                      </div>
                      <span className="badge badge-primary">{t.style}</span>
                    </div>
                    <p className="testimonial-text">"{t.review}"</p>
                    <div className="testimonial-author">
                      <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="testimonial-meta">{t.piece} · {t.date}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═══ */}
        <section className="cta-section">
          <div className="container">
            <ScrollReveal>
              <div className="cta-inner">
                <div className="cta-glow" />
                <span className="tag-label">Ready?</span>
                <h2 className="section-title" style={{ marginTop: 12 }}>
                  Your Story Starts<br />with One Appointment.
                </h2>
                <p className="section-subtitle" style={{ marginTop: 16, marginBottom: 40 }}>
                  Book your free consultation today. Our artists will work with you to design
                  the perfect piece that you'll be proud to wear forever.
                </p>
                <div className="cta-actions">
                  <Link to="/booking" className="btn btn-primary btn-lg">
                    Book Free Consultation <FiArrowRight />
                  </Link>
                  <Link to="/pricing" className="btn btn-gold btn-lg">
                    View Pricing
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        /* Hero */
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: var(--nav-height) 0 60px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          will-change: transform, opacity;
          transition: opacity 1.2s ease;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.85) 100%
          );
          z-index: 1;
        }

        .hero-particles {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: var(--color-primary);
          border-radius: 50%;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(255,61,0,0.12);
          border: 1px solid rgba(255,61,0,0.3);
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary-light);
          margin-bottom: 24px;
        }

        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 24px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--color-text-muted);
          max-width: 540px;
          line-height: 1.7;
          margin-bottom: 40px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-indicators {
          display: flex;
          gap: 8px;
          margin-top: 48px;
        }

        .indicator {
          width: 32px;
          height: 3px;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .indicator.active {
          width: 64px;
          background: var(--color-primary);
        }

        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(0, 0, 0, 0.4);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .scroll-hint-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,61,0,0.6));
        }

        /* Stats */
        .stats-section {
          padding: 0;
          background: var(--color-bg-1);
          border-bottom: 1px solid var(--color-border);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .stat-card {
          padding: 48px 32px;
          text-align: center;
          border-right: 1px solid var(--color-border);
          transition: background 0.3s;
        }

        .stat-card:last-child { border-right: none; }
        .stat-card:hover { background: rgba(255,61,0,0.04); }

        .stat-icon {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          color: var(--color-text);
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* About Strip */
        .about-strip-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .about-img-wrap { position: relative; }

        .about-img {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          aspect-ratio: 4/5;
        }

        .about-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-img-badge {
          position: absolute;
          bottom: 24px;
          right: -20px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-card);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        /* Portfolio Preview */
        .portfolio-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .portfolio-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
        }

        .portfolio-card-img {
          position: relative;
          aspect-ratio: 4/5;
          overflow: hidden;
        }

        .portfolio-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .portfolio-card:hover .portfolio-card-img img {
          transform: scale(1.08);
        }

        .portfolio-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }

        .portfolio-card:hover .portfolio-card-overlay { opacity: 1; }

        .portfolio-card-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .portfolio-card-info h4 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          color: white;
        }

        .portfolio-card-info p {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.7);
        }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .testimonial-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .testimonial-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .testimonial-text {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.75;
          flex: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          background: var(--color-surface-2);
          border: 2px solid var(--color-primary);
        }

        .testimonial-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .testimonial-meta {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        /* CTA */
        .cta-section {
          padding: 100px 0;
          background: var(--color-bg-1);
        }

        .cta-inner {
          text-align: center;
          position: relative;
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,61,0,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-card { border-right: none; border-bottom: 1px solid var(--color-border); }
          .about-strip-inner { grid-template-columns: 1fr; gap: 40px; }
          .about-img-badge { right: 16px; }
          .portfolio-preview-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .hero-title { font-size: clamp(2.4rem, 10vw, 3.5rem); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .portfolio-preview-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .about-img { aspect-ratio: 1/1; }
        }
      `}</style>
    </PageTransition>
  );
}
