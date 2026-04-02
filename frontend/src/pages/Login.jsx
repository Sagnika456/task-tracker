import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await API.post('/auth/login', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.wrapper}>
          <div style={styles.leftPanel}>
            <p style={styles.badge}>Welcome to TaskTracker</p>
            <h1 style={styles.heading}>
              Manage your work smarter, faster, and better.
            </h1>
            <p style={styles.description}>
              Stay organized with task priorities, due dates, reminders,
              progress tracking, and a clean productivity dashboard.
            </p>

            <div style={styles.featureBox}>
              <div style={styles.featureCard}>
                <span style={styles.icon}>📋</span>
                <div>
                  <h3 style={styles.featureTitle}>Smart Task Management</h3>
                  <p style={styles.featureText}>
                    Create, organize, and track your daily tasks easily.
                  </p>
                </div>
              </div>

              <div style={styles.featureCard}>
                <span style={styles.icon}>⏰</span>
                <div>
                  <h3 style={styles.featureTitle}>Reminder Support</h3>
                  <p style={styles.featureText}>
                    Stay on time with due-date and overdue task alerts.
                  </p>
                </div>
              </div>

              <div style={styles.featureCard}>
                <span style={styles.icon}>📈</span>
                <div>
                  <h3 style={styles.featureTitle}>Progress Tracking</h3>
                  <p style={styles.featureText}>
                    Monitor completed, pending, and in-progress tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.rightPanel}>
            <div style={styles.card}>
              <h2 style={styles.title}>Welcome Back 👋</h2>
              <p style={styles.subtitle}>Login to continue to your account</p>

              {error && <p style={styles.error}>{error}</p>}

              <form onSubmit={handleSubmit}>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <input
                  style={styles.input}
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />

                <button style={styles.button} type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p style={styles.link}>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={styles.linkText}>
                  Register
                </Link>
              </p>

              <p style={styles.backHome}>
                <Link to="/" style={styles.backHomeLink}>
                  ← Back to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'linear-gradient(135deg, #070816 0%, #11162f 50%, #19163b 100%)',
  },

  overlay: {
    minHeight: '100vh',
    background: 'rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },

  wrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '28px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    backdropFilter: 'blur(12px)',
  },

  leftPanel: {
    padding: '56px 42px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  badge: {
    display: 'inline-block',
    padding: '8px 14px',
    borderRadius: '999px',
    background: 'rgba(108,99,255,0.18)',
    color: '#b9b3ff',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '18px',
    width: 'fit-content',
  },

  heading: {
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    lineHeight: 1.15,
    margin: '0 0 16px',
  },

  description: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '16px',
    lineHeight: 1.8,
    marginBottom: '28px',
    maxWidth: '520px',
  },

  featureBox: {
    display: 'grid',
    gap: '14px',
  },

  featureCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    padding: '16px',
    borderRadius: '18px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
  },

  icon: {
    fontSize: '22px',
    lineHeight: 1,
  },

  featureTitle: {
    margin: '0 0 6px',
    fontSize: '16px',
    color: 'white',
  },

  featureText: {
    margin: 0,
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    lineHeight: 1.6,
  },

  rightPanel: {
    background: 'rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '42px 28px',
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(255,255,255,0.92)',
    borderRadius: '24px',
    padding: '36px 30px',
    boxShadow: '0 12px 35px rgba(0,0,0,0.18)',
  },

  title: {
    margin: '0 0 8px',
    fontSize: '28px',
    color: '#1a1a2e',
    fontWeight: '700',
  },

  subtitle: {
    margin: '0 0 24px',
    color: '#666',
    fontSize: '15px',
  },

  input: {
    width: '100%',
    padding: '14px 14px',
    marginBottom: '16px',
    border: '1px solid #d9ddf1',
    borderRadius: '12px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    background: '#f5f7ff',
  },

  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
  },

  error: {
    color: '#ff4757',
    marginBottom: '14px',
    fontSize: '14px',
    fontWeight: '500',
  },

  link: {
    textAlign: 'center',
    marginTop: '18px',
    color: '#666',
    fontSize: '14px',
  },

  linkText: {
    color: '#6c63ff',
    fontWeight: '600',
    textDecoration: 'none',
  },

  backHome: {
    textAlign: 'center',
    marginTop: '14px',
    fontSize: '14px',
  },

  backHomeLink: {
    color: '#444',
    textDecoration: 'none',
    fontWeight: '500',
  },
};