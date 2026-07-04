import { body } from 'express-validator';

/**
 * Validation rules for admin login.
 */
export const loginValidator = [
  body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('A valid email is required.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
];
