import express from 'express';
import { getSales, getFilterOptions } from '../controllers/salesController.js';

/**
 * Sales Routes
 * Define API endpoints for sales operations
 */

export function createSalesRouter(salesService) {
  const router = express.Router();

  // Middleware to attach salesService to request
  router.use((req, res, next) => {
    req.salesService = salesService;
    next();
  });

  // GET /api/sales - Query sales records
  router.get('/', getSales);

  // GET /api/sales/filter-options - Get available filter values
  router.get('/filter-options', getFilterOptions);

  return router;
}
