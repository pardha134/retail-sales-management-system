/**
 * Error handling middleware
 * Centralized error handling for the application
 */

export function errorHandler(err, req, res, next) {
  // Log error for debugging
  console.error('Error:', err.message);
  console.error(err.stack);

  // Determine status code
  let statusCode = err.status || err.statusCode || 500;
  
  // Handle specific error types
  if (err.message.includes('not found')) {
    statusCode = 404;
  } else if (err.message.includes('Invalid') || err.message.includes('validation')) {
    statusCode = 400;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal server error'
  });
}
