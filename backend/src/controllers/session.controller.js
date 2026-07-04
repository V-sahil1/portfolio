import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { sessionService } from '../services/session.service.js';
import { getClientIp } from '../helpers/request.helper.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/**
 * POST /session — record a visitor session (public). Idempotent on sessionId.
 */
export const createSession = asyncHandler(async (req, res) => {
  const { session, created } = await sessionService.create(req.body, getClientIp(req));
  return sendSuccess(res, {
    statusCode: created ? HTTP_STATUS.CREATED : HTTP_STATUS.OK,
    message: MESSAGES.SESSION_CREATED,
    data: { session },
  });
});
