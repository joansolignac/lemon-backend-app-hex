import { Prisma } from '@prisma/client';
import { Sale } from '../../../../domain/entities/sale.entity';
import { SaleId } from '../../../../domain/value-objects/sale-id.value-object';
import { CustomerId } from '../../../../../customers/domain/value-objects/customer-id.value-object';
import { UserId } from '../../../../../users/domain/value-objects/user-id.value-object';
import { SaleKilograms } from '../../../../domain/value-objects/sale-kilograms.value-object';
import { SalePricePerKilogram } from '../../../../domain/value-objects/sale-price-per-kilogram.value-object';
import { SaleTotalAmount } from '../../../../domain/value-objects/sale-total-amount.value-object';
import { SalePaymentStatus } from '../../../../domain/value-objects/sale-payment-status.value-object';

export type PrismaSale = Prisma.SaleGetPayload<Record<string, never>>;

export const toSaleDomain = (sale: PrismaSale): Sale => {
  const saleId = SaleId.from(sale.id);
  const customerId = CustomerId.from(sale.customerId);
  const sellerId = UserId.from(sale.sellerId);
  const kilograms = SaleKilograms.from(sale.kilograms.toNumber());
  const pricePerKilogram = SalePricePerKilogram.from(
    sale.pricePerKilogram.toNumber(),
  );
  const totalAmount = SaleTotalAmount.from(sale.totalAmount.toNumber());
  const paymentStatus = SalePaymentStatus.from(sale.paymentStatus);
  const createdAt = sale.createdAt;
  const updatedAt = sale.updatedAt;

  return Sale.from(
    saleId,
    customerId,
    sellerId,
    kilograms,
    pricePerKilogram,
    totalAmount,
    paymentStatus,
    createdAt,
    updatedAt,
  );
};

export const toSalesDomainList = (sales: PrismaSale[]): Sale[] => {
  return sales.map(toSaleDomain);
};
