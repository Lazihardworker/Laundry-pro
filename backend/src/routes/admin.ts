import { Router } from 'express';
import {
  getDashboardStats,
  getRevenueAnalytics,
  getStaffPerformance,
  getBranches,
  createBranch,
  getIssues,
  resolveIssue,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, authorize('ADMIN', 'STAFF'));

router.get('/dashboard', getDashboardStats);
router.get('/analytics/revenue', getRevenueAnalytics);
router.get('/staff/performance', getStaffPerformance);
router.get('/branches', getBranches);
router.post('/branches', createBranch);
router.get('/issues', getIssues);
router.patch('/issues/:id/resolve', resolveIssue);

export default router;
