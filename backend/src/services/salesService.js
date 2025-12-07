import { applySearch, applyFilters, applySorting, applyPagination } from '../utils/filters.js';

/**
 * Sales Service
 * Business logic layer for sales operations
 */
export class SalesService {
  constructor(dataLoader) {
    this.dataLoader = dataLoader;
  }

  /**
   * Initialize service by loading data
   */
  async initialize() {
    await this.dataLoader.loadData();
  }

  /**
   * Query sales records with search, filters, sorting, and pagination
   */
  querySales(queryParams) {
    try {
      // Get all records
      let records = this.dataLoader.getData();

      // Extract and validate parameters
      const {
        search = '',
        regions = [],
        genders = [],
        ageMin,
        ageMax,
        categories = [],
        tags = [],
        paymentMethods = [],
        dateFrom,
        dateTo,
        sortBy = 'date',
        page = 1,
        pageSize = 10
      } = queryParams;

      // Validate numeric parameters
      const validatedPage = Math.max(1, parseInt(page) || 1);
      const validatedPageSize = Math.max(1, Math.min(100, parseInt(pageSize) || 10));
      const validatedAgeMin = ageMin !== undefined && ageMin !== null ? parseInt(ageMin) : null;
      const validatedAgeMax = ageMax !== undefined && ageMax !== null ? parseInt(ageMax) : null;

      // Validate age range
      if (validatedAgeMin !== null && validatedAgeMax !== null && validatedAgeMin > validatedAgeMax) {
        throw new Error('Invalid age range: ageMin cannot be greater than ageMax');
      }

      // Validate date range
      if (dateFrom && dateTo) {
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        if (from > to) {
          throw new Error('Invalid date range: dateFrom cannot be after dateTo');
        }
      }

      // Apply operations in sequence: search → filters → sort → paginate
      
      // 1. Apply search
      records = applySearch(records, search);

      // 2. Apply filters
      const filters = {
        regions: Array.isArray(regions) ? regions : [],
        genders: Array.isArray(genders) ? genders : [],
        ageMin: validatedAgeMin,
        ageMax: validatedAgeMax,
        categories: Array.isArray(categories) ? categories : [],
        tags: Array.isArray(tags) ? tags : [],
        paymentMethods: Array.isArray(paymentMethods) ? paymentMethods : [],
        dateFrom,
        dateTo
      };
      records = applyFilters(records, filters);

      // 3. Apply sorting
      records = applySorting(records, sortBy);

      // 4. Apply pagination
      const result = applyPagination(records, validatedPage, validatedPageSize);

      return {
        success: true,
        data: result.data,
        metadata: result.metadata
      };

    } catch (error) {
      throw error;
    }
  }

  /**
   * Get available filter options
   */
  getFilterOptions() {
    try {
      const regions = this.dataLoader.getUniqueValues('customerRegion');
      const genders = this.dataLoader.getUniqueValues('gender');
      const categories = this.dataLoader.getUniqueValues('productCategory');
      const tags = this.dataLoader.getUniqueValues('tags');
      const paymentMethods = this.dataLoader.getUniqueValues('paymentMethod');
      const ageRange = this.dataLoader.getNumericRange('age');
      const dateRange = this.dataLoader.getDateRange();

      return {
        success: true,
        data: {
          regions,
          genders,
          categories,
          tags,
          paymentMethods,
          ageRange,
          dateRange: {
            min: dateRange.min ? dateRange.min.toISOString().split('T')[0] : null,
            max: dateRange.max ? dateRange.max.toISOString().split('T')[0] : null
          }
        }
      };
    } catch (error) {
      throw error;
    }
  }
}
