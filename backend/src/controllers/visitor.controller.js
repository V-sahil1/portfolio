import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { visitorService } from '../services/visitor.service.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/**
 * POST /visitor — create/record a visitor (public; called from the portfolio).
 */
export const createVisitor = asyncHandler(async (req, res) => {
  const visitor = await visitorService.create(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGES.VISITOR_CREATED,
    data: { visitor },
  });
});

/**
 * GET /visitors — paginated, searchable, filterable list (admin only).
 */
export const listVisitors = asyncHandler(async (req, res) => {
  const { items, meta } = await visitorService.list(req.query);
  return sendSuccess(res, {
    message: MESSAGES.VISITORS_OK,
    data: { visitors: items },
    meta,
  });
});

/**
 * GET /visitor/:id — full visitor profile with sessions, events and contacts
 * (admin only).
 */
export const getVisitor = asyncHandler(async (req, res) => {
  const visitor = await visitorService.getProfile(req.params.id);
  return sendSuccess(res, {
    message: MESSAGES.VISITOR_OK,
    data: { visitor },
  });
});
