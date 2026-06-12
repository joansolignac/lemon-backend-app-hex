import type { PaymentStatus } from '@prisma/client';

export type FindSalesInput = {
  search?: string;
  status?: PaymentStatus;
  date?: string;
  startDate?: string;
  endDate?: string;
  month?: number;
  year?: number;
  page?: number;
  limit?: number;
};
