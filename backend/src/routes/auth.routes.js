import { Router } from 'express';
import { login, refresh, logout, me } from '../controllers/auth.controller.js';
import { loginValidator, refreshValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import { strictLimiter } from '../middleware/rateLimiter.js';

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
 *     summary: Admin login
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
 *       200: { description: Logged in; returns access token + admin }
 *       401: { description: Invalid credentials }
 */
router.post('/login', strictLimiter, loginValidator, validate, login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Rotate the refresh token and issue a new access token
 *     tags: [Auth]
 *     responses:
 *       200: { description: New token pair issued }
 *       401: { description: Missing/invalid refresh token }
 */
router.post('/refresh', refreshValidator, validate, refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out (revoke refresh token)
 *     tags: [Auth]
 *     responses:
 *       200: { description: Logged out }
 */
router.post('/logout', logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the authenticated admin
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current admin }
 *       401: { description: Unauthorized }
 */
router.get('/me', authenticate, me);

export default router;
