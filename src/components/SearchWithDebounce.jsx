import { useState, useEffect, useRef } from 'react';
import './SearchWithDebounce.css';

function SearchWithDebounce({ onSearch, placeholder = "Поиск технологий...", delay = 500 }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef(null);

  // Сброс таймера при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsSearching(true);

    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймер для debounce
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
      setIsSearching(false);
    }, delay);
  };

  const handleClear = () => {
    setQuery('');
    setIsSearching(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    onSearch('');
  };

  return (
    <div className="search-with-debounce">
      <div className="search-input-container">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        
        <div className="search-icons">
          {isSearching && (
            <div className="search-spinner"></div>
          )}
          
          {query && !isSearching && (
            <button 
              onClick={handleClear}
              className="clear-button"
              type="button"
            >
              ✕
            </button>
          )}
          
          {!query && !isSearching && (
            <span className="search-icon">🔍</span>
          )}
        </div>
      </div>
      
      {isSearching && (
        <div className="search-status">Поиск...</div>
      )}
    </div>
  );
}

export default SearchWithDebounce;