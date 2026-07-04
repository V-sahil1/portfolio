import { body } from 'express-validator';

/**
 * Validation for creating a visitor session. Only `sessionId` is mandatory;
 * device/geo enrichment fields are optional and may be filled server-side.
 */
export const createSessionValidator = [
  body('sessionId').notEmpty().withMessage('sessionId is required.').isUUID().withMessage('sessionId must be a UUID.'),
  body('visitorId').optional({ values: 'falsy' }).isUUID().withMessage('visitorId must be a UUID.'),
  body('country').optional().trim().isLength({ max: 100 }),
  body('city').optional().trim().isLength({ max: 100 }),
  body('region').optional().trim().isLength({ max: 100 }),
  body('browser').optional().trim().isLength({ max: 100 }),
  body('browserVersion').optional().trim().isLength({ max: 50 }),
  body('operatingSystem').optional().trim().isLength({ max: 100 }),
  body('device').optional().trim().isLength({ max: 100 }),
  body('deviceType').optional().isIn(['desktop', 'mobile', 'tablet', 'bot', 'unknown']),
  body('screenResolution').optional().trim().isLength({ max: 30 }),
  body('language').optional().trim().isLength({ max: 30 }),
  body('timezone').optional().trim().isLength({ max: 60 }),
  body('landingPage').optional().trim().isLength({ max: 255 }),
  body('referrer').optional().trim().isLength({ max: 500 }),
  body('visitDuration').optional().isInt({ min: 0 }).toInt(),
];
