import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { env } from '@/lib/env';
import { getAccessToken } from '@/lib/auth/cookies';
import { refreshAccessToken } from '@/lib/api/auth/refresh';
import { SessionExpiredError } from '@/lib/auth/errors';

type RequestOptions = {
  method?: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  signal?: AbortSignal;
};

function buildUrl(endpoint: string) {
  const base = env.API_URL.endsWith('/') ? env.API_URL : `${env.API_URL}/`;
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${base}${path}`;
}

async function buildAuthHeaders(skipAuth?: boolean) {
  if (skipAuth) {
    return {};
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return {};
  }

  return { Authorization: `Bearer ${accessToken}` };
}

export function describeApiError(error: unknown) {
  if (error instanceof AxiosError) {
    return `${error.config?.method?.toUpperCase() ?? 'REQUEST'} ${error.config?.url ?? 'unknown'} failed with status ${error.response?.status ?? 'none'}`;
  }

  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  return 'Unknown API error';
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {},
  hasRetried = false
): Promise<T> {
  const { params, body, headers, skipAuth, method, signal } = options;

  const config: AxiosRequestConfig = {
    url: buildUrl(endpoint),
    method: method ?? 'GET',
    params,
    data: body,
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...(await buildAuthHeaders(skipAuth)),
      ...headers,
    },
  };

  try {
    const response = await axios.request<T>(config);
    return response.data;
  } catch (error) {
    if (!skipAuth && !hasRetried && error instanceof AxiosError && error.response?.status === 401) {
      // The middleware refreshes before render, so reaching this point means the
      // access token died mid-request. Refreshing here can only persist new
      // cookies inside a server action or route handler; during render the write
      // is rejected and the session is reported as expired instead of crashing.
      try {
        await refreshAccessToken();
      } catch {
        throw new SessionExpiredError();
      }

      return apiFetch<T>(endpoint, options, true);
    }

    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};
