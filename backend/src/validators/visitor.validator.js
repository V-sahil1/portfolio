import { body, param, query } from 'express-validator';

/**
 * Validation for creating/identifying a visitor. All fields are optional but
 * at least one identifying field should be present — enforced in the service.
 */
export const createVisitorValidator = [
  body('name').optional().trim().isLength({ max: 150 }),
  body('designation').optional().trim().isLength({ max: 150 }),
  body('company').optional().trim().isLength({ max: 150 }),
  body('email').optional({ values: 'falsy' }).isEmail().withMessage('Invalid email.').normalizeEmail(),
  body('linkedin').optional({ values: 'falsy' }).isURL().withMessage('Invalid LinkedIn URL.'),
  body('phone').optional().trim().isLength({ max: 30 }),
  body('notes').optional().trim().isLength({ max: 2000 }),
];

/** Validate a visitor UUID route parameter. */
export const visitorIdValidator = [
  param('id').isUUID().withMessage('Invalid visitor id.'),
];

/**
 * Validate list/search query parameters for GET /visitors.
 */
export const listVisitorsValidator = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('search').optional().trim().isLength({ max: 150 }),
  query('company').optional().trim(),
  query('designation').optional().trim(),
  query('country').optional().trim(),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'name', 'company', 'designation'])
    .withMessage('Invalid sortBy field.'),
  query('order').optional().isIn(['ASC', 'DESC', 'asc', 'desc']),
  query('startDate').optional().isISO8601().withMessage('startDate must be ISO-8601.'),
  query('endDate').optional().isISO8601().withMessage('endDate must be ISO-8601.'),
];
