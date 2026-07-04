import { body } from 'express-validator';

/**
 * Validation chain for admin login.
 */
export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('A valid email is required.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

/**
 * Validation chain for refreshing an access token.
 * The refresh token may arrive in the body or via an httpOnly cookie.
 */
export const refreshValidator = [
  body('refreshToken')
    .optional()
    .isString()
    .withMessage('refreshToken must be a string.'),
];
