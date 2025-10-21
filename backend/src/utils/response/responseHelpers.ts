/**
 * @summary
 * Helper function to create standardized success responses
 *
 * @function successResponse
 * @module utils/response
 *
 * @param {T} data - Response data
 * @param {object} metadata - Optional metadata
 *
 * @returns {object} Standardized success response
 *
 * @example
 * res.json(successResponse(items));
 */
export function successResponse<T>(data: T, metadata?: any) {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary
 * Helper function to create standardized error responses
 *
 * @function errorResponse
 * @module utils/response
 *
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {any} details - Optional error details
 *
 * @returns {object} Standardized error response
 *
 * @example
 * res.status(404).json(errorResponse('NOT_FOUND', 'Item not found'));
 */
export function errorResponse(code: string, message: string, details?: any) {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}
