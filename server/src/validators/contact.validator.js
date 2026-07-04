import { body } from 'express-validator';

/**
 * Validation rules for POST /contact:
 *  - name    required
 *  - email   required + valid email
 *  - message required + at least 10 characters
 */
export const createContactValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: 150 })
    .withMessage('Name must be at most 150 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('A valid email is required.')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters.')
    .isLength({ max: 5000 })
    .withMessage('Message must be at most 5000 characters.'),
];
