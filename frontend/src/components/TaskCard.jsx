import API from '../api/axios';

export default function TaskCard({ task, onDelete, onEdit, onRefresh }) {
  const priorityColors = {
    high: '#ff4757',
    medium: '#ffa502',
    low: '#2ed573',
  };

  const priorityBg = {
    high: '#fff0f1',
    medium: '#fffbf0',
    low: '#f0fff5',
  };

  const statusColors = {
    pending: '#ffa502',
    'in-progress': '#1e90ff',
    completed: '#2ed573',
  };

  const statusBg = {
    pending: '#fffbf0',
    'in-progress': '#f0f7ff',
    completed: '#f0fff5',
  };

  const categoryIcons = {
    work: '💼',
    study: '📘',
    personal: '🏠',
    other: '📌',
  };

  const isCompleted = task.status === 'completed';

  const toggleComplete = async () => {
    const newStatus = isCompleted ? 'pending' : 'completed';
    await API.put(`/tasks/${task._id}`, { status: newStatus });
    onRefresh();
  };

  return (
    <div
      style={{
        background: 'var(--card)',
        borderRadius: '14px',
        padding: '20px 24px',
        marginBottom: '14px',
        boxShadow: 'var(--shadow)',
        borderLeft: `4px solid ${priorityColors[task.priority]}`,
        opacity: isCompleted ? 0.7 : 1,
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            flex: 1,
          }}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={toggleComplete}
            style={{
              width: '18px',
              height: '18px',
              marginTop: '3px',
              cursor: 'pointer',
              accentColor: 'var(--primary)',
              flexShrink: 0,
            }}
          />

          <div style={{ flex: 1 }}>
            <h3
              style={{
                margin: '0 0 6px',
                color: 'var(--text)',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                style={{
                  margin: '0 0 10px',
                  color: 'var(--text2)',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                {task.description}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  background: priorityBg[task.priority],
                  color: priorityColors[task.priority],
                  padding: '3px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: `1px solid ${priorityColors[task.priority]}33`,
                }}
              >
                {task.priority.toUpperCase()}
              </span>

              <span
                style={{
                  background: statusBg[task.status],
                  color: statusColors[task.status],
                  padding: '3px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: `1px solid ${statusColors[task.status]}33`,
                }}
              >
                {task.status === 'in-progress'
                  ? 'IN PROGRESS'
                  : task.status.toUpperCase()}
              </span>

              {task.category && (
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--text2)',
                    background: 'var(--input-bg)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    fontWeight: '500',
                  }}
                >
                  {categoryIcons[task.category]} {task.category.toUpperCase()}
                </span>
              )}

              {task.dueDate && (
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--text2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}

              {isCompleted && (
                <span
                  style={{
                    fontSize: '12px',
                    color: '#2ed573',
                    fontWeight: '600',
                  }}
                >
                  ✓ Completed
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => onEdit(task)}
            title="Edit"
            style={{
              padding: '8px 10px',
              background: 'var(--input-bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            ✏️
          </button>

          <button
            onClick={() => onDelete(task._id)}
            title="Delete"
            style={{
              padding: '8px 10px',
              background: '#fff0f1',
              border: '1px solid #ffcdd2',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}