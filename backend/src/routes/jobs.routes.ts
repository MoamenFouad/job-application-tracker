// هنا بنعمل الـ routes بتاعت الـ jobs - full CRUD
import { Router } from 'express';
import { getJobs, createJob, getJobById, updateJob, deleteJob } from '../controllers/jobs.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getJobs);
router.post('/', createJob);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
