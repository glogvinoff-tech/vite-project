import { useState, useEffect } from 'react';
import './Settings.css';

function Settings({ technologies, onResetAll, onExportData, onImportData }) {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'ru',
    notifications: true,
    autoSave: true
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('app-settings', JSON.stringify(newSettings));
    
    // Применяем настройки темы
    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value);
    }
  };

  const handleExport = () => {
    const data = {
      technologies,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technology-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.technologies && Array.isArray(data.technologies)) {
            onImportData(data.technologies);
            alert(`Успешно импортировано ${data.technologies.length} технологий`);
          }
        } catch (error) {
          alert('Ошибка при импорте файла');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const handleResetAll = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
      onResetAll();
    }
  };

  return (
    <div className="settings-page">
      <h1>⚙️ Настройки приложения</h1>
      
      <div className="settings-sections">
        {/* Настройки внешнего вида */}
        <div className="settings-section">
          <h2>Внешний вид</h2>
          <div className="setting-item">
            <label>Тема оформления</label>
            <select 
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
              <option value="auto">Системная</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label>Язык интерфейса</label>
            <select 
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Настройки уведомлений */}
        <div className="settings-section">
          <h2>Уведомления</h2>
          <div className="setting-item toggle">
            <label>
              <input 
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Включить уведомления
            </label>
          </div>
          
          <div className="setting-item toggle">
            <label>
              <input 
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Автосохранение
            </label>
          </div>
        </div>

        {/* Управление данными */}
        <div className="settings-section">
          <h2>Управление данными</h2>
          <div className="data-actions">
            <button onClick={handleExport} className="btn btn-primary">
              📤 Экспорт данных
            </button>
            
            <label className="btn btn-secondary">
              📥 Импорт данных
              <input 
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
            
            <button onClick={handleResetAll} className="btn btn-danger">
              🗑️ Сбросить все данные
            </button>
          </div>
          
          <div className="data-info">
            <p><strong>Статистика данных:</strong></p>
            <ul>
              <li>Всего технологий: {technologies.length}</li>
              <li>Завершено: {technologies.filter(t => t.status === 'completed').length}</li>
              <li>В процессе: {technologies.filter(t => t.status === 'in-progress').length}</li>
              <li>Не начато: {technologies.filter(t => t.status === 'not-started').length}</li>
            </ul>
          </div>
        </div>

        {/* Информация о приложении */}
        <div className="settings-section">
          <h2>О приложении</h2>
          <div className="app-info">
            <p><strong>Трекер изучения технологий</strong></p>
            <p>Версия: 1.0.0</p>
            <p>Разработано с использованием React и Vite</p>
            <p>Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;