import { Router } from 'express';
import { getDashboard } from '../controllers/dashboard.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Aggregated analytics for the admin dashboard
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Headline dashboard metrics (admin, cached)
 *     tags: [Dashboard]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Totals, engagement and breakdowns }
 *       401: { description: Unauthorized }
 */
router.get('/dashboard', authenticate, getDashboard);

export default router;
