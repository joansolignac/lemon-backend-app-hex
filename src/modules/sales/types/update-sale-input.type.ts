import type { PaymentStatus } from '@prisma/client';

export type UpdateSaleInput = {
  kilograms?: number;
  pricePerKilogram?: number;
  paymentStatus?: PaymentStatus;
};
