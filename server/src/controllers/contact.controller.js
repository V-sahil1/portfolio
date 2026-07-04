import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { contactService } from '../services/contact.service.js';
import { getClientIp } from '../utils/request.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/**
 * POST /contact — validate → store → WhatsApp notify → success.
 * Always returns success once the contact is stored, even if WhatsApp fails.
 */
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  await contactService.createContact({
    name,
    email,
    message,
    ipAddress: getClientIp(req),
    userAgent: req.headers['user-agent'] || '',
  });

  // Response intentionally minimal, exactly as specified.
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: MESSAGES.CONTACT_SAVED,
    data: null,
  });
});

/**
 * GET /contacts — paginated list of submissions (admin, JWT-protected).
 */
export const listContacts = asyncHandler(async (req, res) => {
  const { items, meta } = await contactService.listContacts(req.query);
  return sendSuccess(res, {
    message: MESSAGES.CONTACTS_OK,
    data: { contacts: items, meta },
  });
});
