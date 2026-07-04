import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { dashboardService } from '../services/dashboard.service.js';
import { MESSAGES } from '../constants/index.js';

/**
 * GET /dashboard — headline analytics for the admin dashboard (cached).
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboard();
  return sendSuccess(res, { message: MESSAGES.DASHBOARD_OK, data });
});
