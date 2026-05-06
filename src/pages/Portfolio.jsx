import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiClock, FiX } from 'react-icons/fi';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { portfolioItems, portfolioStyles } from '../data/portfolio';

export default function Portfolio() {
  const [activeStyle, setActiveStyle] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeStyle === 'All'
    ? portfolioItems
    : portfolioItems.filter((p) => p.style === activeStyle);

  return (
    <PageTransition>
      <div className="portfolio-page">
        {/* Page Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">Our Work</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Tattoo Portfolio</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Over 5,000 unique tattoos crafted. Browse by style and find the inspiration for your next piece.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-section">
          <div className="container">
            <div className="filter-bar">
              {portfolioStyles.map((style) => (
                <motion.button
                  key={style}
                  className={`filter-btn ${activeStyle === style ? 'active' : ''}`}
                  onClick={() => setActiveStyle(style)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  id={`filter-${style.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {style}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="section">
          <div className="container">
            <motion.div className="gallery-grid" layout>
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="gallery-item"
                    onClick={() => setLightbox(item)}
                    id={`portfolio-item-${item.id}`}
                  >
                    <div className="gallery-img-wrap">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <div className="gallery-hover">
                        <div className="gallery-hover-content">
                          <h4>{item.title}</h4>
                          <p>{item.artist}</p>
                          <div className="gallery-meta">
                            <span><FiClock size={12} /> {item.duration}</span>
                            <span><FiHeart size={12} /> {item.likes.toLocaleString()}</span>
                          </div>
                        </div>
                        <span className="badge badge-primary">{item.style}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
                No pieces found for this style yet.
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="lightbox-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="lightbox-close" onClick={() => setLightbox(null)}>
                  <FiX size={22} />
                </button>
                <div className="lightbox-img-wrap">
                  <img src={lightbox.image} alt={lightbox.title} />
                </div>
                <div className="lightbox-info">
                  <div>
                    <span className="badge badge-primary" style={{ marginBottom: 8 }}>{lightbox.style}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginTop: 8 }}>{lightbox.title}</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: 4 }}>by {lightbox.artist}</p>
                  </div>
                  <div className="lightbox-meta-row">
                    <div className="lightbox-meta-item">
                      <span className="lightbox-meta-label">Size</span>
                      <span>{lightbox.size}</span>
                    </div>
                    <div className="lightbox-meta-item">
                      <span className="lightbox-meta-label">Duration</span>
                      <span>{lightbox.duration}</span>
                    </div>
                    <div className="lightbox-meta-item">
                      <span className="lightbox-meta-label">Likes</span>
                      <span>{lightbox.likes.toLocaleString()}</span>
                    </div>
                  </div>
                  <a
                    href="/booking"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Book This Style
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>

      <style>{`
        .portfolio-page { min-height: 100vh; }

        .filter-section {
          padding: 32px 0;
          background: var(--color-bg-1);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: var(--nav-height);
          z-index: 10;
        }

        .filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 20px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: transparent;
          color: var(--color-text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }

        .filter-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .filter-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
          box-shadow: 0 4px 16px rgba(255,61,0,0.35);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .gallery-item {
          cursor: pointer;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .gallery-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
        }

        .gallery-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover .gallery-img-wrap img {
          transform: scale(1.08);
        }

        .gallery-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 16px;
          gap: 8px;
        }

        .gallery-item:hover .gallery-hover { opacity: 1; }

        .gallery-hover-content h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: white;
          margin-bottom: 3px;
        }

        .gallery-hover-content p {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.65);
          margin-bottom: 8px;
        }

        .gallery-meta {
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
        }

        .gallery-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Lightbox */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightbox-modal {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          display: flex;
          max-width: 860px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          position: relative;
        }

        .lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          z-index: 1;
          transition: background 0.3s;
        }

        .lightbox-close:hover { background: var(--color-primary); }

        .lightbox-img-wrap {
          flex: 1.2;
          overflow: hidden;
        }

        .lightbox-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lightbox-info {
          flex: 1;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          justify-content: space-between;
        }

        .lightbox-meta-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lightbox-meta-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
          font-size: 0.9rem;
        }

        .lightbox-meta-label {
          color: var(--color-text-muted);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .lightbox-modal { flex-direction: column; max-height: 95vh; overflow-y: auto; }
          .lightbox-img-wrap { max-height: 350px; }
        }

        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </PageTransition>
  );
}
