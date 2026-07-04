import { Router } from 'express';
import { getAnalytics, searchVisitors } from '../controllers/analytics.controller.js';
import { analyticsRangeValidator, searchValidator } from '../validators/analytics.validator.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Detailed analytics + visitor search (admin)
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Full analytics report — time series + breakdowns (admin, cached)
 *     tags: [Analytics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200: { description: Analytics report }
 *       401: { description: Unauthorized }
 */
router.get('/analytics', authenticate, analyticsRangeValidator, validate, getAnalytics);

/**
 * @swagger
 * /analytics/search:
 *   get:
 *     summary: Search visitors by company / designation / name / country / date (admin)
 *     tags: [Analytics]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: company, schema: { type: string } }
 *       - { in: query, name: designation, schema: { type: string } }
 *       - { in: query, name: name, schema: { type: string } }
 *       - { in: query, name: country, schema: { type: string } }
 *       - { in: query, name: date, schema: { type: string, format: date } }
 *       - { in: query, name: page, schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *     responses:
 *       200: { description: Matching visitors (paginated) }
 *       401: { description: Unauthorized }
 */
router.get('/analytics/search', authenticate, searchValidator, validate, searchVisitors);

export default router;
