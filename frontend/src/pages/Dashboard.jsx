import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const handleEdit = (task) => { setEditTask(task); setShowForm(true); };

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : filter === 'completed' ? t.completed : filter === 'active' ? !t.completed : t.priority === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    active: tasks.filter(t => !t.completed).length,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {[
            { label: 'Total Tasks', value: stats.total, color: '#6c63ff', bg: '#f0eeff' },
            { label: 'Active', value: stats.active, color: '#ffa502', bg: '#fffbf0' },
            { label: 'Completed', value: stats.completed, color: '#2ed573', bg: '#f0fff5' },
            { label: 'High Priority', value: stats.high, color: '#ff4757', bg: '#fff0f1' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--card)', borderRadius: '14px', padding: '18px', boxShadow: 'var(--shadow)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text2)', marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter + Add */}
        <div style={{ background: 'var(--card)', borderRadius: '14px', padding: '20px', marginBottom: '20px', boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input placeholder="🔍 Search tasks..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: '200px', marginBottom: 0 }} />
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 'auto', marginBottom: 0 }}>
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <button onClick={() => { setEditTask(null); setShowForm(true); }}
              style={{ padding: '10px 22px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap' }}>
              + Add Task
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {stats.total > 0 && (
          <div style={{ background: 'var(--card)', borderRadius: '14px', padding: '16px 20px', marginBottom: '20px', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>Overall Progress</span>
              <span style={{ fontSize: '13px', color: 'var(--text2)' }}>{stats.completed}/{stats.total} completed</span>
            </div>
            <div style={{ background: 'var(--border)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(90deg, #6c63ff, #2ed573)', height: '100%', width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%`, borderRadius: '8px', transition: 'width 0.5s ease' }} />
            </div>
          </div>
        )}

        {/* Task list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text2)' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>No tasks found</p>
            <p style={{ fontSize: '14px' }}>{search ? 'Try a different search term' : 'Click "+ Add Task" to get started!'}</p>
          </div>
        ) : (
          filtered.map(task => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} onEdit={handleEdit} onRefresh={fetchTasks} />
          ))
        )}
      </div>

      {showForm && <TaskForm editTask={editTask} onClose={() => setShowForm(false)} onSave={() => { fetchTasks(); setShowForm(false); }} />}
    </div>
  );
}