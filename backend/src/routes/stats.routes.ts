// هنا بنعمل الـ routes بتاعت الـ stats - bterga3 el summary
import { Router } from 'express';
import { getStats } from '../controllers/stats.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getStats);

export default router;
