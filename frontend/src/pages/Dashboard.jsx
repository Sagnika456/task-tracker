import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    highPriorityTasks: 0,
    overdueTasks: 0,
    completionRate: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get('/tasks/stats');
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const refreshDashboard = async () => {
    await fetchTasks();
    await fetchStats();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await API.delete(`/tasks/${id}`);
      refreshDashboard();
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const filtered = tasks.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());

    let matchFilter = true;

    if (filter === 'pending') matchFilter = t.status === 'pending';
    else if (filter === 'in-progress') matchFilter = t.status === 'in-progress';
    else if (filter === 'completed') matchFilter = t.status === 'completed';
    else if (filter === 'high') matchFilter = t.priority === 'high';
    else if (filter === 'medium') matchFilter = t.priority === 'medium';
    else if (filter === 'low') matchFilter = t.priority === 'low';

    return matchSearch && matchFilter;
  });

  const today = new Date().toISOString().slice(0, 10);

  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      t.status !== 'completed' &&
      new Date(t.dueDate) < new Date(today)
  );

  const dueTodayTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      t.status !== 'completed' &&
      new Date(t.dueDate).toISOString().slice(0, 10) === today
  );

  const statCards = [
    { label: 'Total Tasks', value: stats.totalTasks, color: '#6c63ff' },
    { label: 'Pending', value: stats.pendingTasks, color: '#ffa502' },
    { label: 'In Progress', value: stats.inProgressTasks, color: '#1e90ff' },
    { label: 'Completed', value: stats.completedTasks, color: '#2ed573' },
    { label: 'High Priority', value: stats.highPriorityTasks, color: '#ff4757' },
    { label: 'Overdue', value: stats.overdueTasks, color: '#ff6b81' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}
      >
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{ marginBottom: '20px' }}
        >
          <h2 style={{ color: 'var(--text)', marginBottom: '6px' }}>
            Welcome back, {user?.name || 'User'} 👋
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '14px' }}>
            Here’s an overview of your task productivity.
          </p>
        </motion.div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          {statCards.map((s, index) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              style={{
                background: 'var(--card)',
                borderRadius: '14px',
                padding: '18px',
                boxShadow: 'var(--shadow)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: '700', color: s.color }}>
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text2)',
                  marginTop: '4px',
                  fontWeight: '500',
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search + Filter + Add */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            background: 'var(--card)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}
            />

            <motion.select
              whileFocus={{ scale: 1.01 }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: 'auto', marginBottom: 0 }}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </motion.select>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setEditTask(null);
                setShowForm(true);
              }}
              style={{
                padding: '10px 22px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                boxShadow: '0 10px 20px rgba(108,99,255,0.24)',
              }}
            >
              + Add Task
            </motion.button>
          </div>
        </motion.div>

        {/* Progress bar */}
        {stats.totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              background: 'var(--card)',
              borderRadius: '14px',
              padding: '16px 20px',
              marginBottom: '20px',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>
                Overall Progress
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text2)' }}>
                {stats.completedTasks}/{stats.totalTasks} completed
              </span>
            </div>

            <div
              style={{
                background: 'var(--border)',
                borderRadius: '8px',
                height: '8px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(90deg, #6c63ff, #2ed573)',
                  height: '100%',
                  borderRadius: '8px',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Reminder Section */}
        {(overdueTasks.length > 0 || dueTodayTasks.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            whileHover={{ y: -3 }}
            style={{
              background: 'var(--card)',
              borderRadius: '14px',
              padding: '18px 20px',
              marginBottom: '20px',
              boxShadow: 'var(--shadow)',
            }}
          >
            <h3 style={{ marginBottom: '12px', color: 'var(--text)' }}>
              ⏰ Reminders
            </h3>

            {overdueTasks.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#ff4757' }}>
                  ⚠️ Overdue Tasks ({overdueTasks.length})
                </strong>
                <ul style={{ marginTop: '6px', paddingLeft: '18px' }}>
                  {overdueTasks.map((task) => (
                    <motion.li
                      key={task._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ fontSize: '14px', color: 'var(--text)' }}
                    >
                      {task.title}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {dueTodayTasks.length > 0 && (
              <div>
                <strong style={{ color: '#ffa502' }}>
                  📅 Due Today ({dueTodayTasks.length})
                </strong>
                <ul style={{ marginTop: '6px', paddingLeft: '18px' }}>
                  {dueTodayTasks.map((task) => (
                    <motion.li
                      key={task._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ fontSize: '14px', color: 'var(--text)' }}
                    >
                      {task.title}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Task list */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text2)' }}
          >
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
              No tasks found
            </p>
            <p style={{ fontSize: '14px' }}>
              {search ? 'Try a different search term' : 'Click "+ Add Task" to get started!'}
            </p>
          </motion.div>
        ) : (
          filtered.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + index * 0.05, duration: 0.45 }}
            >
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onRefresh={refreshDashboard}
              />
            </motion.div>
          ))
        )}
      </motion.div>

      {showForm && (
        <TaskForm
          editTask={editTask}
          onClose={() => setShowForm(false)}
          onSave={() => {
            refreshDashboard();
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}