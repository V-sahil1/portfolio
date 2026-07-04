import { body } from 'express-validator';

/**
 * Validation for the public contact form. name, email and message are required.
 */
export const createContactValidator = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 150 }),
  body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('A valid email is required.').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 5, max: 5000 }),
  body('company').optional().trim().isLength({ max: 150 }),
  body('designation').optional().trim().isLength({ max: 150 }),
  body('phone').optional().trim().isLength({ max: 30 }),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('visitorId').optional({ values: 'falsy' }).isUUID().withMessage('visitorId must be a UUID.'),
  body('sessionId').optional({ values: 'falsy' }).isUUID().withMessage('sessionId must be a UUID.'),
];
