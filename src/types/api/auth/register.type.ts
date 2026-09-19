import { z } from 'zod';

export const registerReqSchema = z.object({
    email: z.email(),
    password: z.string(),
    displayName: z.string(),
});

export type RegisterReq = z.infer<typeof registerReqSchema>;


