import type { CustomerStatus } from '@prisma/client';

export type GetAllCustomersPaginatedInput = {
  search?: string;
  status?: CustomerStatus;
  page?: number;
  limit?: number;
};
