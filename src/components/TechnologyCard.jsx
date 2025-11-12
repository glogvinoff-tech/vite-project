import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onDoubleClick }) {
  const handleDoubleClick = () => {
    onDoubleClick(id, status);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'not-started': return '⏳';
      default: return '⏳';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Не начато';
    }
  };

  return (
    <div 
      className={`technology-card ${status}`}
      onDoubleClick={handleDoubleClick}
      title="Двойной клик для смены статуса"
    >
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className={`status-badge ${status}`}>
          {getStatusIcon()} {getStatusText()}
        </span>
      </div>
      <p className="card-description">{description}</p>
      <div className="progress-indicator">
        <div className={`progress-bar ${status}`}></div>
      </div>
      <div className="card-hint">✨ Двойной клик для смены статуса</div>
    </div>
  );
}

export default TechnologyCard;