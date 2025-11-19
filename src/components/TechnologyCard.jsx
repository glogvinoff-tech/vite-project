function TechnologyCard({ id, title, description, status, onDoubleClick }) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'not-started': return '#f44336';
      default: return '#666';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Неизвестно';
    }
  };

  return (
    <div 
      className="technology-card"
      onDoubleClick={() => onDoubleClick(id, status)}
      style={{ borderLeft: `6px solid ${getStatusColor()}` }}
    >
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor() }}
        >
          {getStatusText()}
        </span>
      </div>
      
      <p className="card-description">{description}</p>
      
      {/* Простое поле ввода под картой */}
      <div className="card-input">
        <input
          type="text"
          placeholder="Добавьте заметку..."
          className="note-input"
        />
      </div>
    </div>
  );
}

export default TechnologyCard;