import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { AppError } from '@/utils/errors';

/**
 * @summary
 * Middleware factory for request validation using Zod schemas
 *
 * @function validationMiddleware
 * @module middleware/validation
 *
 * @param {ZodSchema} schema - Zod validation schema
 *
 * @returns {Function} Express middleware function
 *
 * @throws {AppError} When validation fails
 *
 * @example
 * router.post('/items', validationMiddleware(createItemSchema), controller.create);
 */
export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = new AppError(
          'VALIDATION_ERROR',
          'Request validation failed',
          400,
          error.errors
        );
        next(validationError);
      } else {
        next(error);
      }
    }
  };
}
