import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  getCurrentUser,
  updateProfile,
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/me', authenticate, getCurrentUser);
router.patch('/profile', authenticate, updateProfile);

export default router;
