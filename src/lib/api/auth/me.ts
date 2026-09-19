import { api } from '@/lib/api/fetch';
import { currentUserResSchema } from '@/types/api/auth/me.type';

export async function getCurrentUser() {
  return currentUserResSchema.parse(await api.get<unknown>('auth/me'));
}
