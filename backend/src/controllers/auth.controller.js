import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { authService } from '../services/auth.service.js';
import { config } from '../config/env.js';
import { HTTP_STATUS, MESSAGES } from '../constants/index.js';

/** Cookie options for the refresh token (httpOnly, secure in production). */
const refreshCookieOptions = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: 'lax',
  path: config.apiPrefix,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/**
 * POST /auth/login — authenticate an admin, set the refresh cookie and return
 * the access token + admin profile.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { admin, accessToken, refreshToken } = await authService.login(email, password);

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  return sendSuccess(res, {
    message: MESSAGES.LOGIN_SUCCESS,
    data: { admin, accessToken, refreshToken },
  });
});

/**
 * POST /auth/refresh — rotate the refresh token (from cookie or body) and issue
 * a new access token.
 */
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const { accessToken, refreshToken } = await authService.refresh(token);

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  return sendSuccess(res, {
    message: MESSAGES.TOKEN_REFRESHED,
    data: { accessToken, refreshToken },
  });
});

/**
 * POST /auth/logout — revoke the presented refresh token and clear the cookie.
 */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  await authService.logout(token);
  res.clearCookie('refreshToken', { path: config.apiPrefix });
  return sendSuccess(res, { message: MESSAGES.LOGOUT_SUCCESS, data: null });
});

/**
 * GET /auth/me — return the authenticated admin's claims (set by auth middleware).
 */
export const me = asyncHandler(async (req, res) =>
  sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: MESSAGES.SUCCESS,
    data: { admin: req.admin },
  }),
);
