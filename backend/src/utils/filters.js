/**
 * Filter utility functions
 * Implements search, filter, sort, and pagination logic
 */

/**
 * Apply search query to records
 * Searches across customerName and phoneNumber (case-insensitive)
 */
export function applySearch(records, searchQuery) {
  if (!searchQuery || searchQuery.trim() === '') {
    return records;
  }

  const query = searchQuery.toLowerCase().trim();

  return records.filter(record => {
    const customerName = (record.customerName || '').toLowerCase();
    const phoneNumber = (record.phoneNumber || '').toLowerCase();
    
    return customerName.includes(query) || phoneNumber.includes(query);
  });
}

/**
 * Apply filters to records
 * Implements AND logic between categories, OR within categories
 */
export function applyFilters(records, filters) {
  let filtered = records;

  // Filter by regions (OR logic within category)
  if (filters.regions && filters.regions.length > 0) {
    filtered = filtered.filter(record => 
      filters.regions.includes(record.customerRegion)
    );
  }

  // Filter by genders (OR logic within category)
  if (filters.genders && filters.genders.length > 0) {
    filtered = filtered.filter(record => 
      filters.genders.includes(record.gender)
    );
  }

  // Filter by age range (inclusive)
  if (filters.ageMin !== undefined && filters.ageMin !== null) {
    filtered = filtered.filter(record => 
      record.age !== null && record.age >= filters.ageMin
    );
  }
  if (filters.ageMax !== undefined && filters.ageMax !== null) {
    filtered = filtered.filter(record => 
      record.age !== null && record.age <= filters.ageMax
    );
  }

  // Filter by categories (OR logic within category)
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(record => 
      filters.categories.includes(record.productCategory)
    );
  }

  // Filter by tags (OR logic within category)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(record => 
      filters.tags.includes(record.tags)
    );
  }

  // Filter by payment methods (OR logic within category)
  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    filtered = filtered.filter(record => 
      filters.paymentMethods.includes(record.paymentMethod)
    );
  }

  // Filter by date range (inclusive)
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    filtered = filtered.filter(record => 
      record.date !== null && record.date >= fromDate
    );
  }
  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    toDate.setHours(23, 59, 59, 999); // Include entire day
    filtered = filtered.filter(record => 
      record.date !== null && record.date <= toDate
    );
  }

  return filtered;
}

/**
 * Apply sorting to records
 * Supports: date (desc), quantity (desc), customerName (asc)
 */
export function applySorting(records, sortBy) {
  if (!sortBy) {
    return records;
  }

  const sorted = [...records];

  switch (sortBy) {
    case 'date':
      // Date - Newest First (descending)
      sorted.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.getTime() - a.date.getTime();
      });
      break;

    case 'quantity':
      // Quantity - High to Low (descending)
      sorted.sort((a, b) => {
        const qtyA = a.quantity || 0;
        const qtyB = b.quantity || 0;
        return qtyB - qtyA;
      });
      break;

    case 'customerName':
      // Customer Name - A to Z (ascending)
      sorted.sort((a, b) => {
        const nameA = (a.customerName || '').toLowerCase();
        const nameB = (b.customerName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
      break;

    default:
      // No sorting
      break;
  }

  return sorted;
}

/**
 * Apply pagination to records
 * Returns slice of data with metadata
 */
export function applyPagination(records, page = 1, pageSize = 10) {
  const total = records.length;
  const totalPages = Math.ceil(total / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const data = records.slice(startIndex, endIndex);

  return {
    data,
    metadata: {
      total,
      page: currentPage,
      pageSize,
      totalPages: totalPages || 1
    }
  };
}
