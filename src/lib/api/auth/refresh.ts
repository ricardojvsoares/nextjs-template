import axios from 'axios';
import { cache } from 'react';
import { env } from '@/lib/env';
import { getRefreshToken, tryClearAuthCookies, trySetAuthCookies } from '@/lib/auth/cookies';
import { SessionExpiredError } from '@/lib/auth/errors';
import { tokenResSchema, type TokenRes } from '@/types/api/common/token.type';

function buildUrl(endpoint: string) {
  const base = env.API_URL.endsWith('/') ? env.API_URL : `${env.API_URL}/`;
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${base}${path}`;
}

async function requestRefresh(): Promise<TokenRes> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    await tryClearAuthCookies();
    throw new SessionExpiredError('No refresh token');
  }

  try {
    const { data } = await axios.post<unknown>(
      buildUrl('auth/refresh'),
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const tokens = tokenResSchema.parse(data);
    const written = await trySetAuthCookies(tokens);

    if (!written) {
      throw new SessionExpiredError('Refreshed tokens could not be persisted');
    }

    return tokens;
  } catch (error) {
    await tryClearAuthCookies();

    if (error instanceof SessionExpiredError) {
      throw error;
    }

    throw new SessionExpiredError('Token refresh failed');
  }
}

// A single request can fire several API calls that all get a 401. cache() keeps
// the dedupe scoped to the current request, so parallel calls share one refresh
// without ever handing one user's tokens to another.
export const refreshAccessToken = cache(requestRefresh);
