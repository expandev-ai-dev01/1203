import { Router } from 'express';
import * as shoppingItemController from '@/api/v1/internal/shopping-item/controller';
import * as shoppingItemDetailController from '@/api/v1/internal/shopping-item/detail/controller';
import * as markPurchasedController from '@/api/v1/internal/shopping-item/mark-purchased/controller';

const router = Router();

/**
 * @route Shopping Item Routes
 * @summary Route definitions for shopping item operations
 * @version 1.0.0
 */

// Collection routes
router.get('/', shoppingItemController.getHandler);
router.post('/', shoppingItemController.postHandler);

// Mark purchased route (bulk action)
router.patch('/mark-purchased', markPurchasedController.patchHandler);

// Detail routes
router.get('/:id', shoppingItemDetailController.getHandler);
router.put('/:id', shoppingItemDetailController.putHandler);
router.delete('/:id', shoppingItemDetailController.deleteHandler);

export default router;
