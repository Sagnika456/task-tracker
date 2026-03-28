import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={{ background: 'var(--navbar)', padding: '0 32px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(108,99,255,0.15)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>✅</span>
        <span style={{ color: 'white', fontWeight: '700', fontSize: '20px', letterSpacing: '-0.5px' }}>TaskTracker</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>Hi, {user?.name} 👋</span>
        <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={handleLogout} style={{ padding: '8px 18px', background: 'white', color: 'var(--primary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}