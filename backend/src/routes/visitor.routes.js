import { Router } from 'express';
import {
  createVisitor,
  listVisitors,
  getVisitor,
} from '../controllers/visitor.controller.js';
import {
  createVisitorValidator,
  listVisitorsValidator,
  visitorIdValidator,
} from '../validators/visitor.validator.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Visitors
 *   description: Visitor capture (public) and management (admin)
 */

/**
 * @swagger
 * /visitor:
 *   post:
 *     summary: Create/record a visitor (public)
 *     tags: [Visitors]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               designation: { type: string }
 *               company: { type: string }
 *               email: { type: string, format: email }
 *               linkedin: { type: string }
 *               phone: { type: string }
 *               notes: { type: string }
 *     responses:
 *       201: { description: Visitor recorded }
 */
router.post('/visitor', createVisitorValidator, validate, createVisitor);

/**
 * @swagger
 * /visitors:
 *   get:
 *     summary: List visitors (admin) — pagination, search, filter, sort
 *     tags: [Visitors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer } }
 *       - { in: query, name: limit, schema: { type: integer } }
 *       - { in: query, name: search, schema: { type: string } }
 *       - { in: query, name: company, schema: { type: string } }
 *       - { in: query, name: designation, schema: { type: string } }
 *       - { in: query, name: country, schema: { type: string } }
 *       - { in: query, name: sortBy, schema: { type: string, enum: [createdAt, name, company, designation] } }
 *       - { in: query, name: order, schema: { type: string, enum: [ASC, DESC] } }
 *     responses:
 *       200: { description: Paginated visitors }
 *       401: { description: Unauthorized }
 */
router.get('/visitors', authenticate, listVisitorsValidator, validate, listVisitors);

/**
 * @swagger
 * /visitor/{id}:
 *   get:
 *     summary: Get a full visitor profile (admin)
 *     tags: [Visitors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
 *     responses:
 *       200: { description: Visitor with sessions, events and contacts }
 *       404: { description: Not found }
 */
router.get('/visitor/:id', authenticate, visitorIdValidator, validate, getVisitor);

export default router;
