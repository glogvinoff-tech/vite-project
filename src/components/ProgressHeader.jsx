function ProgressHeader({ technologies }) {
  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressCount = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length;
  const totalCount = technologies.length;
  
  // Исправляем NaN% - проверяем, что totalCount > 0
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="progress-header">
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number completed-count">{completedCount}</span>
          <span className="stat-label">Завершено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number in-progress-count">{inProgressCount}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number not-started-count">{notStartedCount}</span>
          <span className="stat-label">Не начато</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{totalCount}</span>
          <span className="stat-label">Всего</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <span>Общий прогресс</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;