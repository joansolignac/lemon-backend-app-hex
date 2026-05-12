import { SalePaymentStatusRequiredException } from '../exceptions/sale-payment-status-required.exception';
import { SalePaymentStatusInvalidException } from '../exceptions/sale-payment-status-invalid.exception';

export const SALE_PAYMENT_STATUS = {
  PAGADO: 'PAGADO',
  PENDIENTE: 'PENDIENTE',
} as const;

export type SalePaymentStatusType =
  (typeof SALE_PAYMENT_STATUS)[keyof typeof SALE_PAYMENT_STATUS];

export class SalePaymentStatus {
  private readonly status: SalePaymentStatusType;

  private constructor(private readonly value: string) {
    const normalizedStatus = this.normalize(value);
    this.validateRequired(normalizedStatus);
    this.validateType(normalizedStatus);
    this.status = normalizedStatus as SalePaymentStatusType;
  }

  static generatePending(): SalePaymentStatus {
    return new SalePaymentStatus(SALE_PAYMENT_STATUS.PENDIENTE);
  }

  static generatePaid(): SalePaymentStatus {
    return new SalePaymentStatus(SALE_PAYMENT_STATUS.PAGADO);
  }

  static from(value: string): SalePaymentStatus {
    return new SalePaymentStatus(value);
  }

  isPaid(): boolean {
    return this.status === SALE_PAYMENT_STATUS.PAGADO;
  }

  isPending(): boolean {
    return this.status === SALE_PAYMENT_STATUS.PENDIENTE;
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new SalePaymentStatusRequiredException();
    }
  }

  private validateType(value: string): void {
    if (
      !Object.values(SALE_PAYMENT_STATUS).includes(value as SalePaymentStatusType)
    ) {
      throw new SalePaymentStatusInvalidException();
    }
  }

  toPrimitives(): string {
    return this.status;
  }
}
