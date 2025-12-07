import fs from 'fs';
import csv from 'csv-parser';
import { transformRecord } from '../models/salesRecord.js';

/**
 * DataLoader class
 * Loads and caches CSV data in memory
 */
export class DataLoader {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = [];
    this.loaded = false;
  }

  /**
   * Load data from CSV file
   */
  async loadData() {
    return new Promise((resolve, reject) => {
      const results = [];

      if (!fs.existsSync(this.filePath)) {
        reject(new Error(`CSV file not found at ${this.filePath}`));
        return;
      }

      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (row) => {
          try {
            const record = transformRecord(row);
            results.push(record);
          } catch (error) {
            console.warn('Error parsing row:', error.message);
          }
        })
        .on('end', () => {
          this.data = results;
          this.loaded = true;
          console.log(`✓ Loaded ${this.data.length} sales records`);
          resolve(this.data);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  /**
   * Get cached data
   */
  getData() {
    if (!this.loaded) {
      throw new Error('Data not loaded. Call loadData() first.');
    }
    return this.data;
  }

  /**
   * Get unique values for a specific field
   */
  getUniqueValues(field) {
    if (!this.loaded) {
      throw new Error('Data not loaded. Call loadData() first.');
    }

    const uniqueSet = new Set();
    
    this.data.forEach(record => {
      const value = record[field];
      if (value !== null && value !== undefined && value !== '') {
        uniqueSet.add(value);
      }
    });

    return Array.from(uniqueSet).sort();
  }

  /**
   * Get numeric range for a field
   */
  getNumericRange(field) {
    if (!this.loaded) {
      throw new Error('Data not loaded. Call loadData() first.');
    }

    const values = this.data
      .map(record => record[field])
      .filter(val => val !== null && val !== undefined && !isNaN(val));

    if (values.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }

  /**
   * Get date range for date field
   */
  getDateRange() {
    if (!this.loaded) {
      throw new Error('Data not loaded. Call loadData() first.');
    }

    const dates = this.data
      .map(record => record.date)
      .filter(date => date !== null && date !== undefined);

    if (dates.length === 0) {
      return { min: null, max: null };
    }

    const timestamps = dates.map(d => d.getTime());
    
    return {
      min: new Date(Math.min(...timestamps)),
      max: new Date(Math.max(...timestamps))
    };
  }
}
