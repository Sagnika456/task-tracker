import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function TaskForm({ editTask, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) setForm({ title: editTask.title, description: editTask.description || '', priority: editTask.priority, dueDate: editTask.dueDate?.slice(0, 10) || '' });
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editTask) { await API.put(`/tasks/${editTask._id}`, form); }
      else { await API.post('/tasks', form); }
      onSave();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '16px' }}>
      <div style={{ background: 'var(--card)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--text)', fontSize: '20px', fontWeight: '700' }}>{editTask ? '✏️ Edit Task' : '➕ New Task'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text2)' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>TITLE *</label>
          <input placeholder="What needs to be done?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>DESCRIPTION</label>
          <textarea placeholder="Add details..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ height: '90px', resize: 'vertical' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>PRIORITY</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)', display: 'block', marginBottom: '6px' }}>DUE DATE</label>
              <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '12px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving...' : editTask ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', background: 'var(--input-bg)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}