import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInstagram, FiStar, FiAward, FiUsers, FiCheck, FiX, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { artists } from '../data/artists';

export default function Artists() {
  const [selected, setSelected] = useState(null);

  return (
    <PageTransition>
      <div className="artists-page">
        {/* Page Hero */}
        <div className="page-hero">
          <div className="container">
            <div className="page-hero-content">
              <ScrollReveal>
                <span className="tag-label">The Team</span>
                <div className="divider divider-center" style={{ margin: '12px auto' }} />
                <h1 className="section-title">Meet Our Master Artists</h1>
                <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                  Four world-class tattoo artists, each a master in their own style. Book your
                  preferred artist directly through our online system.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <section className="section">
          <div className="container">
            <div className="artists-grid">
              {artists.map((artist, i) => (
                <ScrollReveal key={artist.id} delay={i * 0.1} direction="up">
                  <motion.div
                    className="artist-card"
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {/* Cover */}
                    <div className="artist-cover">
                      <img src={artist.coverImage} alt={`${artist.name} work`} loading="lazy" />
                      <div className="artist-cover-overlay" />
                      {/* Availability Badge */}
                      <div className={`avail-badge ${artist.available ? 'avail' : 'busy'}`}>
                        {artist.available ? <><FiCheck size={11} /> Taking Bookings</> : <><FiX size={11} /> Fully Booked</>}
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className="artist-avatar-wrap">
                      <img src={artist.avatar} alt={artist.name} className="artist-avatar" />
                    </div>

                    {/* Info */}
                    <div className="artist-info">
                      <div className="artist-header">
                        <div>
                          <h3 className="artist-name">{artist.name}</h3>
                          <p className="artist-title">{artist.title}</p>
                        </div>
                        <a
                          href={artist.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="artist-ig-btn"
                          title={artist.instagram}
                        >
                          <FiInstagram size={18} />
                        </a>
                      </div>

                      {/* Ratings */}
                      <div className="artist-rating-row">
                        <div className="stars" style={{ fontSize: '0.8rem' }}>
                          {[...Array(Math.round(artist.rating))].map((_, j) => (
                            <FiStar key={j} fill="currentColor" size={14} />
                          ))}
                        </div>
                        <span className="artist-rating-val">{artist.rating}</span>
                        <span className="artist-rating-count">({artist.reviews} reviews)</span>
                      </div>

                      {/* Specializations */}
                      <div className="artist-specs">
                        {artist.specializations.map((s) => (
                          <span key={s} className="badge badge-primary">{s}</span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="artist-stats">
                        <div className="astat">
                          <div className="astat-val">{artist.stats.tattoos.toLocaleString()}+</div>
                          <div className="astat-label">Tattoos</div>
                        </div>
                        <div className="astat">
                          <div className="astat-val">{artist.stats.awards}</div>
                          <div className="astat-label">Awards</div>
                        </div>
                        <div className="astat">
                          <div className="astat-val">{artist.experience}</div>
                          <div className="astat-label">Experience</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="artist-actions">
                        <button
                          className="btn btn-outline"
                          style={{ flex: 1, justifyContent: 'center' }}
                          onClick={() => setSelected(artist)}
                          id={`artist-profile-${artist.id}`}
                        >
                          <FiChevronDown size={16} /> View Profile
                        </button>
                        {artist.available ? (
                          <Link
                            to="/booking"
                            className="btn btn-primary"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            Book Now
                          </Link>
                        ) : (
                          <button className="btn" style={{ flex: 1, justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }} disabled>
                            Booked Out
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Artist Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="artist-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="artist-modal"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="lightbox-close" onClick={() => setSelected(null)}>
                  <FiX size={20} />
                </button>
                <div className="artist-modal-top">
                  <img src={selected.coverImage} alt="" className="artist-modal-cover" />
                  <div className="artist-modal-avatar-wrap">
                    <img src={selected.avatar} alt={selected.name} className="artist-modal-avatar" />
                  </div>
                </div>
                <div className="artist-modal-body">
                  <div className="artist-modal-header">
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>{selected.name}</h2>
                      <p style={{ color: 'var(--color-primary)', marginTop: 4 }}>{selected.title}</p>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 2 }}>{selected.experience} of Experience</p>
                    </div>
                    <a
                      href={selected.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ gap: 8 }}
                    >
                      <FiInstagram /> {selected.instagram}
                    </a>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: 24 }}>{selected.bio}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                    {selected.specializations.map((s) => (
                      <span key={s} className="badge badge-primary">{s}</span>
                    ))}
                  </div>
                  <div className="artist-modal-stats">
                    <div className="astat"><div className="astat-val">{selected.stats.tattoos.toLocaleString()}+</div><div className="astat-label">Tattoos Done</div></div>
                    <div className="astat"><div className="astat-val">{selected.stats.awards}</div><div className="astat-label">Industry Awards</div></div>
                    <div className="astat"><div className="astat-val">{selected.stats.countries}</div><div className="astat-label">Countries Trained</div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                    {selected.available ? (
                      <Link to="/booking" className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                        Book with {selected.name.split(' ')[0]}
                      </Link>
                    ) : (
                      <div className="btn" style={{ flex: 1, justifyContent: 'center', opacity: 0.5, border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                        Currently Fully Booked
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>

      <style>{`
        .artists-page { min-height: 100vh; }

        .artists-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .artist-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .artist-card:hover {
          border-color: rgba(255,61,0,0.3);
        }

        .artist-cover {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .artist-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .artist-card:hover .artist-cover img { transform: scale(1.06); }

        .artist-cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(26,26,26,0.95) 100%);
        }

        .avail-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .avail-badge.avail {
          background: rgba(0,200,83,0.15);
          border: 1px solid rgba(0,200,83,0.4);
          color: #00c853;
        }

        .avail-badge.busy {
          background: rgba(255,61,0,0.15);
          border: 1px solid rgba(255,61,0,0.4);
          color: var(--color-primary-light);
        }

        .artist-avatar-wrap {
          display: flex;
          padding: 0 24px;
          margin-top: -36px;
          position: relative;
          z-index: 2;
        }

        .artist-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          background: var(--color-surface-2);
          border: 3px solid var(--color-primary);
          box-shadow: 0 0 20px rgba(255,61,0,0.3);
        }

        .artist-info {
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .artist-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .artist-name {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
        }

        .artist-title {
          font-size: 0.84rem;
          color: var(--color-text-muted);
          margin-top: 3px;
        }

        .artist-ig-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .artist-ig-btn:hover {
          background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          border-color: transparent;
          color: white;
        }

        .artist-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
        }

        .artist-rating-val {
          font-weight: 700;
          color: var(--color-gold);
        }

        .artist-rating-count {
          color: var(--color-text-muted);
          font-size: 0.8rem;
        }

        .artist-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .artist-stats {
          display: flex;
          gap: 0;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .astat {
          flex: 1;
          text-align: center;
          padding: 12px;
          border-right: 1px solid var(--color-border);
        }

        .astat:last-child { border-right: none; }

        .astat-val {
          font-family: var(--font-display);
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          color: var(--color-primary);
        }

        .astat-label {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .artist-actions {
          display: flex;
          gap: 10px;
        }

        /* Modal */
        .artist-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .artist-modal {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
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
          z-index: 10;
          transition: background 0.3s;
        }

        .lightbox-close:hover { background: var(--color-primary); }

        .artist-modal-top {
          position: relative;
          height: 180px;
        }

        .artist-modal-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .artist-modal-avatar-wrap {
          position: absolute;
          bottom: -36px;
          left: 28px;
        }

        .artist-modal-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid var(--color-primary);
          object-fit: cover;
          background: var(--color-surface-2);
          box-shadow: 0 0 24px rgba(255,61,0,0.3);
        }

        .artist-modal-body {
          padding: 56px 28px 28px;
        }

        .artist-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .artist-modal-stats {
          display: flex;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .artists-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .artist-modal-header { flex-direction: column; }
          .artist-modal-stats { flex-direction: column; }
          .astat { border-right: none; border-bottom: 1px solid var(--color-border); }
          .astat:last-child { border-bottom: none; }
        }
      `}</style>
    </PageTransition>
  );
}
