import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function TaskForm({ editTask, onClose, onSave }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: 'other',
    dueDate: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || '',
        description: editTask.description || '',
        status: editTask.status || 'pending',
        priority: editTask.priority || 'medium',
        category: editTask.category || 'other',
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        category: 'other',
        dueDate: '',
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, form);
      } else {
        await API.post('/tasks', form);
      }

      onSave();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '16px',
      }}
    >
      <div
        style={{
          background: 'var(--card)',
          borderRadius: '16px',
          padding: '32px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ color: 'var(--text)', fontSize: '20px', fontWeight: '700' }}>
            {editTask ? '✏️ Edit Task' : '➕ New Task'}
          </h2>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'var(--text2)',
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text2)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            TITLE *
          </label>
          <input
            name="title"
            placeholder="What needs to be done?"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text2)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            DESCRIPTION
          </label>
          <textarea
            name="description"
            placeholder="Add details..."
            value={form.description}
            onChange={handleChange}
            style={{ height: '90px', resize: 'vertical' }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <div>
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text2)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                STATUS
              </label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">🕒 Pending</option>
                <option value="in-progress">🚀 In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text2)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                PRIORITY
              </label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <div>
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text2)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                CATEGORY
              </label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="work">💼 Work</option>
                <option value="study">📘 Study</option>
                <option value="personal">🏠 Personal</option>
                <option value="other">📌 Other</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--text2)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                DUE DATE
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Saving...' : editTask ? 'Update Task' : 'Add Task'}
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 20px',
                background: 'var(--input-bg)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}