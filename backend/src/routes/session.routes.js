import { Router } from 'express';
import { createSession } from '../controllers/session.controller.js';
import { createSessionValidator } from '../validators/session.validator.js';
import { validate } from '../middleware/validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Visitor session tracking (public)
 */

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Record a visitor session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sessionId]
 *             properties:
 *               sessionId: { type: string, format: uuid }
 *               visitorId: { type: string, format: uuid }
 *               country: { type: string }
 *               city: { type: string }
 *               region: { type: string }
 *               browser: { type: string }
 *               browserVersion: { type: string }
 *               operatingSystem: { type: string }
 *               device: { type: string }
 *               deviceType: { type: string, enum: [desktop, mobile, tablet, bot, unknown] }
 *               screenResolution: { type: string }
 *               language: { type: string }
 *               timezone: { type: string }
 *               landingPage: { type: string }
 *               referrer: { type: string }
 *               visitDuration: { type: integer }
 *     responses:
 *       201: { description: Session recorded }
 *       200: { description: Session already existed (idempotent) }
 */
router.post('/session', createSessionValidator, validate, createSession);

export default router;
