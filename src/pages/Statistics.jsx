import { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics({ technologies }) {
  const [stats, setStats] = useState({
    byStatus: {},
    byCategory: {},
    progressOverTime: []
  });

  useEffect(() => {
    calculateStatistics();
  }, [technologies]);

  const calculateStatistics = () => {
    // Статистика по статусам
    const byStatus = technologies.reduce((acc, tech) => {
      acc[tech.status] = (acc[tech.status] || 0) + 1;
      return acc;
    }, {});

    // Статистика по категориям
    const byCategory = technologies.reduce((acc, tech) => {
      const category = tech.category || 'other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Прогресс по времени (заглушка)
    const progressOverTime = [
      { date: '2025-01', completed: 2 },
      { date: '2025-02', completed: 5 },
      { date: '2025-03', completed: 8 },
      { date: '2025-04', completed: 12 }
    ];

    setStats({ byStatus, byCategory, progressOverTime });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Выполнено': return '#4caf50';
      case 'В процессе': return '#ff9800';
      case 'Не начато': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="statistics-page">
      <h1>📊 Статистика изучения технологий</h1>
      
      <div className="stats-grid">
        {/* Карточка общей статистики */}
        <div className="stat-card">
          <h3>Общий прогресс</h3>
          <div className="progress-circle">
            <div 
              className="circle-progress"
              style={{
                background: `conic-gradient(#667eea ${(stats.byStatus.completed || 0) / technologies.length * 360}deg, #f0f0f0 0deg)`
              }}
            >
              <span className="progress-text">
                {technologies.length > 0 ? Math.round((stats.byStatus.completed || 0) / technologies.length * 100) : 0}%
              </span>
            </div>
          </div>
          <p>Завершено: {stats.byStatus.completed || 0} из {technologies.length}</p>
        </div>

        {/* Статистика по статусам */}
        <div className="stat-card">
          <h3>Распределение по статусам</h3>
          <div className="status-bars">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="status-bar">
                <div className="bar-label">
                  <span>{status}</span>
                  <span>{count}</span>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{
                      width: `${(count / technologies.length) * 100}%`,
                      backgroundColor: getStatusColor(status)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистика по категориям */}
        <div className="stat-card">
          <h3>Распределение по категориям</h3>
          <div className="category-list">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* График прогресса */}
      <div className="chart-section">
        <h3>Прогресс изучения по времени</h3>
        <div className="progress-chart">
          {stats.progressOverTime.map((item, index) => (
            <div key={item.date} className="chart-bar">
              <div 
                className="chart-bar-fill"
                style={{ height: `${(item.completed / Math.max(...stats.progressOverTime.map(p => p.completed))) * 100}%` }}
              />
              <span className="chart-label">{item.date}</span>
              <span className="chart-value">{item.completed}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics;