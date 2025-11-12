function ProgressHeader({ technologies }) {
  // Рассчитываем статистику на основе текущих данных
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-item">
          <span className="stat-number completed-count">{completed}</span>
          <span className="stat-label">Изучено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number in-progress-count">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number not-started-count">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-info">
          <span>Общий прогресс: {progressPercentage}%</span>
          <span>{completed} из {total} технологий изучено</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Визуальная индикация прогресса */}
      <div className="progress-visual">
        <div className="progress-segments">
          {technologies.map(tech => (
            <div 
              key={tech.id}
              className={`progress-segment ${tech.status}`}
              title={`${tech.title} - ${tech.status}`}
            ></div>
          ))}
        </div>
        <div className="progress-legend">
          <span className="legend-item completed">Изучено ({completed})</span>
          <span className="legend-item in-progress">В процессе ({inProgress})</span>
          <span className="legend-item not-started">Не начато ({notStarted})</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;