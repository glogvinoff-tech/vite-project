import { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
  // Исходные данные
  const initialTechnologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов и их жизненного цикла', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и его особенностей', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов и подъем состояния', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение основных хуков: useState, useEffect, useContext', 
      status: 'not-started' 
    },
    { 
      id: 5, 
      title: 'Props and Data Flow', 
      description: 'Передача данных между компонентами через props', 
      status: 'completed' 
    }
  ];

  const [technologies, setTechnologies] = useState(initialTechnologies);

  // Функция для изменения статуса технологии
  const updateTechnologyStatus = (id, newStatus) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

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
    updateTechnologyStatus(id, nextStatus);
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
      
      <main className="technologies-container">
        <h2>Дорожная карта технологий</h2>
        <div className="technologies-list">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onDoubleClick={handleTechnologyDoubleClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;