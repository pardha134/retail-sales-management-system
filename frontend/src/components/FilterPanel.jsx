import { useState } from 'react';

/**
 * FilterPanel Component
 * Multi-select filters with collapsible sections
 */
export function FilterPanel({ filters, filterOptions, onChange }) {
  const [expandedSections, setExpandedSections] = useState({
    regions: true,
    genders: true,
    age: true,
    categories: false,
    tags: false,
    payment: false,
    date: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onChange({ ...filters, [category]: newValues });
  };

  const handleRangeChange = (field, value) => {
    onChange({ ...filters, [field]: value || null });
  };

  const handleClearAll = () => {
    onChange({
      regions: [],
      genders: [],
      ageMin: null,
      ageMax: null,
      categories: [],
      tags: [],
      paymentMethods: [],
      dateFrom: '',
      dateTo: ''
    });
  };

  const activeFilterCount = [
    filters.regions?.length || 0,
    filters.genders?.length || 0,
    (filters.ageMin !== null || filters.ageMax !== null) ? 1 : 0,
    filters.categories?.length || 0,
    filters.tags?.length || 0,
    filters.paymentMethods?.length || 0,
    (filters.dateFrom || filters.dateTo) ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="glass rounded-xl p-5 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-md pulse">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline transition-all"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Customer Region */}
        <FilterSection
          title="Customer Region"
          isExpanded={expandedSections.regions}
          onToggle={() => toggleSection('regions')}
        >
          <CheckboxGroup
            options={filterOptions.regions || []}
            selected={filters.regions || []}
            onChange={(value) => handleCheckboxChange('regions', value)}
          />
        </FilterSection>

        {/* Gender */}
        <FilterSection
          title="Gender"
          isExpanded={expandedSections.genders}
          onToggle={() => toggleSection('genders')}
        >
          <CheckboxGroup
            options={filterOptions.genders || []}
            selected={filters.genders || []}
            onChange={(value) => handleCheckboxChange('genders', value)}
          />
        </FilterSection>

        {/* Age Range */}
        <FilterSection
          title="Age Range"
          isExpanded={expandedSections.age}
          onToggle={() => toggleSection('age')}
        >
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin || ''}
              onChange={(e) => handleRangeChange('ageMin', e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              min={filterOptions.ageRange?.min}
              max={filterOptions.ageRange?.max}
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax || ''}
              onChange={(e) => handleRangeChange('ageMax', e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              min={filterOptions.ageRange?.min}
              max={filterOptions.ageRange?.max}
            />
          </div>
        </FilterSection>

        {/* Product Category */}
        <FilterSection
          title="Product Category"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <CheckboxGroup
            options={filterOptions.categories || []}
            selected={filters.categories || []}
            onChange={(value) => handleCheckboxChange('categories', value)}
          />
        </FilterSection>

        {/* Tags */}
        <FilterSection
          title="Tags"
          isExpanded={expandedSections.tags}
          onToggle={() => toggleSection('tags')}
        >
          <CheckboxGroup
            options={filterOptions.tags || []}
            selected={filters.tags || []}
            onChange={(value) => handleCheckboxChange('tags', value)}
          />
        </FilterSection>

        {/* Payment Method */}
        <FilterSection
          title="Payment Method"
          isExpanded={expandedSections.payment}
          onToggle={() => toggleSection('payment')}
        >
          <CheckboxGroup
            options={filterOptions.paymentMethods || []}
            selected={filters.paymentMethods || []}
            onChange={(value) => handleCheckboxChange('paymentMethods', value)}
          />
        </FilterSection>

        {/* Date Range */}
        <FilterSection
          title="Date Range"
          isExpanded={expandedSections.date}
          onToggle={() => toggleSection('date')}
        >
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => handleRangeChange('dateFrom', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              min={filterOptions.dateRange?.min}
              max={filterOptions.dateRange?.max}
            />
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => handleRangeChange('dateTo', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              min={filterOptions.dateRange?.min}
              max={filterOptions.dateRange?.max}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({ title, isExpanded, onToggle, children }) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left font-semibold text-gray-800 hover:text-purple-600 transition-colors group py-2"
      >
        <span className="flex items-center gap-2">
          <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {title}
        </span>
        <span className={`text-sm px-2 py-1 rounded-full transition-all ${isExpanded ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
          {isExpanded ? 'Hide' : 'Show'}
        </span>
      </button>
      {isExpanded && (
        <div className="mt-3 max-h-48 overflow-y-auto pr-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 text-sm cursor-pointer hover:bg-purple-50 p-2 rounded-lg transition-all group">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 cursor-pointer"
          />
          <span className="text-gray-700 group-hover:text-purple-900 font-medium">{option}</span>
          {selected.includes(option) && (
            <svg className="w-4 h-4 text-purple-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </label>
      ))}
    </div>
  );
}
