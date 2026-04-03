import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 30, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          style={{ color: 'white', margin: 0, fontWeight: '700', cursor: 'pointer' }}
        >
          TaskTracker
        </motion.h2>

        <div
          className="desktop-menu"
          style={{
            display: 'flex',
            gap: '22px',
            alignItems: 'center',
          }}
        >
          <motion.a href="#home" style={navLink} whileHover={{ scale: 1.08, color: '#ffffff' }}>
            Home
          </motion.a>

          <motion.a href="#about" style={navLink} whileHover={{ scale: 1.08, color: '#ffffff' }}>
            About
          </motion.a>

          <motion.a href="#pages" style={navLink} whileHover={{ scale: 1.08, color: '#ffffff' }}>
            Pages
          </motion.a>

          <motion.a href="#features" style={navLink} whileHover={{ scale: 1.08, color: '#ffffff' }}>
            Features
          </motion.a>

          <motion.a href="#contact" style={navLink} whileHover={{ scale: 1.08, color: '#ffffff' }}>
            Contact
          </motion.a>

          <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" style={getStartedBtn}>Get Started</Link>
          </motion.div>
        </div>

        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              padding: '16px 20px 20px',
              background: 'rgba(10, 10, 30, 0.97)',
              overflow: 'hidden',
            }}
          >
            <motion.a
              href="#home"
              style={navLink}
              whileHover={{ x: 6, color: '#ffffff' }}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </motion.a>

            <motion.a
              href="#about"
              style={navLink}
              whileHover={{ x: 6, color: '#ffffff' }}
              onClick={() => setMenuOpen(false)}
            >
              About
            </motion.a>

            <motion.a
              href="#pages"
              style={navLink}
              whileHover={{ x: 6, color: '#ffffff' }}
              onClick={() => setMenuOpen(false)}
            >
              Pages
            </motion.a>

            <motion.a
              href="#features"
              style={navLink}
              whileHover={{ x: 6, color: '#ffffff' }}
              onClick={() => setMenuOpen(false)}
            >
              Features
            </motion.a>

            <motion.a
              href="#contact"
              style={navLink}
              whileHover={{ x: 6, color: '#ffffff' }}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </motion.a>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                style={{ ...getStartedBtn, display: 'inline-block', width: 'fit-content' }}
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const navLink = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
};

const getStartedBtn = {
  background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
  color: 'white',
  padding: '10px 18px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '600',
  boxShadow: '0 10px 25px rgba(108,99,255,0.35)',
};