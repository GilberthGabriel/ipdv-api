import { Router } from 'express';
import { authenticate, refreshToken } from '../controllers/auth';
import { verifyRefreshToken } from '../middlewares/auth_middleware';

const router = Router();
router.post('/login', authenticate);
router.post('/refresh', verifyRefreshToken, refreshToken);

export default router;
