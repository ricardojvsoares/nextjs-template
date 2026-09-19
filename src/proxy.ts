import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/lib/env';
import { ACCESS_TOKEN_COOKIE } from '@/lib/auth/cookie-config';
import {
  clearAuthCookiesOnResponse,
  getAuthTokensFromRequest,
  setAuthCookiesOnResponse,
} from '@/lib/auth/edge-cookies';
import { LOGIN_PATH } from '@/lib/auth/redirects';
import { tokenResSchema, type TokenRes } from '@/types/api/common/token.type';

function buildApiUrl(endpoint: string) {
  const base = env.API_URL.endsWith('/') ? env.API_URL : `${env.API_URL}/`;
  return `${base}${endpoint}`;
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  url.search = '';

  const response = NextResponse.redirect(url);
  clearAuthCookiesOnResponse(response);

  return response;
}

async function refreshTokens(refreshToken: string): Promise<TokenRes | null> {
  try {
    const response = await fetch(buildApiUrl('auth/refresh'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const parsed = tokenResSchema.safeParse(await response.json());

    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { accessToken, refreshToken } = getAuthTokensFromRequest(request);

  if (accessToken) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return redirectToLogin(request);
  }

  const tokens = await refreshTokens(refreshToken);

  if (!tokens) {
    return redirectToLogin(request);
  }

  // Forward the fresh access token to this render pass as well, otherwise the
  // server components below would still see a request without a token.
  request.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken);

  const response = NextResponse.next({ request });
  setAuthCookiesOnResponse(response, tokens);

  return response;
}

export const config = {
  matcher: ['/((?!login|signup|api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
