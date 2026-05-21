// هنا بنعمل الـ routes بتاعت الـ auth - hena bne3mel el routes bta3et el auth
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
