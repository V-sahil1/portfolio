import { body } from 'express-validator';
import { EVENT_TYPE_VALUES } from '../constants/index.js';

/**
 * Validation for tracking an event. `action` must be one of the known
 * EVENT_TYPES; `metadata` is a free-form object.
 */
export const createEventValidator = [
  body('action')
    .notEmpty()
    .withMessage('action is required.')
    .isIn(EVENT_TYPE_VALUES)
    .withMessage(`action must be one of: ${EVENT_TYPE_VALUES.join(', ')}`),
  body('sessionId').optional({ values: 'falsy' }).isUUID().withMessage('sessionId must be a UUID.'),
  body('visitorId').optional({ values: 'falsy' }).isUUID().withMessage('visitorId must be a UUID.'),
  body('page').optional().trim().isLength({ max: 255 }),
  body('metadata')
    .optional()
    .custom((value) => value === null || typeof value === 'object')
    .withMessage('metadata must be an object.'),
];
