import { z } from 'zod';

export const refreshReqSchema = z.object({
    refreshToken: z.string(),
});

export type RefreshReq = z.infer<typeof refreshReqSchema>;