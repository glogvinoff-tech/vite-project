import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

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

// Функция для преобразования данных из API в наш формат
const transformApiDataToTechnologies = (apiData) => {
  const technologiesFromApi = [
    {
      id: Date.now(),
      title: 'API Integration',
      description: `Загружено из API: ${apiData.title || 'Данные успешно получены'}`,
      status: 'completed'
    },
    {
      id: Date.now() + 1,
      title: 'HTTP Requests',
      description: 'Изучение работы с HTTP запросами и REST API',
      status: 'in-progress'
    },
    {
      id: Date.now() + 2,
      title: 'Async/Await',
      description: 'Работа с асинхронными операциями в JavaScript',
      status: 'not-started'
    },
    {
      id: Date.now() + 3,
      title: 'Error Handling',
      description: 'Обработка ошибок при работе с внешними API',
      status: 'not-started'
    },
    {
      id: Date.now() + 4,
      title: 'Data Transformation',
      description: 'Преобразование данных из API в нужный формат',
      status: 'completed'
    }
  ];
  
  return technologiesFromApi;
};

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  // Импорт реальных данных через API
  const importTechnologies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Используем JSONPlaceholder API для получения реальных данных
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiData = await response.json();
      
      // Преобразуем данные API в технологии
      const importedTechnologies = transformApiDataToTechnologies(apiData);
      
      // Добавляем импортированные технологии к существующим
      setTechnologies(prev => [...prev, ...importedTechnologies]);
      
      return {
        success: true,
        count: importedTechnologies.length,
        message: `Успешно загружено ${importedTechnologies.length} новых технологий из API!`
      };
      
    } catch (err) {
      const errorMessage = `Ошибка загрузки: ${err.message}`;
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    technologies,
    updateStatus,
    markAllCompleted,
    resetAllStatuses,
    importTechnologies,
    loading,
    error
  };
}

export default useTechnologies;