import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { shoppingItemMarkPurchased } from '@/services/shoppingItem';
import { AppError } from '@/utils/errors';

/**
 * @api {patch} /internal/shopping-item/mark-purchased Mark Items as Purchased
 * @apiName MarkItemsAsPurchased
 * @apiGroup ShoppingItem
 * @apiVersion 1.0.0
 *
 * @apiDescription Marks one or multiple shopping items as purchased or unpurchased
 *
 * @apiParam {Array} itemIds Array of item identifiers (UUIDs)
 * @apiParam {Boolean} purchased Purchase status to set (true = purchased, false = pending)
 *
 * @apiSuccess {Array} data Array of updated shopping items
 * @apiSuccess {String} data.id Item identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {Boolean} data.purchased Purchase status
 * @apiSuccess {Number} data.position Item position in list
 * @apiSuccess {Date} data.createdAt Creation timestamp
 * @apiSuccess {Date} data.purchasedAt Purchase timestamp (null if not purchased)
 *
 * @apiError {String} VALIDATION_ERROR Invalid parameters provided
 * @apiError {String} NOT_FOUND One or more items not found
 * @apiError {String} INTERNAL_SERVER_ERROR Internal server error
 */
export async function patchHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const bodySchema = z.object({
      itemIds: z
        .array(z.string().uuid('ID inválido'))
        .min(1, 'Pelo menos um item deve ser selecionado'),
      purchased: z.boolean(),
    });

    const validated = bodySchema.parse(req.body);

    const items = await shoppingItemMarkPurchased({
      itemIds: validated.itemIds,
      purchased: validated.purchased,
    });

    res.json(successResponse(items));
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
