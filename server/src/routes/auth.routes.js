import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Admin authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Admin login (returns a JWT)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: JWT issued }
 *       401: { description: Invalid credentials }
 */
router.post('/login', loginValidator, validate, login);

export default router;
