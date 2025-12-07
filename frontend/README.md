# Retail Sales Management System - Frontend

React-based frontend for the Retail Sales Management System with advanced search, filtering, and sorting capabilities.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Backend API running

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
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

The application will start on `http://localhost:5173`

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

### Search
- Full-text search across customer name and phone number
- Case-insensitive matching
- Debounced input (300ms) for performance
- Clear button to reset search

### Filters
- Multi-select filters for:
  - Customer Region
  - Gender
  - Product Category
  - Tags
  - Payment Method
- Range filters for:
  - Age (min/max)
  - Date (from/to)
- Collapsible filter sections
- Active filter count badge
- Clear all filters button

### Sorting
- Date (Newest First)
- Quantity (High to Low)
- Customer Name (A-Z)

### Pagination
- 10 items per page
- Previous/Next navigation
- Page number display
- Total records count
- Disabled states for first/last pages

### URL State Management
- All query parameters synced with URL
- Shareable URLs with filters
- Browser back/forward support
- Page refresh preserves state

## Component Structure

```
src/
├── components/
│   ├── SearchBar.jsx          # Search input with debouncing
│   ├── FilterPanel.jsx        # Multi-select filters
│   ├── SortDropdown.jsx       # Sort options dropdown
│   ├── SalesTable.jsx         # Data table with formatting
│   └── PaginationControls.jsx # Pagination navigation
├── services/
│   └── api.js                 # API client with Axios
├── hooks/
│   └── useSalesQuery.js       # Custom hook for state management
├── utils/
│   └── queryState.js          # URL parameter utilities
├── styles/
│   └── main.css               # Tailwind CSS + custom styles
├── App.jsx                    # Main app component
└── main.jsx                   # Entry point
```

## Technology Stack

- **React 18**: UI library
- **React Router DOM**: Routing and URL state management
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and dev server

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

Tables are horizontally scrollable on smaller screens.

## Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Semantic HTML structure
- Screen reader friendly

## Performance Optimizations

- Debounced search input (300ms)
- URL state management to reduce re-renders
- Efficient filter operations
- Loading skeletons for better UX
- Optimized re-renders with React hooks
