import { query } from 'express-validator';

/**
 * Validation for analytics endpoints that accept an optional date range and
 * grouping granularity.
 */
export const analyticsRangeValidator = [
  query('startDate').optional().isISO8601().withMessage('startDate must be ISO-8601.'),
  query('endDate').optional().isISO8601().withMessage('endDate must be ISO-8601.'),
  query('range')
    .optional()
    .isIn(['today', 'week', 'month', 'year', 'all'])
    .withMessage('range must be one of: today, week, month, year, all.'),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
];

/**
 * Validation for the search endpoint (by company/designation/name/country/date).
 */
export const searchValidator = [
  query('company').optional().trim(),
  query('designation').optional().trim(),
  query('name').optional().trim(),
  query('country').optional().trim(),
  query('date').optional().isISO8601().withMessage('date must be ISO-8601.'),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];
