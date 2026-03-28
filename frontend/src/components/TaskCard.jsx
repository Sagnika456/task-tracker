import API from '../api/axios';

export default function TaskCard({ task, onDelete, onEdit, onRefresh }) {
  const priorityColors = { high: '#ff4757', medium: '#ffa502', low: '#2ed573' };
  const priorityBg = { high: '#fff0f1', medium: '#fffbf0', low: '#f0fff5' };

  const toggleComplete = async () => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    onRefresh();
  };

  return (
    <div style={{ background: 'var(--card)', borderRadius: '14px', padding: '20px 24px', marginBottom: '14px', boxShadow: 'var(--shadow)', borderLeft: `4px solid ${priorityColors[task.priority]}`, opacity: task.completed ? 0.7 : 1, transition: 'all 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
          <input type="checkbox" checked={task.completed} onChange={toggleComplete}
            style={{ width: '18px', height: '18px', marginTop: '3px', cursor: 'pointer', accentColor: 'var(--primary)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 6px', color: 'var(--text)', fontSize: '16px', fontWeight: '600', textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </h3>
            {task.description && <p style={{ margin: '0 0 10px', color: 'var(--text2)', fontSize: '14px', lineHeight: '1.5' }}>{task.description}</p>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: priorityBg[task.priority], color: priorityColors[task.priority], padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: `1px solid ${priorityColors[task.priority]}33` }}>
                {task.priority.toUpperCase()}
              </span>
              {task.dueDate && (
                <span style={{ fontSize: '12px', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              {task.completed && <span style={{ fontSize: '12px', color: '#2ed573', fontWeight: '600' }}>✓ Completed</span>}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button onClick={() => onEdit(task)} title="Edit"
            style={{ padding: '8px 10px', background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}>✏️</button>
          <button onClick={() => onDelete(task._id)} title="Delete"
            style={{ padding: '8px 10px', background: '#fff0f1', border: '1px solid #ffcdd2', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}>🗑️</button>
        </div>
      </div>
    </div>
  );
}