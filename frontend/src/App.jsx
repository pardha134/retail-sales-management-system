import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSalesQuery } from './hooks/useSalesQuery';
import { fetchFilterOptions } from './services/api';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { SortDropdown } from './components/SortDropdown';
import { SalesTable } from './components/SalesTable';
import { PaginationControls } from './components/PaginationControls';

function AppContent() {
  const {
    data,
    metadata,
    loading,
    error,
    filters,
    search,
    sortBy,
    page,
    updateSearch,
    updateFilters,
    updateSort,
    updatePage
  } = useSalesQuery();

  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: 0, max: 100 },
    dateRange: { min: null, max: null }
  });

  // Fetch filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const response = await fetchFilterOptions();
        setFilterOptions(response.data);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };

    loadFilterOptions();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header with gradient */}
      <header className="glass shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text flex items-center gap-3">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Retail Sales Management
              </h1>
              <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search, filter, and analyze sales data with powerful insights
              </p>
            </div>
            {!loading && (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{metadata.total}</div>
                  <div className="text-xs text-gray-500">Total Records</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1 fade-in">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                filterOptions={filterOptions}
                onChange={updateFilters}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6 fade-in">
            {/* Search Bar */}
            <div className="card-hover">
              <SearchBar value={search} onChange={updateSearch} />
            </div>

            {/* Stats and Sort Bar */}
            <div className="glass rounded-xl p-4 shadow-lg card-hover">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <SortDropdown value={sortBy} onChange={updateSort} />
                
                {!loading && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold text-purple-900">{metadata.total}</span>
                      <span className="text-purple-600">results found</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sales Table */}
            <div className="card-hover">
              <SalesTable data={data} loading={loading} error={error} />
            </div>

            {/* Pagination */}
            {!loading && !error && data.length > 0 && (
              <div className="card-hover">
                <PaginationControls
                  currentPage={metadata.page}
                  totalPages={metadata.totalPages}
                  totalRecords={metadata.total}
                  onPageChange={updatePage}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass mt-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Retail Sales Management System © 2024
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                System Online
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
