import { Router } from 'express';
import { createEvent } from '../controllers/event.controller.js';
import { createEventValidator } from '../validators/event.validator.js';
import { validate } from '../middleware/validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Visitor event tracking (public)
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Track a visitor event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [action]
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [VIEW_HOME, VIEW_ABOUT, VIEW_PROJECT, VIEW_EXPERIENCE, VIEW_CONTACT, VIEW_SKILLS, CLICK_GITHUB, CLICK_LINKEDIN, CLICK_RESUME, DOWNLOAD_RESUME, CONTACT_FORM, SEND_EMAIL, OPEN_PROJECT, SCROLL_50, SCROLL_100]
 *               visitorId: { type: string, format: uuid }
 *               sessionId: { type: string, format: uuid }
 *               page: { type: string }
 *               metadata: { type: object }
 *     responses:
 *       201: { description: Event tracked }
 *       422: { description: Validation failed }
 */
router.post('/event', createEventValidator, validate, createEvent);

export default router;
