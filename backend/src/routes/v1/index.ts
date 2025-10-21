import { Router } from 'express';
import internalRoutes from './internalRoutes';

const router = Router();

// Internal (authenticated) routes - /api/v1/internal/...
router.use('/internal', internalRoutes);

export default router;
