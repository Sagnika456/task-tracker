import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingNavbar from '../components/LandingNavbar';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #070816, #11162f, #19163b)',
        color: 'white',
        overflowX: 'hidden',
      }}
    >
      <LandingNavbar />

      <motion.section
        id="home"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 20px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '14px' }}
          >
            Smart Productivity Platform
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            Organize your work, track your goals, and stay productive.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '17px',
              lineHeight: 1.7,
              marginBottom: '28px',
              maxWidth: '540px',
            }}
          >
            TaskTracker helps users manage tasks with priorities, due dates,
            categories, reminders, and progress insights in one clean platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            <motion.div whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" style={primaryBtn}>Get Started</Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
              <a href="#features" style={secondaryBtn}>Explore Features</a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.3, duration: 0.8 },
            x: { delay: 0.3, duration: 0.8 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '26px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
          }}
        >
          <motion.div
            style={cardStyle}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260 }}
          >
            <h3 style={{ marginBottom: '10px' }}>📊 Dashboard Overview</h3>
            <p style={muted}>Track tasks, priorities, progress, and due dates.</p>
          </motion.div>

          <motion.div
            style={cardStyle}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260 }}
          >
            <h3 style={{ marginBottom: '10px' }}>⏰ Smart Reminders</h3>
            <p style={muted}>Stay updated with overdue and due-today tasks.</p>
          </motion.div>

          <motion.div
            style={cardStyle}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260 }}
          >
            <h3 style={{ marginBottom: '10px' }}>🔐 Secure Access</h3>
            <p style={muted}>User authentication with protected task management.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        id="about"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        style={sectionStyle}
      >
        <h2 style={headingStyle}>About</h2>
        <p style={textStyle}>
          TaskTracker is a smart task management web application built to help users
          manage daily work efficiently. It supports task creation, editing, status
          tracking, priorities, due dates, and a clean productivity-focused interface.
        </p>
      </motion.section>

      <motion.section
        id="pages"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        style={sectionStyle}
      >
        <h2 style={headingStyle}>Pages</h2>
        <div style={gridStyle}>
          {['🏠 Home Page', '🔑 Login Page', '📝 Register Page', '📋 Dashboard Page'].map((item) => (
            <motion.div
              key={item}
              style={featureCard}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 240 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="features"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        style={sectionStyle}
      >
        <h2 style={headingStyle}>Features</h2>
        <div style={gridStyle}>
          {[
            '✅ Task Creation & Management',
            '📌 Priority Levels',
            '📅 Due Dates',
            '📈 Progress Tracking',
            '🔎 Search & Filter',
            '🔐 Authentication',
          ].map((item) => (
            <motion.div
              key={item}
              style={featureCard}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 240 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        style={sectionStyle}
      >
        <h2 style={headingStyle}>Contact</h2>
        <p style={textStyle}>
          For project demo, feedback, or collaboration, connect through the app or
          project repository.
        </p>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          padding: '24px 20px 36px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
        }}
      >
        © 2026 TaskTracker. All rights reserved.
      </motion.footer>
    </div>
  );
}

const primaryBtn = {
  background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
  color: 'white',
  padding: '12px 22px',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'inline-block',
  boxShadow: '0 10px 25px rgba(108,99,255,0.35)',
};

const secondaryBtn = {
  background: 'transparent',
  color: 'white',
  padding: '12px 22px',
  borderRadius: '12px',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.2)',
  fontWeight: '600',
  display: 'inline-block',
};

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  borderRadius: '18px',
  padding: '18px',
  marginBottom: '14px',
};

const muted = {
  color: 'rgba(255,255,255,0.7)',
  lineHeight: 1.6,
  margin: 0,
};

const sectionStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 20px',
};

const headingStyle = {
  fontSize: '2rem',
  marginBottom: '14px',
};

const textStyle = {
  color: 'rgba(255,255,255,0.75)',
  lineHeight: 1.8,
  maxWidth: '850px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
};

const featureCard = {
  background: 'rgba(255,255,255,0.06)',
  padding: '20px',
  borderRadius: '18px',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
};