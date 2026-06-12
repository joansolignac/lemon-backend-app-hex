import type { Role } from '@prisma/client';

export type CreateUserInput = {
  role: Role;
  name: string;
  email: string;
  password: string;
};
