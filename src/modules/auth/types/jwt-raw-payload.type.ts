import type { Role } from '@prisma/client';

export type JwtRawPayload = {
  sub: string;
  role: Role;
  email: string;
};
