import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSales } from '../services/api';
import { parseQueryParams, buildQueryParams } from '../utils/queryState';

/**
 * Custom hook for managing sales query state
 * Handles search, filters, sorting, pagination, and URL synchronization
 */
export function useSalesQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse initial state from URL
  const initialState = parseQueryParams(searchParams);
  
  // State
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState(initialState.search);
  const [filters, setFilters] = useState(initialState.filters);
  const [sortBy, setSortBy] = useState(initialState.sortBy);
  const [page, setPage] = useState(initialState.page);

  // Debounce timer ref
  const debounceTimer = useRef(null);

  // Fetch data function
  const fetchData = useCallback(async (queryState) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchSales({
        search: queryState.search,
        ...queryState.filters,
        sortBy: queryState.sortBy,
        page: queryState.page,
        pageSize: 10
      });

      setData(response.data);
      setMetadata(response.metadata);
    } catch (err) {
      setError(err.message);
      setData([]);
      setMetadata({ total: 0, page: 1, pageSize: 10, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, []);

  // Update URL and fetch data (debounced)
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Build query state
    const queryState = { search, filters, sortBy, page };

    // Update URL
    const params = buildQueryParams(queryState);
    setSearchParams(params, { replace: true });

    // Debounce API call (300ms)
    debounceTimer.current = setTimeout(() => {
      fetchData(queryState);
    }, 300);

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search, filters, sortBy, page, fetchData, setSearchParams]);

  // Update search
  const updateSearch = useCallback((newSearch) => {
    setSearch(newSearch);
    setPage(1); // Reset to first page
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page
  }, []);

  // Update sort
  const updateSort = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setPage(1); // Reset to first page
  }, []);

  // Update page
  const updatePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
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
    setPage(1);
  }, []);

  return {
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
    updatePage,
    clearFilters
  };
}
