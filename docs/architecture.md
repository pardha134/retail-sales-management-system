# Architecture Documentation

## System Overview

The Retail Sales Management System is a full-stack web application built with a clear separation between backend and frontend. The backend provides a RESTful API for data operations, while the frontend delivers an interactive user interface for querying and visualizing sales data.

## Backend Architecture

### Layered Architecture Pattern

The backend follows a layered architecture with clear separation of concerns:

```
HTTP Request
    ↓
Routes Layer (salesRoutes.js)
    ↓
Controller Layer (salesController.js)
    ↓
Service Layer (salesService.js)
    ↓
Utility Layer (dataLoader.js, filters.js)
    ↓
Data Source (CSV File)
```

### Layer Responsibilities

**1. Routes Layer** (`routes/salesRoutes.js`)
- Defines API endpoints and HTTP methods
- Maps URLs to controller functions
- Attaches service instances to requests
- Minimal logic, primarily routing configuration

**2. Controller Layer** (`controllers/salesController.js`)
- Handles HTTP request/response cycle
- Extracts and validates query parameters
- Parses comma-separated values into arrays
- Calls service layer methods
- Formats responses with appropriate status codes
- Delegates error handling to middleware

**3. Service Layer** (`services/salesService.js`)
- Contains business logic
- Orchestrates data operations
- Validates query parameters (ranges, types)
- Chains operations: search → filter → sort → paginate
- Returns structured responses with data and metadata
- Handles edge cases (empty results, invalid ranges)

**4. Utility Layer** (`utils/`)
- **dataLoader.js**: Loads and caches CSV data in memory
  - Parses CSV file on startup
  - Transforms raw data to structured records
  - Provides methods to extract unique filter values
  - Calculates numeric and date ranges
  
- **filters.js**: Pure functions for data operations
  - `applySearch()`: Case-insensitive text search
  - `applyFilters()`: Multi-criteria filtering with AND/OR logic
  - `applySorting()`: Sorts by date, quantity, or name
  - `applyPagination()`: Slices data and returns metadata

**5. Model Layer** (`models/salesRecord.js`)
- Defines data structure and schema
- Validates and transforms field types
- Handles missing/null values gracefully
- Maps CSV columns to object properties

**6. Middleware Layer** (`middleware/errorHandler.js`)
- Centralized error handling
- Logs errors for debugging
- Returns consistent error responses
- Maps error types to HTTP status codes

### Data Flow

1. Client sends HTTP GET request to `/api/sales?search=john&regions=North&sortBy=date&page=1`
2. Express routes request to `getSales` controller
3. Controller extracts query parameters and calls `salesService.querySales()`
4. Service validates parameters and retrieves cached data from DataLoader
5. Service applies operations sequentially:
   - Search: Filters records matching "john" in name/phone
   - Filters: Applies region filter (North)
   - Sort: Sorts by date descending
   - Paginate: Returns page 1 (records 1-10)
6. Service returns structured response with data and metadata
7. Controller sends JSON response to client

### Key Design Decisions

**In-Memory Data Storage**
- CSV loaded once on startup and cached in memory
- Fast query performance (no disk I/O per request)
- Suitable for datasets up to several hundred thousand records
- Trade-off: Memory usage vs. query speed

**Stateless API**
- No session management required
- Each request is independent
- Easy to scale horizontally
- Client manages query state

**Functional Utilities**
- Pure functions for filtering, sorting, pagination
- Easy to test in isolation
- Reusable across different contexts
- No side effects

## Frontend Architecture

### Component-Based Architecture

The frontend uses React's component-based architecture with custom hooks for state management:

```
App Component
    ├── SearchBar
    ├── FilterPanel
    ├── SortDropdown
    ├── SalesTable
    └── PaginationControls
```

### Component Responsibilities

**1. App Component** (`App.jsx`)
- Root component that orchestrates the application
- Uses `useSalesQuery` hook for state management
- Fetches filter options on mount
- Passes props to child components
- Manages layout and responsive design

**2. SearchBar Component** (`components/SearchBar.jsx`)
- Controlled input component
- Local state for immediate UI updates
- Calls parent onChange handler
- Clear button to reset search
- ARIA labels for accessibility

**3. FilterPanel Component** (`components/FilterPanel.jsx`)
- Renders all filter categories
- Collapsible sections for better UX
- Multi-select checkboxes for categorical filters
- Range inputs for age and date
- Active filter count badge
- Clear all filters functionality

**4. SortDropdown Component** (`components/SortDropdown.jsx`)
- Simple select dropdown
- Three sort options: date, quantity, customerName
- Calls parent onChange handler

**5. SalesTable Component** (`components/SalesTable.jsx`)
- Displays sales records in a table
- Responsive design with horizontal scroll
- Loading skeleton state
- Empty state with helpful message
- Error state with error message
- Formats currency, percentages, and dates
- Color-coded order status badges

**6. PaginationControls Component** (`components/PaginationControls.jsx`)
- Previous/Next navigation buttons
- Disabled states for first/last pages
- Displays current page and total pages
- Shows total record count

### State Management

**Custom Hook: useSalesQuery** (`hooks/useSalesQuery.js`)

Centralizes all query state management:

**State Variables:**
- `data`: Array of sales records
- `metadata`: Pagination metadata (total, page, totalPages)
- `loading`: Boolean loading state
- `error`: Error message string
- `search`: Search query string
- `filters`: Object with all filter values
- `sortBy`: Current sort field
- `page`: Current page number

**State Update Functions:**
- `updateSearch(query)`: Updates search and resets page
- `updateFilters(filters)`: Updates filters and resets page
- `updateSort(sortBy)`: Updates sort and resets page
- `updatePage(page)`: Updates page number
- `clearFilters()`: Resets all filters

**Key Features:**
- Reads initial state from URL parameters
- Updates URL when state changes (via `useSearchParams`)
- Debounces API calls (300ms) to reduce server load
- Handles loading and error states
- Provides clean API for components

### URL State Management

**Query State Utility** (`utils/queryState.js`)

Handles serialization/deserialization of state to/from URL:

- `parseQueryParams(searchParams)`: Converts URL params to state object
- `buildQueryParams(state)`: Converts state object to URL params
- `serializeFilters(filters)`: Converts filters to URL format
- `deserializeFilters(params)`: Converts URL params to filters

**Benefits:**
- Shareable URLs with full query state
- Browser back/forward navigation works
- Page refresh preserves state
- Deep linking support

### API Service Layer

**API Client** (`services/api.js`)

Centralized API communication:

- Axios instance with base URL configuration
- Request interceptor for adding headers
- Response interceptor for error handling
- `fetchSales(queryParams)`: Fetches sales records
- `fetchFilterOptions()`: Fetches available filter values

**Error Handling:**
- Extracts error messages from responses
- Returns consistent error format
- Handles network errors gracefully

### Data Flow

1. User interacts with UI (types in search, selects filter, etc.)
2. Component calls update function from `useSalesQuery` hook
3. Hook updates local state
4. Hook updates URL parameters via `useSearchParams`
5. `useEffect` detects state change
6. Debounce timer starts (300ms)
7. After debounce, API call is made via `fetchSales()`
8. Loading state is set to true
9. API response received
10. Data and metadata state updated
11. Loading state set to false
12. Components re-render with new data

### Key Design Decisions

**URL as Single Source of Truth**
- All query state stored in URL
- Components read from URL on mount
- State changes update URL
- Enables sharing and bookmarking

**Debounced API Calls**
- 300ms delay after user stops typing
- Reduces server load
- Improves user experience
- Cancels pending requests on new input

**Component Composition**
- Small, focused components
- Props-based communication
- Easy to test and maintain
- Reusable across different contexts

**Custom Hook for State**
- Encapsulates complex state logic
- Provides clean API to components
- Easy to test in isolation
- Reduces component complexity

## Module Responsibilities

### Backend Modules

| Module | Responsibility | Dependencies |
|--------|---------------|--------------|
| `index.js` | Application entry point, server setup | Express, all modules |
| `salesRoutes.js` | Route definitions | Express, controllers |
| `salesController.js` | Request handling | Services |
| `salesService.js` | Business logic | DataLoader, filters |
| `dataLoader.js` | CSV loading and caching | csv-parser, fs |
| `filters.js` | Data filtering utilities | None (pure functions) |
| `salesRecord.js` | Data model definition | None |
| `errorHandler.js` | Error handling middleware | None |

### Frontend Modules

| Module | Responsibility | Dependencies |
|--------|---------------|--------------|
| `main.jsx` | Application entry point | React, ReactDOM |
| `App.jsx` | Root component | All components, hooks |
| `useSalesQuery.js` | State management hook | React Router, API service |
| `api.js` | API communication | Axios |
| `queryState.js` | URL state utilities | None (pure functions) |
| `SearchBar.jsx` | Search input | React |
| `FilterPanel.jsx` | Filter controls | React |
| `SortDropdown.jsx` | Sort selection | React |
| `SalesTable.jsx` | Data display | React |
| `PaginationControls.jsx` | Page navigation | React |

## Folder Structure

```
retail-sales-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js      # HTTP request handlers
│   │   ├── services/
│   │   │   └── salesService.js         # Business logic
│   │   ├── utils/
│   │   │   ├── dataLoader.js           # CSV loading
│   │   │   └── filters.js              # Filter utilities
│   │   ├── routes/
│   │   │   └── salesRoutes.js          # API routes
│   │   ├── models/
│   │   │   └── salesRecord.js          # Data model
│   │   ├── middleware/
│   │   │   └── errorHandler.js         # Error handling
│   │   └── index.js                    # Entry point
│   ├── data/
│   │   └── sales_data.csv              # Dataset
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx           # Search component
│   │   │   ├── FilterPanel.jsx         # Filter component
│   │   │   ├── SortDropdown.jsx        # Sort component
│   │   │   ├── SalesTable.jsx          # Table component
│   │   │   └── PaginationControls.jsx  # Pagination component
│   │   ├── services/
│   │   │   └── api.js                  # API client
│   │   ├── hooks/
│   │   │   └── useSalesQuery.js        # State management hook
│   │   ├── utils/
│   │   │   └── queryState.js           # URL utilities
│   │   ├── styles/
│   │   │   └── main.css                # Global styles
│   │   ├── App.jsx                     # Root component
│   │   └── main.jsx                    # Entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── README.md
│
├── docs/
│   └── architecture.md                 # This file
│
└── README.md                           # Project documentation
```

## Technology Choices

### Backend

**Node.js + Express**
- Lightweight and fast
- Large ecosystem of packages
- Easy to deploy
- Good for I/O-bound operations

**csv-parser**
- Streaming CSV parser
- Memory efficient
- Handles large files
- Simple API

**In-Memory Storage**
- Fast query performance
- No database setup required
- Suitable for read-heavy workloads
- Simple deployment

### Frontend

**React 18**
- Component-based architecture
- Virtual DOM for performance
- Large ecosystem
- Excellent developer experience

**React Router DOM**
- URL state management
- Browser history integration
- Easy navigation
- Deep linking support

**Axios**
- Promise-based HTTP client
- Interceptors for request/response
- Automatic JSON transformation
- Better error handling than fetch

**Tailwind CSS**
- Utility-first CSS
- Fast development
- Consistent design
- Small production bundle

**Vite**
- Fast development server
- Hot module replacement
- Optimized production builds
- Modern tooling

## Performance Considerations

### Backend

1. **In-Memory Caching**: CSV loaded once, all queries served from memory
2. **Efficient Filtering**: Early returns and optimized array methods
3. **Pagination**: Only requested page data sent to client
4. **No Database Overhead**: Direct array operations without query parsing

### Frontend

1. **Debouncing**: Reduces API calls during user input
2. **URL State**: Prevents unnecessary re-renders
3. **Component Memoization**: React.memo for expensive components
4. **Code Splitting**: Vite automatically splits code for faster loads
5. **Tailwind Purging**: Unused CSS removed in production

## Security Considerations

1. **CORS Configuration**: Restricts API access to known origins
2. **Input Validation**: All query parameters validated on backend
3. **Error Handling**: No sensitive information in error messages
4. **Environment Variables**: Sensitive config in .env files
5. **XSS Protection**: React automatically escapes content

## Scalability

### Current Limitations
- In-memory storage limits dataset size
- Single server instance
- No caching layer

### Future Improvements
- Database integration (PostgreSQL/MongoDB)
- Redis caching layer
- Load balancing for multiple instances
- CDN for frontend assets
- API rate limiting
- Horizontal scaling with container orchestration

## Testing Strategy

### Backend Testing
- Unit tests for utility functions (filters, dataLoader)
- Integration tests for API endpoints
- Mock data for consistent results
- Test coverage: 80%+

### Frontend Testing
- Component tests with React Testing Library
- Hook tests for useSalesQuery
- Integration tests for user flows
- E2E tests with Playwright (optional)
- Test coverage: 70%+

## Deployment

### Backend Deployment Options
- Heroku (simple, managed)
- Railway (modern, developer-friendly)
- Render (free tier available)
- AWS EC2/Elastic Beanstalk (scalable)
- Docker container (portable)

### Frontend Deployment Options
- Vercel (optimized for React)
- Netlify (simple, free tier)
- AWS S3 + CloudFront (scalable, CDN)
- GitHub Pages (free, static)

### Environment Configuration
- Backend: PORT, CORS_ORIGIN, CSV_FILE_PATH
- Frontend: VITE_API_URL

## Monitoring and Logging

### Backend
- Console logging for errors and startup
- Request logging middleware (optional)
- Error tracking service (Sentry, optional)

### Frontend
- Console errors in development
- Error boundary for React errors
- Analytics (Google Analytics, optional)

## Future Enhancements

1. **Export Functionality**: Download filtered results as CSV/Excel
2. **Advanced Analytics**: Charts and visualizations
3. **User Authentication**: Login and role-based access
4. **Saved Filters**: Save and reuse filter combinations
5. **Real-time Updates**: WebSocket for live data
6. **Advanced Search**: Fuzzy search and autocomplete
7. **Bulk Operations**: Update multiple records
8. **API Documentation**: Swagger/OpenAPI spec
9. **Performance Monitoring**: APM integration
10. **Database Migration**: Move from CSV to database
