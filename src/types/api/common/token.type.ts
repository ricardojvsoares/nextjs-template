import { z } from 'zod';

export const tokenResSchema = z.object({
  accessToken: z.string(),
  accessTokenExpiresAtUtc: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
});

export type TokenRes = z.infer<typeof tokenResSchema>;
