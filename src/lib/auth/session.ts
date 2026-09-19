import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { getCurrentUser } from '@/lib/api/auth/me';
import { describeApiError } from '@/lib/api/fetch';
import { isSessionExpiredError } from '@/lib/auth/errors';
import type { CurrentUserRes } from '@/types/api/auth/me.type';

const loadCurrentUser = cache(getCurrentUser);

export async function requireUser(): Promise<CurrentUserRes> {
  try {
    return await loadCurrentUser();
  } catch (error) {
    const unauthorized =
      isSessionExpiredError(error) ||
      (error instanceof AxiosError &&
        (error.response?.status === 401 || error.response?.status === 403));

    if (!unauthorized) {
      throw error;
    }

    console.error('Session check failed:', describeApiError(error));

    redirect('/login');
  }
}
