import { api } from '@/lib/api/fetch';
import {
  createUserReqSchema,
  createUserResSchema,
  type CreateUserReq,
  type CreateUserRes,
} from '@/types/api/users/create-user.type';

export async function createUser(request: CreateUserReq) {
  const body = createUserReqSchema.parse(request);
  const data = await api.post<CreateUserRes>('users', body);
  return createUserResSchema.parse(data);
}
