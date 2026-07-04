import { Router } from 'express';
import authRoutes from './auth.routes.js';
import visitorRoutes from './visitor.routes.js';
import sessionRoutes from './session.routes.js';
import eventRoutes from './event.routes.js';
import contactRoutes from './contact.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import analyticsRoutes from './analytics.routes.js';
import { sendSuccess } from '../utils/ApiResponse.js';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Liveness probe
 *     tags: [System]
 *     responses:
 *       200: { description: Service is up }
 */
router.get('/health', (_req, res) =>
  sendSuccess(res, { message: 'OK', data: { status: 'up', time: new Date().toISOString() } }),
);

// Auth is namespaced under /auth; the rest expose their own top-level paths.
router.use('/auth', authRoutes);
router.use('/', visitorRoutes);
router.use('/', sessionRoutes);
router.use('/', eventRoutes);
router.use('/', contactRoutes);
router.use('/', dashboardRoutes);
router.use('/', analyticsRoutes);

export default router;
