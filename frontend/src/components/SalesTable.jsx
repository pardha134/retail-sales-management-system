/**
 * SalesTable Component
 * Displays sales records in a responsive table
 */
export function SalesTable({ data, loading, error }) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto glass rounded-xl shadow-xl border border-white/20">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
          <tr>
            {/* Customer Information */}
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Customer</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Phone</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Gender</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Age</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Region</th>
            
            {/* Product Information */}
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Product</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Brand</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Category</th>
            
            {/* Sales Information */}
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Quantity</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Price</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Discount</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Final Amount</th>
            
            {/* Operational Information */}
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Date</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Payment</th>
            <th className="px-4 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((record, index) => (
            <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 cursor-pointer">
              {/* Customer Information */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{record.customerName || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.phoneNumber || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.gender || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.age || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.customerRegion || '-'}</td>
              
              {/* Product Information */}
              <td className="px-4 py-3 text-sm text-gray-900">{record.productName || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.brand || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.productCategory || '-'}</td>
              
              {/* Sales Information */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{record.quantity || 0}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(record.pricePerUnit)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatPercentage(record.discountPercentage)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{formatCurrency(record.finalAmount)}</td>
              
              {/* Operational Information */}
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatDate(record.date)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{record.paymentMethod || '-'}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.orderStatus)}`}>
                  {record.orderStatus || '-'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="glass rounded-xl p-8 shadow-xl">
      <div className="space-y-4">
        <div className="h-4 shimmer rounded w-3/4"></div>
        <div className="h-4 shimmer rounded w-1/2"></div>
        <div className="h-4 shimmer rounded w-5/6"></div>
        <div className="h-4 shimmer rounded w-2/3"></div>
        <div className="h-4 shimmer rounded w-4/5"></div>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="glass rounded-xl p-12 text-center shadow-xl border-2 border-red-200">
      <div className="text-red-500 mb-4">
        <svg className="w-16 h-16 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md">
        Retry
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass rounded-xl p-16 text-center shadow-xl">
      <div className="text-purple-300 mb-6">
        <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Sales Records Found</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">No sales records match your criteria. Try adjusting your filters or search terms to see more results.</p>
      <div className="flex justify-center gap-3">
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-md">
          Reset All
        </button>
      </div>
    </div>
  );
}

// Helper functions
function formatCurrency(value) {
  if (value === null || value === undefined) return '-';
  return `$${parseFloat(value).toFixed(2)}`;
}

function formatPercentage(value) {
  if (value === null || value === undefined) return '-';
  return `${parseFloat(value).toFixed(1)}%`;
}

function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getStatusColor(status) {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  const statusLower = status.toLowerCase();
  if (statusLower.includes('completed') || statusLower.includes('delivered')) {
    return 'bg-green-100 text-green-800';
  }
  if (statusLower.includes('pending') || statusLower.includes('processing')) {
    return 'bg-yellow-100 text-yellow-800';
  }
  if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
    return 'bg-red-100 text-red-800';
  }
  return 'bg-gray-100 text-gray-800';
}
