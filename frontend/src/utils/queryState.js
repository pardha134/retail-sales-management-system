/**
 * Query State Utility
 * Helper functions for URL parameter management
 */

/**
 * Parse URL search params to state object
 */
export function parseQueryParams(searchParams) {
  const state = {
    search: searchParams.get('search') || '',
    filters: {
      regions: parseArray(searchParams.get('regions')),
      genders: parseArray(searchParams.get('genders')),
      ageMin: parseNumber(searchParams.get('ageMin')),
      ageMax: parseNumber(searchParams.get('ageMax')),
      categories: parseArray(searchParams.get('categories')),
      tags: parseArray(searchParams.get('tags')),
      paymentMethods: parseArray(searchParams.get('paymentMethods')),
      dateFrom: searchParams.get('dateFrom') || '',
      dateTo: searchParams.get('dateTo') || ''
    },
    sortBy: searchParams.get('sortBy') || 'date',
    page: parseInt(searchParams.get('page')) || 1
  };

  return state;
}

/**
 * Build URL search params from state object
 */
export function buildQueryParams(state) {
  const params = new URLSearchParams();

  // Add search
  if (state.search) {
    params.set('search', state.search);
  }

  // Add filters
  if (state.filters.regions?.length > 0) {
    params.set('regions', state.filters.regions.join(','));
  }
  if (state.filters.genders?.length > 0) {
    params.set('genders', state.filters.genders.join(','));
  }
  if (state.filters.ageMin !== null && state.filters.ageMin !== undefined) {
    params.set('ageMin', state.filters.ageMin);
  }
  if (state.filters.ageMax !== null && state.filters.ageMax !== undefined) {
    params.set('ageMax', state.filters.ageMax);
  }
  if (state.filters.categories?.length > 0) {
    params.set('categories', state.filters.categories.join(','));
  }
  if (state.filters.tags?.length > 0) {
    params.set('tags', state.filters.tags.join(','));
  }
  if (state.filters.paymentMethods?.length > 0) {
    params.set('paymentMethods', state.filters.paymentMethods.join(','));
  }
  if (state.filters.dateFrom) {
    params.set('dateFrom', state.filters.dateFrom);
  }
  if (state.filters.dateTo) {
    params.set('dateTo', state.filters.dateTo);
  }

  // Add sorting
  if (state.sortBy && state.sortBy !== 'date') {
    params.set('sortBy', state.sortBy);
  }

  // Add pagination
  if (state.page && state.page !== 1) {
    params.set('page', state.page);
  }

  return params;
}

/**
 * Parse comma-separated string to array
 */
function parseArray(value) {
  if (!value) return [];
  return value.split(',').map(v => v.trim()).filter(v => v);
}

/**
 * Parse string to number
 */
function parseNumber(value) {
  if (!value) return null;
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}

/**
 * Serialize filters to URL format
 */
export function serializeFilters(filters) {
  const params = {};

  if (filters.regions?.length > 0) {
    params.regions = filters.regions.join(',');
  }
  if (filters.genders?.length > 0) {
    params.genders = filters.genders.join(',');
  }
  if (filters.ageMin !== null && filters.ageMin !== undefined) {
    params.ageMin = filters.ageMin;
  }
  if (filters.ageMax !== null && filters.ageMax !== undefined) {
    params.ageMax = filters.ageMax;
  }
  if (filters.categories?.length > 0) {
    params.categories = filters.categories.join(',');
  }
  if (filters.tags?.length > 0) {
    params.tags = filters.tags.join(',');
  }
  if (filters.paymentMethods?.length > 0) {
    params.paymentMethods = filters.paymentMethods.join(',');
  }
  if (filters.dateFrom) {
    params.dateFrom = filters.dateFrom;
  }
  if (filters.dateTo) {
    params.dateTo = filters.dateTo;
  }

  return params;
}

/**
 * Deserialize URL params to filters object
 */
export function deserializeFilters(params) {
  return {
    regions: parseArray(params.regions),
    genders: parseArray(params.genders),
    ageMin: parseNumber(params.ageMin),
    ageMax: parseNumber(params.ageMax),
    categories: parseArray(params.categories),
    tags: parseArray(params.tags),
    paymentMethods: parseArray(params.paymentMethods),
    dateFrom: params.dateFrom || '',
    dateTo: params.dateTo || ''
  };
}
