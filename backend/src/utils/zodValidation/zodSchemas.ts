import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas for reuse across the application
 *
 * @module utils/zodValidation
 */

// String validations
export const zString = z.string().min(1, 'Field is required');
export const zNullableString = z.string().nullable();
export const zName = z.string().min(1, 'Name is required').max(100, 'Name too long');
export const zDescription = z
  .string()
  .min(1, 'Description is required')
  .max(500, 'Description too long');
export const zNullableDescription = z.string().max(500, 'Description too long').nullable();

// Number validations
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive('Must be a positive number');
export const zNonNegativeNumber = z.number().nonnegative('Must be non-negative');
export const zFK = z.number().int().positive('Invalid ID');
export const zNullableFK = z.number().int().positive('Invalid ID').nullable();

// Boolean validations
export const zBoolean = z.boolean();
export const zBit = z.boolean();

// Date validations
export const zDate = z.date();
export const zDateString = z.string().datetime();
export const zNullableDate = z.date().nullable();

// ID validations
export const zId = z.coerce.number().int().positive('Invalid ID');

// Quantity validations
export const zQuantity = z.number().int().positive('Quantity must be positive');
export const zNullableQuantity = z.number().int().positive('Quantity must be positive').nullable();
