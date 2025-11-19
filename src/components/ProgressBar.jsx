import './ProgressBar.css'; // Добавляем импорт CSS

function ProgressBar({
  progress,
  label = '',
  color = '#4CAF50',
  height = 20,
  showPercentage = true,
  animated = false
}) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-wrapper">
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}
      
      <div
        className="progress-bar-outer"
        style={{
          height: `${height}px`,
        }}
      >
        <div
          className={`progress-bar-inner ${animated ? 'animated' : ''}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;