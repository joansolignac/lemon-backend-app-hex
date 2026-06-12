import type { UserStatus } from '@prisma/client';

export type GetAllUsersPaginatedInput = {
  search?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
};
