import type { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  type AuthTokens,
} from '@/lib/auth/cookie-config';

export function getAuthTokensFromRequest(request: NextRequest) {
  return {
    accessToken: request.cookies.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: request.cookies.get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

export function setAuthCookiesOnResponse(response: NextResponse, tokens: AuthTokens) {
  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    tokens.accessToken,
    accessTokenCookieOptions(tokens.accessTokenExpiresAtUtc)
  );
  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenCookieOptions());
}

export function clearAuthCookiesOnResponse(response: NextResponse) {
  response.cookies.delete({ name: ACCESS_TOKEN_COOKIE, path: '/' });
  response.cookies.delete({ name: REFRESH_TOKEN_COOKIE, path: '/' });
}
