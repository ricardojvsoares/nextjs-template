import { z } from 'zod';

export const loginReqSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginReq = z.infer<typeof loginReqSchema>;
