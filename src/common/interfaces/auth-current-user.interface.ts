import type { Role } from '@prisma/client';

export interface AuthCurrentUser {
  id: string;
  email: string;
  role: Role;
}
