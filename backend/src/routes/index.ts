import { Router } from 'express';
import authRoutes from './auth';
import orderRoutes from './orders';
import serviceRoutes from './services';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/services', serviceRoutes);
router.use('/admin', adminRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LaundryPro API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
