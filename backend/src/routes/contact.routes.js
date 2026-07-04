import { Router } from 'express';
import { createContact } from '../controllers/contact.controller.js';
import { createContactValidator } from '../validators/contact.validator.js';
import { validate } from '../middleware/validate.js';
import { strictLimiter } from '../middleware/rateLimiter.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form (public)
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit the contact form (sends an email notification)
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               message: { type: string }
 *               company: { type: string }
 *               designation: { type: string }
 *               phone: { type: string }
 *               subject: { type: string }
 *               visitorId: { type: string, format: uuid }
 *               sessionId: { type: string, format: uuid }
 *     responses:
 *       201: { description: Message received }
 *       422: { description: Validation failed }
 *       429: { description: Too many requests }
 */
router.post('/contact', strictLimiter, createContactValidator, validate, createContact);

export default router;
