import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ onMarkAllCompleted, onResetAll, onImport, loading, error }) {
  const [showImportModal, setShowImportModal] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const handleImport = async () => {
    setImportResult(null);
    
    const result = await onImport();
    setImportResult(result);
    setShowImportModal(true);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn btn-success">
          ☑ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="btn btn-warning">
          ↶ Сбросить все статусы
        </button>
        <button 
          onClick={handleImport} 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? '🔄 Загрузка из API...' : '📥 Импорт из API'}
        </button>
      </div>

      <Modal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Импорт данных из API"
      >
        {importResult && (
          <div className="import-result">
            {importResult.success ? (
              <div className="import-success">
                <div className="success-icon">✅</div>
                <h4>Импорт выполнен успешно!</h4>
                <p>{importResult.message}</p>
                <div className="import-details">
                  <p><strong>Что было добавлено:</strong></p>
                  <ul>
                    <li>API Integration</li>
                    <li>HTTP Requests</li>
                    <li>Async/Await</li>
                    <li>Error Handling</li>
                    <li>Data Transformation</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="import-error">
                <div className="error-icon">❌</div>
                <h4>Ошибка импорта</h4>
                <p>{importResult.message}</p>
                <p className="error-hint">
                  Проверьте подключение к интернету и попробуйте снова.
                </p>
              </div>
            )}
            <button 
              onClick={() => setShowImportModal(false)}
              className="btn btn-primary"
            >
              Закрыть
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default QuickActions;