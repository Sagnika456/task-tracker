import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
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
        <h2 style={{ color: 'white', margin: 0, fontWeight: '700' }}>
          TaskTracker
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '22px',
            alignItems: 'center',
          }}
          className="desktop-menu"
        >
          <a href="#home" style={navLink}>Home</a>
          <a href="#about" style={navLink}>About</a>
          <a href="#pages" style={navLink}>Pages</a>
          <a href="#features" style={navLink}>Features</a>
          <a href="#contact" style={navLink}>Contact</a>
          <Link to="/login" style={getStartedBtn}>Get Started</Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            padding: '16px 20px 20px',
            background: 'rgba(10, 10, 30, 0.97)',
          }}
        >
          <a href="#home" style={navLink}>Home</a>
          <a href="#about" style={navLink}>About</a>
          <a href="#pages" style={navLink}>Pages</a>
          <a href="#features" style={navLink}>Features</a>
          <a href="#contact" style={navLink}>Contact</a>
          <Link to="/login" style={getStartedBtn}>Get Started</Link>
        </div>
      )}
    </nav>
  );
}

const navLink = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: '500',
};

const getStartedBtn = {
  background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
  color: 'white',
  padding: '10px 18px',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '600',
};