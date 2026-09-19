import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { env } from '@/lib/env';
import { getAccessToken } from '@/lib/auth/cookies';
import { refreshAccessToken } from '@/lib/api/auth/refresh';

type RequestOptions = {
  method?: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  skipAuth?: boolean;
  signal?: AbortSignal;
};

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

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {},
  hasRetried = false
): Promise<T> {
  const { params, body, headers, skipAuth, method, signal } = options;

  const config: AxiosRequestConfig = {
    url: `${env.API_URL}${endpoint}`,
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
      await refreshAccessToken();
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
