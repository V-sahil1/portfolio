import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { analyticsService } from '../services/analytics.service.js';
import { MESSAGES } from '../constants/index.js';

/**
 * GET /analytics — full analytics report (time series + breakdowns), cached.
 */
export const getAnalytics = asyncHandler(async (req, res) => {
  const data = await analyticsService.getReport(req.query);
  return sendSuccess(res, { message: MESSAGES.ANALYTICS_OK, data });
});

/**
 * GET /analytics/search — search visitors by company/designation/name/country/date.
 */
export const searchVisitors = asyncHandler(async (req, res) => {
  const { items, meta } = await analyticsService.search(req.query);
  return sendSuccess(res, {
    message: MESSAGES.VISITORS_OK,
    data: { visitors: items },
    meta,
  });
});
