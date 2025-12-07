import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * Fetch sales records with query parameters
 */
export async function fetchSales(queryParams) {
  const params = new URLSearchParams();

  // Add search
  if (queryParams.search) {
    params.append('search', queryParams.search);
  }

  // Add filters
  if (queryParams.regions?.length > 0) {
    params.append('regions', queryParams.regions.join(','));
  }
  if (queryParams.genders?.length > 0) {
    params.append('genders', queryParams.genders.join(','));
  }
  if (queryParams.ageMin !== null && queryParams.ageMin !== undefined) {
    params.append('ageMin', queryParams.ageMin);
  }
  if (queryParams.ageMax !== null && queryParams.ageMax !== undefined) {
    params.append('ageMax', queryParams.ageMax);
  }
  if (queryParams.categories?.length > 0) {
    params.append('categories', queryParams.categories.join(','));
  }
  if (queryParams.tags?.length > 0) {
    params.append('tags', queryParams.tags.join(','));
  }
  if (queryParams.paymentMethods?.length > 0) {
    params.append('paymentMethods', queryParams.paymentMethods.join(','));
  }
  if (queryParams.dateFrom) {
    params.append('dateFrom', queryParams.dateFrom);
  }
  if (queryParams.dateTo) {
    params.append('dateTo', queryParams.dateTo);
  }

  // Add sorting
  if (queryParams.sortBy) {
    params.append('sortBy', queryParams.sortBy);
  }

  // Add pagination
  if (queryParams.page) {
    params.append('page', queryParams.page);
  }
  if (queryParams.pageSize) {
    params.append('pageSize', queryParams.pageSize);
  }

  return apiClient.get(`/sales?${params.toString()}`);
}

/**
 * Fetch available filter options
 */
export async function fetchFilterOptions() {
  return apiClient.get('/sales/filter-options');
}
