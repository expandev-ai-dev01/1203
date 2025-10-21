import { Router } from 'express';
import shoppingItemRoutes from './shoppingItemRoutes';

const router = Router();

// Shopping item routes
router.use('/shopping-item', shoppingItemRoutes);

export default router;
