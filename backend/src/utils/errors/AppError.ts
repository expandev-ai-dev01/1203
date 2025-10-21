/**
 * @summary
 * Custom application error class for structured error handling
 *
 * @class AppError
 * @module utils/errors
 *
 * @property {string} code - Error code identifier
 * @property {string} message - Error message
 * @property {number} statusCode - HTTP status code
 * @property {any} details - Additional error details
 *
 * @example
 * throw new AppError('ITEM_NOT_FOUND', 'Shopping item not found', 404);
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(code: string, message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'AppError';

    Error.captureStackTrace(this, this.constructor);
  }
}
