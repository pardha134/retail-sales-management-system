import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataLoader } from './utils/dataLoader.js';
import { SalesService } from './services/salesService.js';
import { createSalesRouter } from './routes/salesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CSV_FILE_PATH = process.env.CSV_FILE_PATH || './data/sales_data.csv';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Initialize data loader and service
const dataLoader = new DataLoader(CSV_FILE_PATH);
const salesService = new SalesService(dataLoader);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Mount sales routes
app.use('/api/sales', createSalesRouter(salesService));

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    console.log('🚀 Starting Retail Sales Management System...');
    console.log(`📁 Loading data from: ${CSV_FILE_PATH}`);
    
    // Load data on startup
    await salesService.initialize();
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ API available at: http://localhost:${PORT}/api/sales`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
