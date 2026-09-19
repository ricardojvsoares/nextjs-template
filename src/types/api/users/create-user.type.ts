import { z } from 'zod';

const createUserInputSchema = z.object({
  email: z.email(),
  password: z.string(),
  displayName: z.string(),
});

const createUserReqSchema = createUserInputSchema.extend({
  roles: z.array(z.string()).optional(),
});

type CreateUserInput = z.infer<typeof createUserInputSchema>;
type CreateUserReq = z.infer<typeof createUserReqSchema>;

const createUserResSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  displayName: z.string(),
  isActive: z.boolean(),
  roles: z.array(z.string()),
  createdAtUtc: z.iso.datetime(),
  updatedAtUtc: z.iso.datetime(),
});

type CreateUserRes = z.infer<typeof createUserResSchema>;

export {
  createUserInputSchema,
  createUserReqSchema,
  createUserResSchema,
  type CreateUserInput,
  type CreateUserReq,
  type CreateUserRes,
};
