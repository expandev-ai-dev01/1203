import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { shoppingItemGet, shoppingItemUpdate, shoppingItemDelete } from '@/services/shoppingItem';
import { AppError } from '@/utils/errors';

/**
 * @api {get} /internal/shopping-item/:id Get Shopping Item
 * @apiName GetShoppingItem
 * @apiGroup ShoppingItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific shopping item by ID
 *
 * @apiParam {String} id Item identifier (UUID)
 *
 * @apiSuccess {String} id Item identifier
 * @apiSuccess {String} name Product name
 * @apiSuccess {Boolean} purchased Purchase status
 * @apiSuccess {Number} position Item position in list
 * @apiSuccess {Date} createdAt Creation timestamp
 *
 * @apiError {String} NOT_FOUND Item not found
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid('ID inválido'),
    });

    const validated = paramsSchema.parse(req.params);

    const item = await shoppingItemGet(validated.id);

    res.json(successResponse(item));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('VALIDATION_ERROR', 'Erro de validação', error.errors));
    } else if (error instanceof AppError) {
      res.status(error.statusCode).json(errorResponse(error.code, error.message, error.details));
    } else {
      next(error);
    }
  }
}

/**
 * @api {put} /internal/shopping-item/:id Update Shopping Item
 * @apiName UpdateShoppingItem
 * @apiGroup ShoppingItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates a shopping item's name or purchased status
 *
 * @apiParam {String} id Item identifier (UUID)
 * @apiParam {String} [name] Product name (1-100 characters, alphanumeric and spaces only)
 * @apiParam {Boolean} [purchased] Purchase status
 *
 * @apiSuccess {String} id Item identifier
 * @apiSuccess {String} name Product name
 * @apiSuccess {Boolean} purchased Purchase status
 * @apiSuccess {Number} position Item position in list
 * @apiSuccess {Date} createdAt Creation timestamp
 *
 * @apiError {String} NOT_FOUND Item not found
 * @apiError {String} VALIDATION_ERROR Invalid parameters provided
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid('ID inválido'),
    });

    const bodySchema = z.object({
      name: z
        .string()
        .min(1, 'O nome do produto é obrigatório')
        .max(100, 'O nome do produto deve ter no máximo 100 caracteres')
        .regex(/^[a-zA-Z0-9\s]+$/, 'O nome do produto deve conter apenas letras, números e espaços')
        .optional(),
      purchased: z.boolean().optional(),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const item = await shoppingItemUpdate(validatedParams.id, validatedBody);

    res.json(successResponse(item));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('VALIDATION_ERROR', 'Erro de validação', error.errors));
    } else if (error instanceof AppError) {
      res.status(error.statusCode).json(errorResponse(error.code, error.message, error.details));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /internal/shopping-item/:id Delete Shopping Item
 * @apiName DeleteShoppingItem
 * @apiGroup ShoppingItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a shopping item
 *
 * @apiParam {String} id Item identifier (UUID)
 *
 * @apiSuccess {Boolean} success Operation success status
 *
 * @apiError {String} NOT_FOUND Item not found
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid('ID inválido'),
    });

    const validated = paramsSchema.parse(req.params);

    await shoppingItemDelete(validated.id);

    res.json(successResponse({ success: true }));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('VALIDATION_ERROR', 'Erro de validação', error.errors));
    } else if (error instanceof AppError) {
      res.status(error.statusCode).json(errorResponse(error.code, error.message, error.details));
    } else {
      next(error);
    }
  }
}
