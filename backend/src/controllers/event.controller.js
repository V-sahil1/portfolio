import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { eventService } from '../services/event.service.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/**
 * POST /event — track a visitor event (public).
 */
export const createEvent = asyncHandler(async (req, res) => {
  const event = await eventService.create(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGES.EVENT_TRACKED,
    data: { event },
  });
});
