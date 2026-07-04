import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { contactService } from '../services/contact.service.js';
import { getClientIp } from '../helpers/request.helper.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/**
 * POST /contact — store a contact-form submission (public). Triggers an async
 * notification email to the portfolio owner.
 */
export const createContact = asyncHandler(async (req, res) => {
  const contact = await contactService.create(req.body, getClientIp(req));
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGES.CONTACT_RECEIVED,
    data: { contact },
  });
});
