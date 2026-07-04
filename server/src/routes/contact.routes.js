import { Router } from 'express';
import { createContact, listContacts } from '../controllers/contact.controller.js';
import { createContactValidator } from '../validators/contact.validator.js';
import { validate } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/auth.js';
import { contactLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Portfolio contact form
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit the contact form (stores it and sends a WhatsApp notification)
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, format: email, example: john@gmail.com }
 *               message: { type: string, minLength: 10, example: We have a Backend Developer opportunity. }
 *     responses:
 *       201:
 *         description: Contact saved
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/SuccessResponse' }
 *             example: { success: true, message: Contact saved successfully., data: null }
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       429: { description: Too many requests }
 */
router.post('/contact', contactLimiter, createContactValidator, validate, createContact);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: List contact submissions (admin)
 *     tags: [Contact]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 20 } }
 *     responses:
 *       200: { description: Paginated contacts }
 *       401: { description: Unauthorized }
 */
router.get('/contacts', authenticate, listContacts);

export default router;
