import { Router } from 'express';
import contactRoutes from './contact.routes.js';
import authRoutes from './auth.routes.js';
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

router.use('/auth', authRoutes);
router.use('/', contactRoutes);

export default router;
