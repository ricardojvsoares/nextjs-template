const isProduction = process.env.NODE_ENV === 'production';

// The __Host- prefix locks the cookie to this exact host with path=/ and requires
// Secure, so it can only be set over HTTPS. Keep the plain names in development.
export const ACCESS_TOKEN_COOKIE = isProduction ? '__Host-access_token' : 'access_token';
export const REFRESH_TOKEN_COOKIE = isProduction ? '__Host-refresh_token' : 'refresh_token';

export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const ACCESS_TOKEN_FALLBACK_MAX_AGE_SECONDS = 60 * 5;

export type AuthTokens = {
  accessToken: string;
  accessTokenExpiresAtUtc: string;
  refreshToken: string;
};

type CookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: 'lax' | 'strict';
  path: '/';
  expires?: Date;
  maxAge?: number;
};

function baseCookieOptions(): Omit<CookieOptions, 'sameSite'> {
  return {
    httpOnly: true,
    secure: isProduction,
    path: '/',
  };
}

export function accessTokenCookieOptions(accessTokenExpiresAtUtc: string): CookieOptions {
  const expires = new Date(accessTokenExpiresAtUtc);

  if (Number.isNaN(expires.getTime())) {
    return {
      ...baseCookieOptions(),
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_FALLBACK_MAX_AGE_SECONDS,
    };
  }

  return { ...baseCookieOptions(), sameSite: 'lax', expires };
}

// sameSite stays 'lax' instead of 'strict': the middleware needs the refresh
// token on top-level navigations that start on another site (email links), and
// 'strict' would withhold it there and force a pointless re-login. Lax already
// blocks cross-site POSTs, iframes and subresource requests.
export function refreshTokenCookieOptions(): CookieOptions {
  return {
    ...baseCookieOptions(),
    sameSite: 'lax',
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  };
}
