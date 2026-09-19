export const LOGIN_PATH = '/login';
export const DEFAULT_AFTER_LOGIN_PATH = '/';

export function sanitizeNextPath(next: unknown, fallback = DEFAULT_AFTER_LOGIN_PATH) {
  if (typeof next !== 'string' || next.length === 0) {
    return fallback;
  }

  if (!next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return fallback;
  }

  if (/[\x00-\x1f\x7f]/.test(next)) {
    return fallback;
  }

  return next;
}
