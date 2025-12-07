# Retail Sales Management System - Backend

Backend API for the Retail Sales Management System built with Node.js and Express.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- CSV dataset file

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
CSV_FILE_PATH=./data/sales_data.csv
```

4. Place your CSV dataset in the `data` folder as `sales_data.csv`

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /api/sales

Query sales records with search, filters, sorting, and pagination.

**Query Parameters:**
- `search` (string): Search query for customer name or phone number
- `regions` (comma-separated): Filter by customer regions
- `genders` (comma-separated): Filter by gender
- `ageMin` (number): Minimum age filter
- `ageMax` (number): Maximum age filter
- `categories` (comma-separated): Filter by product categories
- `tags` (comma-separated): Filter by product tags
- `paymentMethods` (comma-separated): Filter by payment methods
- `dateFrom` (ISO date): Start date filter (YYYY-MM-DD)
- `dateTo` (ISO date): End date filter (YYYY-MM-DD)
- `sortBy` (string): Sort field - `date`, `quantity`, or `customerName`
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10, max: 100)

**Example Request:**
```
GET /api/sales?search=john&regions=North,South&sortBy=date&page=1&pageSize=10
```

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "customerId": "C001",
      "customerName": "John Doe",
      "phoneNumber": "555-1234",
      "gender": "Male",
      "age": 35,
      ...
    }
  ],
  "metadata": {
    "total": 150,
    "page": 1,
    "pageSize": 10,
    "totalPages": 15
  }
}
```

### GET /api/sales/filter-options

Get available filter values for all filter categories.

**Response Format:**
```json
{
  "success": true,
  "data": {
    "regions": ["North", "South", "East", "West"],
    "genders": ["Male", "Female"],
    "categories": ["Electronics", "Clothing", ...],
    "tags": ["Premium", "Sale", ...],
    "paymentMethods": ["Credit Card", "Cash", ...],
    "ageRange": { "min": 18, "max": 80 },
    "dateRange": { "min": "2023-01-01", "max": "2023-12-31" }
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

**Status Codes:**
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## Architecture

The backend follows a layered architecture:

```
Routes → Controllers → Services → Utils
```

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic layer
- **Utils**: Reusable utilities (data loading, filtering)

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── utils/          # Utilities (dataLoader, filters)
│   ├── routes/         # API routes
│   ├── models/         # Data models
│   ├── middleware/     # Express middleware
│   └── index.js        # Entry point
├── data/               # CSV dataset
├── package.json
└── README.md
```
