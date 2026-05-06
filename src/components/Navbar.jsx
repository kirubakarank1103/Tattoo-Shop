import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiInkSwirl } from 'react-icons/gi';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/artists', label: 'Artists' },
  { path: '/booking', label: 'Book Now' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/aftercare', label: 'Aftercare' },
  { path: '/offers', label: 'Offers' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Scroll to top smoothly when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar-inner container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              className="logo-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GiInkSwirl />
            </motion.div>
            <span className="logo-text">
              INK<span className="logo-accent">DYNASTY</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isBooking = link.path === '/booking';
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive ? 'active' : ''} ${isBooking ? 'nav-link-cta' : ''}`}
                  >
                    {link.label}
                    {isActive && !isBooking && (
                      <motion.span
                        className="nav-active-dot"
                        layoutId="activeNavDot"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mobile-menu-header">
              <span className="logo-text">
                INK<span className="logo-accent">DYNASTY</span>
              </span>
            </div>
            <ul className="mobile-nav-links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    <span className="mobile-nav-num">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu-footer">
              <p>Chennai, Tamil Nadu</p>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--nav-height);
          transition: all 0.4s ease;
          background: transparent;
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.05);
        }

        .navbar-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          z-index: 10;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--color-primary), #ff6b00);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
          box-shadow: 0 0 20px rgba(255, 61, 0, 0.4);
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.4rem;
          letter-spacing: 0.12em;
          color: var(--color-text);
        }

        .logo-accent {
          color: var(--color-primary);
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .nav-link {
          position: relative;
          padding: 6px 10px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--color-text-muted);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: var(--color-text);
        }

        .nav-link.active {
          color: var(--color-text);
        }

        .nav-active-dot {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: var(--color-primary);
          border-radius: 50%;
          display: block;
        }

        .nav-link-cta {
          background: linear-gradient(135deg, var(--color-primary), #ff6b00);
          color: white !important;
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(255, 61, 0, 0.35);
          transition: all 0.3s ease;
          margin-left: 4px;
        }

        .nav-link-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 61, 0, 0.5);
        }

        .navbar-hamburger {
          display: none;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          background: var(--color-surface);
          cursor: pointer;
          z-index: 1001;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(340px, 100vw);
          background: var(--color-bg-1);
          border-left: 1px solid var(--color-border);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 90px 32px 40px;
        }

        .mobile-menu-header {
          margin-bottom: 40px;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--color-text-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--color-text);
          padding-left: 8px;
        }

        .mobile-nav-link.active {
          color: var(--color-primary);
        }

        .mobile-nav-num {
          font-size: 0.7rem;
          color: var(--color-primary);
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .mobile-menu-footer {
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }

        .mobile-menu-footer a {
          color: var(--color-primary);
          font-weight: 600;
        }

        @media (max-width: 1100px) {
          .navbar-links { display: none; }
          .navbar-hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
