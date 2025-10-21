/**
 * @summary
 * Global test environment setup and configuration
 *
 * @module tests/testSetup
 *
 * @description
 * This file contains shared test setup, configuration, and utilities
 * that are used across all test files in the application.
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Global test utilities
export const testConfig = {
  timeout: 5000,
  retries: 2,
};

// Mock data generators will be added here
// Example:
// export function generateMockItem() { ... }
