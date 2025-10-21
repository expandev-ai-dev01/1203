import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  shoppingItemCreate,
  shoppingItemList,
  shoppingItemGet,
  shoppingItemUpdate,
  shoppingItemDelete,
} from '@/services/shoppingItem';
import { AppError } from '@/utils/errors';

/**
 * @api {post} /internal/shopping-item Create Shopping Item
 * @apiName CreateShoppingItem
 * @apiGroup ShoppingItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new shopping item with the specified name
 *
 * @apiParam {String} name Product name (1-100 characters, alphanumeric and spaces only)
 *
 * @apiSuccess {String} id Item identifier (UUID)
 * @apiSuccess {String} name Product name
 * @apiSuccess {Boolean} purchased Purchase status (always false for new items)
 * @apiSuccess {Number} position Item position in list
 * @apiSuccess {Date} createdAt Creation timestamp
 *
 * @apiError {String} VALIDATION_ERROR Invalid parameters provided
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const bodySchema = z.object({
      name: z
        .string()
        .min(1, 'O nome do produto é obrigatório')
        .max(100, 'O nome do produto deve ter no máximo 100 caracteres')
        .regex(
          /^[a-zA-Z0-9\s]+$/,
          'O nome do produto deve conter apenas letras, números e espaços'
        ),
    });

    const validated = bodySchema.parse(req.body);

    const item = await shoppingItemCreate({
      name: validated.name,
    });

    res.status(201).json(successResponse(item));
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
 * @api {get} /internal/shopping-item List Shopping Items
 * @apiName ListShoppingItems
 * @apiGroup ShoppingItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all shopping items ordered by position
 *
 * @apiSuccess {Array} data Array of shopping items
 * @apiSuccess {String} data.id Item identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {Boolean} data.purchased Purchase status
 * @apiSuccess {Number} data.position Item position in list
 * @apiSuccess {Date} data.createdAt Creation timestamp
 *
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await shoppingItemList();
    res.json(successResponse(items));
  } catch (error: any) {
    next(error);
  }
}
