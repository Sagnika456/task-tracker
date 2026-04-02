import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #070816, #11162f, #19163b)',
        color: 'white',
      }}
    >
      <LandingNavbar />

      <section
        id="home"
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
          <p style={{ color: '#8b5cf6', fontWeight: '600', marginBottom: '14px' }}>
            Smart Productivity Platform
          </p>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            Organize your work, track your goals, and stay productive.
          </h1>

          <p
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
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/login" style={primaryBtn}>Get Started</Link>
            <a href="#features" style={secondaryBtn}>Explore Features</a>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '26px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '10px' }}>📊 Dashboard Overview</h3>
            <p style={muted}>Track tasks, priorities, progress, and due dates.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginBottom: '10px' }}>⏰ Smart Reminders</h3>
            <p style={muted}>Stay updated with overdue and due-today tasks.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginBottom: '10px' }}>🔐 Secure Access</h3>
            <p style={muted}>User authentication with protected task management.</p>
          </div>
        </div>
      </section>

      <section id="about" style={sectionStyle}>
        <h2 style={headingStyle}>About</h2>
        <p style={textStyle}>
          TaskTracker is a smart task management web application built to help users
          manage daily work efficiently. It supports task creation, editing, status
          tracking, priorities, due dates, and a clean productivity-focused interface.
        </p>
      </section>

      <section id="pages" style={sectionStyle}>
        <h2 style={headingStyle}>Pages</h2>
        <div style={gridStyle}>
          <div style={featureCard}>🏠 Home Page</div>
          <div style={featureCard}>🔑 Login Page</div>
          <div style={featureCard}>📝 Register Page</div>
          <div style={featureCard}>📋 Dashboard Page</div>
        </div>
      </section>

      <section id="features" style={sectionStyle}>
        <h2 style={headingStyle}>Features</h2>
        <div style={gridStyle}>
          <div style={featureCard}>✅ Task Creation & Management</div>
          <div style={featureCard}>📌 Priority Levels</div>
          <div style={featureCard}>📅 Due Dates</div>
          <div style={featureCard}>📈 Progress Tracking</div>
          <div style={featureCard}>🔎 Search & Filter</div>
          <div style={featureCard}>🔐 Authentication</div>
        </div>
      </section>

      <section id="contact" style={sectionStyle}>
        <h2 style={headingStyle}>Contact</h2>
        <p style={textStyle}>
          For project demo, feedback, or collaboration, connect through the app or
          project repository.
        </p>
      </section>

      <footer
        style={{
          textAlign: 'center',
          padding: '24px 20px 36px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
        }}
      >
        © 2026 TaskTracker. All rights reserved.
      </footer>
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
};

const secondaryBtn = {
  background: 'transparent',
  color: 'white',
  padding: '12px 22px',
  borderRadius: '12px',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.2)',
  fontWeight: '600',
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