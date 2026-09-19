import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  type AuthTokens,
} from '@/lib/auth/cookie-config';

export { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE };

export async function setAuthCookies(tokens: AuthTokens) {
  const store = await cookies();

  store.set(
    ACCESS_TOKEN_COOKIE,
    tokens.accessToken,
    accessTokenCookieOptions(tokens.accessTokenExpiresAtUtc)
  );
  store.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshTokenCookieOptions());
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete({ name: ACCESS_TOKEN_COOKIE, path: '/' });
  store.delete({ name: REFRESH_TOKEN_COOKIE, path: '/' });
}

// Cookie writes are only allowed in server actions, route handlers and middleware.
// During a render pass Next.js throws, so callers on the read path need a variant
// that reports failure instead of crashing the page.
export async function trySetAuthCookies(tokens: AuthTokens) {
  try {
    await setAuthCookies(tokens);
    return true;
  } catch {
    return false;
  }
}

export async function tryClearAuthCookies() {
  try {
    await clearAuthCookies();
    return true;
  } catch {
    return false;
  }
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value;
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get(REFRESH_TOKEN_COOKIE)?.value;
}
