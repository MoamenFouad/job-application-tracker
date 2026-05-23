import { Router } from 'express';
import { getDashboardStats, getApplicationTimeline } from '../controllers/stats.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getDashboardStats);
router.get('/timeline', getApplicationTimeline);

export default router;
