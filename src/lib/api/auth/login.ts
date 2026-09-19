import { api } from '@/lib/api/fetch';
import { LoginReq } from '@/types/api/auth/login.type';
import { TokenRes } from '@/types/api/common/token.type';

export async function login(request: LoginReq) {
  const data = await api.post<TokenRes>('auth/login', request, { skipAuth: true });

  return data;
}
