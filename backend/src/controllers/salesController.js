/**
 * Sales Controller
 * Handles HTTP requests and responses for sales endpoints
 */

/**
 * Parse comma-separated string to array
 */
function parseArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(',').map(v => v.trim()).filter(v => v);
}

/**
 * GET /api/sales
 * Query sales records with filters, search, sort, and pagination
 */
export async function getSales(req, res, next) {
  try {
    const queryParams = {
      search: req.query.search || '',
      regions: parseArray(req.query.regions),
      genders: parseArray(req.query.genders),
      ageMin: req.query.ageMin,
      ageMax: req.query.ageMax,
      categories: parseArray(req.query.categories),
      tags: parseArray(req.query.tags),
      paymentMethods: parseArray(req.query.paymentMethods),
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      sortBy: req.query.sortBy || 'date',
      page: req.query.page,
      pageSize: req.query.pageSize
    };

    const result = req.salesService.querySales(queryParams);
    res.json(result);

  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/sales/filter-options
 * Get available filter options
 */
export async function getFilterOptions(req, res, next) {
  try {
    const result = req.salesService.getFilterOptions();
    res.json(result);
  } catch (error) {
    next(error);
  }
}
