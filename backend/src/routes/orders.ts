import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  assignStaff,
  trackOrder,
} from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All order routes require authentication
router.use(authenticate);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/track/:orderNumber', trackOrder);
router.get('/:id', getOrder);
router.patch('/:id/status', authorize('STAFF', 'ADMIN'), updateOrderStatus);
router.patch('/:id/assign', authorize('ADMIN'), assignStaff);

export default router;
