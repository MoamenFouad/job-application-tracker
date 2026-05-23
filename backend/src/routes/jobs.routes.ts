import { Router } from 'express';
import { getAllJobs, getJobById, createJob, updateJob, deleteJob, getStats } from '../controllers/jobs.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/stats', getStats);
router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
