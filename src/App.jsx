import { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import useTechnologies from './hooks/useTechnologies';

function App() {
  const { 
    technologies, 
    updateStatus, 
    markAllCompleted, 
    resetAllStatuses,
    importTechnologies,
    loading,
    error 
  } = useTechnologies();

  const [searchQuery, setSearchQuery] = useState('');
  const [newTechIds, setNewTechIds] = useState(new Set());

  // Фильтрация технологий
  const filteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция для получения следующего статуса
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'not-started': return 'in-progress';
      case 'in-progress': return 'completed';
      case 'completed': return 'not-started';
      default: return 'not-started';
    }
  };

  // Обработчик двойного клика
  const handleTechnologyDoubleClick = (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    updateStatus(id, nextStatus);
    // Убираем пометку "new" после взаимодействия
    setNewTechIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // Обработчик успешного импорта
  const handleImport = async () => {
    const result = await importTechnologies();
    if (result.success) {
      // Получаем ID последних добавленных технологий (предполагаем, что они в конце массива)
      const newIds = technologies.slice(-result.count).map(tech => tech.id);
      setNewTechIds(new Set(newIds));
      
      // Автоматически убираем пометку "new" через 5 секунд
      setTimeout(() => {
        setNewTechIds(new Set());
      }, 5000);
    }
    return result;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Трекер изучения технологий</h1>
        <p>Отслеживайте свой прогресс в изучении React и связанных технологий</p>
        <div className="app-instruction">
          💡 <strong>Подсказка:</strong> Двойной клик по карточке меняет статус изучения
        </div>
      </header>

      <ProgressHeader technologies={technologies} />

      {/* Поиск по технологиям */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-results">
            Найдено: {filteredTechnologies.length}
          </span>
        </div>
      </div>

      {/* Быстрые действия */}
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        onImport={handleImport}
        loading={loading}
        error={error}
      />
      
      <main className="technologies-container">
        <h2>Дорожная карта технологий</h2>
        <div className="technologies-list">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onDoubleClick={handleTechnologyDoubleClick}
              isNew={newTechIds.has(tech.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;