import { z } from 'zod';

export const currentUserResSchema = z.object({
    id: z.string(),
    email: z.email(),
    displayName: z.string(),
    roles: z.array(z.string()),
    permissions: z.array(z.string()),
});

export type CurrentUserRes = z.infer<typeof currentUserResSchema>;
