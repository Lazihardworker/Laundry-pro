import { Router } from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public route - get all active services
router.get('/', getServices);
router.get('/:id', getService);

// Admin only
router.post('/', authenticate, authorize('ADMIN'), createService);
router.patch('/:id', authenticate, authorize('ADMIN'), updateService);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteService);

export default router;
