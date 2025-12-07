/**
 * SortDropdown Component
 * Dropdown for selecting sort order
 */
export function SortDropdown({ value, onChange }) {
  const sortOptions = [
    { value: 'date', label: 'Date (Newest First)' },
    { value: 'quantity', label: 'Quantity (High to Low)' },
    { value: 'customerName', label: 'Customer Name (A-Z)' }
  ];

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-select" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white hover:border-purple-300 transition-all cursor-pointer font-medium text-gray-700 shadow-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
