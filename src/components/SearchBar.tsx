
import { useState, useEffect, useRef } from 'react';
import { Search, X, User } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SearchBar = ({ value, onChange, suggestions, onSuggestionClick }: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    onChange('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div 
        className={`relative transition-all duration-300 ${
          isFocused ? 'transform scale-105' : ''
        }`}
      >
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full p-4 pl-12 pr-10 border-2 rounded-full border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg transition-all duration-300"
          placeholder="Search doctors by name..."
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          aria-label="Search doctors"
        />
        <Search 
          className="absolute left-4 top-4 text-white/70" 
          size={20}
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-2 rounded-lg shadow-xl max-h-60 overflow-auto animate-slide-down">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              data-testid="suggestion-item"
              className="p-3 hover:bg-medical-50 cursor-pointer flex items-center gap-3 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-600">
                <User size={16} />
              </div>
              <span>Dr. {suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
