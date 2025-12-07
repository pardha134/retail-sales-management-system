# Retail Sales Management System

## Overview

A full-stack web application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities. The system provides an intuitive interface for querying sales records across multiple dimensions including customer information, product details, and operational metrics. Built with a clean architecture separating backend API logic from frontend presentation.

## 🚀 Quick Start

### Start the Application
Double-click `start-all.bat` to launch both servers, then open http://localhost:5173 in your browser.

### Manual Start
**Terminal 1 (Backend):**
```bash
cd backend
node src/index.js
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Tech Stack

**Backend:**
- Node.js
- Express.js
- csv-parser
- cors
- dotenv

**Frontend:**
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

## Search Implementation Summary

The search functionality implements full-text search across customer name and phone number fields with case-insensitive matching. Search queries are debounced (300ms) on the frontend to reduce API calls while maintaining responsiveness. The backend uses efficient string matching with the `includes()` method on lowercased values. Search works seamlessly alongside active filters and sorting, maintaining all query state in the URL for shareability.

## Filter Implementation Summary

Multi-select filtering is implemented with AND logic between filter categories and OR logic within each category. Users can filter by Customer Region, Gender, Product Category, Tags, and Payment Method using checkboxes. Range-based filters support Age (min/max numeric inputs) and Date (from/to date pickers). The backend applies filters sequentially after search, using array methods for efficient filtering. Filter state is preserved in URL parameters and persists across page refreshes.

## Sorting Implementation Summary

Three sorting options are available: Date (Newest First - descending), Quantity (High to Low - descending), and Customer Name (A-Z - ascending). Sorting is applied after search and filters but before pagination. The backend uses JavaScript's native `sort()` method with custom comparators for each field type. Changing sort order resets pagination to page 1 while maintaining active search and filters.

## Pagination Implementation Summary

Pagination displays 10 items per page with Previous/Next navigation controls. The backend calculates total pages and returns metadata including current page, total records, and total pages. Page state is maintained in the URL and synchronized with all other query parameters. Navigation buttons are disabled appropriately on first/last pages. Changing filters or search automatically resets to page 1.

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
CSV_FILE_PATH=./data/sales_data.csv
```

5. Place your CSV dataset in `backend/data/sales_data.csv`

6. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Running Both Services

For development, run both backend and frontend in separate terminal windows:

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

## Project Structure

```
retail-sales-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/         # Business logic
│   │   ├── utils/           # Utilities (dataLoader, filters)
│   │   ├── routes/          # API routes
│   │   ├── models/          # Data models
│   │   ├── middleware/      # Express middleware
│   │   └── index.js         # Entry point
│   ├── data/                # CSV dataset
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API client
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   ├── styles/         # CSS files
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── docs/
│   └── architecture.md      # Architecture documentation
│
└── README.md               # This file
```

## API Endpoints

### GET /api/sales
Query sales records with filters, search, sort, and pagination.

**Query Parameters:**
- `search` - Search query
- `regions` - Comma-separated regions
- `genders` - Comma-separated genders
- `ageMin`, `ageMax` - Age range
- `categories` - Comma-separated categories
- `tags` - Comma-separated tags
- `paymentMethods` - Comma-separated payment methods
- `dateFrom`, `dateTo` - Date range (YYYY-MM-DD)
- `sortBy` - Sort field (date|quantity|customerName)
- `page` - Page number
- `pageSize` - Items per page

### GET /api/sales/filter-options
Get available filter values for all categories.

## Features

- **Full-text Search**: Search across customer name and phone number
- **Multi-select Filters**: Filter by region, gender, category, tags, payment method
- **Range Filters**: Filter by age range and date range
- **Sorting**: Sort by date, quantity, or customer name
- **Pagination**: Navigate through results with 10 items per page
- **URL State**: All query parameters synced with URL for sharing
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and error handling
- **Accessibility**: ARIA labels and keyboard navigation

## Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with --watch flag for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Building for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## License

MIT
