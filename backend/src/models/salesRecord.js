/**
 * Sales Record Model
 * Defines the structure and validation for sales records
 */

export const SalesRecordSchema = {
  // Customer Information
  customerId: 'string',
  customerName: 'string',
  phoneNumber: 'string',
  gender: 'string',
  age: 'number',
  customerRegion: 'string',
  customerType: 'string',
  
  // Product Information
  productId: 'string',
  productName: 'string',
  brand: 'string',
  productCategory: 'string',
  tags: 'string',
  
  // Sales Information
  quantity: 'number',
  pricePerUnit: 'number',
  discountPercentage: 'number',
  totalAmount: 'number',
  finalAmount: 'number',
  
  // Operational Information
  date: 'date',
  paymentMethod: 'string',
  orderStatus: 'string',
  deliveryType: 'string',
  storeId: 'string',
  storeLocation: 'string',
  salespersonId: 'string',
  employeeName: 'string'
};

/**
 * Validate a sales record field
 */
export function validateField(fieldName, value, type) {
  if (value === null || value === undefined || value === '') {
    return null; // Allow empty values
  }

  switch (type) {
    case 'number':
      const num = parseFloat(value);
      return isNaN(num) ? null : num;
    
    case 'date':
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    
    case 'string':
    default:
      return String(value).trim();
  }
}

/**
 * Transform raw CSV row to SalesRecord
 */
export function transformRecord(rawRecord) {
  return {
    customerId: validateField('customerId', rawRecord['Customer ID'], 'string'),
    customerName: validateField('customerName', rawRecord['Customer Name'], 'string'),
    phoneNumber: validateField('phoneNumber', rawRecord['Phone Number'], 'string'),
    gender: validateField('gender', rawRecord['Gender'], 'string'),
    age: validateField('age', rawRecord['Age'], 'number'),
    customerRegion: validateField('customerRegion', rawRecord['Customer Region'], 'string'),
    customerType: validateField('customerType', rawRecord['Customer Type'], 'string'),
    
    productId: validateField('productId', rawRecord['Product ID'], 'string'),
    productName: validateField('productName', rawRecord['Product Name'], 'string'),
    brand: validateField('brand', rawRecord['Brand'], 'string'),
    productCategory: validateField('productCategory', rawRecord['Product Category'], 'string'),
    tags: validateField('tags', rawRecord['Tags'], 'string'),
    
    quantity: validateField('quantity', rawRecord['Quantity'], 'number'),
    pricePerUnit: validateField('pricePerUnit', rawRecord['Price per Unit'], 'number'),
    discountPercentage: validateField('discountPercentage', rawRecord['Discount Percentage'], 'number'),
    totalAmount: validateField('totalAmount', rawRecord['Total Amount'], 'number'),
    finalAmount: validateField('finalAmount', rawRecord['Final Amount'], 'number'),
    
    date: validateField('date', rawRecord['Date'], 'date'),
    paymentMethod: validateField('paymentMethod', rawRecord['Payment Method'], 'string'),
    orderStatus: validateField('orderStatus', rawRecord['Order Status'], 'string'),
    deliveryType: validateField('deliveryType', rawRecord['Delivery Type'], 'string'),
    storeId: validateField('storeId', rawRecord['Store ID'], 'string'),
    storeLocation: validateField('storeLocation', rawRecord['Store Location'], 'string'),
    salespersonId: validateField('salespersonId', rawRecord['Salesperson ID'], 'string'),
    employeeName: validateField('employeeName', rawRecord['Employee Name'], 'string')
  };
}
