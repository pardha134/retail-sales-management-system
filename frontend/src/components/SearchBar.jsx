import { useState, useEffect } from 'react';

/**
 * SearchBar Component
 * Provides search input with debouncing
 */
export function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search by customer name or phone number..."
          className="w-full pl-12 pr-24 py-4 glass rounded-xl border-2 border-transparent focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 text-gray-900 placeholder-gray-500 shadow-lg"
          aria-label="Search sales records"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all btn-ripple"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
