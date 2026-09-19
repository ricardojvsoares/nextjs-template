'use server';

import { redirect } from 'next/navigation';
import { login } from '@/lib/api/auth/login';
import { describeApiError } from '@/lib/api/fetch';
import { setAuthCookies } from '@/lib/auth/cookies';
import { loginReqSchema } from '@/types/api/auth/login.type';
import { tokenResSchema } from '@/types/api/common/token.type';

export type LoginActionState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const parsed = loginReqSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: 'Invalid email or password' };
  }

  try {
    const data = tokenResSchema.parse(await login(parsed.data));
    await setAuthCookies(data);
  } catch (error) {
    console.error('Login failed:', describeApiError(error));

    return { error: 'Invalid email or password' };
  }

  redirect('/');
}
