import { api } from '@/lib/api/fetch';
import { setAuthCookies } from '@/lib/auth/cookies';
import { RegisterReq } from '@/types/api/auth/register.type';
import { tokenResSchema } from '@/types/api/common/token.type';

// Returns nothing on purpose: tokens must never travel back through a server
// action result to the client, they only belong in httpOnly cookies.
export async function register(request: RegisterReq): Promise<void> {
  const data = await api.post<unknown>('auth/register', request, { skipAuth: true });
  const tokens = tokenResSchema.parse(data);

  await setAuthCookies(tokens);
}
