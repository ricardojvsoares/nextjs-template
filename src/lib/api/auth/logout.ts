import { api } from '@/lib/api/fetch';
import { clearAuthCookies } from '@/lib/auth/cookies';

export async function logout() {
  try {
    await api.post('auth/logout');
  } catch {
    // Always clear local cookies even if the API call fails.
  } finally {
    await clearAuthCookies();
  }
}
