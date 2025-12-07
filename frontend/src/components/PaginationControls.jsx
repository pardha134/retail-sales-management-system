/**
 * PaginationControls Component
 * Navigation controls for paginated data
 */
export function PaginationControls({ currentPage, totalPages, totalRecords, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between glass rounded-xl px-6 py-5 shadow-lg gap-4">
      <div className="text-sm text-gray-700 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>
          Page <span className="font-bold text-purple-600">{currentPage}</span> of{' '}
          <span className="font-bold text-purple-600">{totalPages}</span>
        </span>
        {totalRecords !== undefined && (
          <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
            {totalRecords} records
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handlePrevious}
          disabled={isFirstPage}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2 ${
            isFirstPage
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg btn-ripple'
          }`}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={isLastPage}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2 ${
            isLastPage
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg btn-ripple'
          }`}
          aria-label="Next page"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
