import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { authService } from '../services/auth.service.js';
import { MESSAGES } from '../constants/index.js';

/**
 * POST /auth/login — admin login; returns a JWT on success.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, admin } = await authService.login(email, password);
  return sendSuccess(res, {
    message: MESSAGES.LOGIN_SUCCESS,
    data: { token, admin },
  });
});
