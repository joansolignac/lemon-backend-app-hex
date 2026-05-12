import { CustomerStatusRequiredException } from '../exceptions/customer-status-required.exception';
import { CustomerStatusInvalidException } from '../exceptions/customer-status-invalid.exception';

export const CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type CustomerStatusType =
  (typeof CUSTOMER_STATUS)[keyof typeof CUSTOMER_STATUS];

export class CustomerStatus {
  private readonly status: CustomerStatusType;

  private constructor(private readonly value: string) {
    const normalizedStatus = this.normalize(value);
    this.validateRequired(normalizedStatus);
    this.validateType(normalizedStatus);
    this.status = normalizedStatus as CustomerStatusType;
  }

  static generateActive(): CustomerStatus {
    return new CustomerStatus(CUSTOMER_STATUS.ACTIVE);
  }

  static generateInactive(): CustomerStatus {
    return new CustomerStatus(CUSTOMER_STATUS.INACTIVE);
  }

  static from(value: string): CustomerStatus {
    return new CustomerStatus(value);
  }

  isActive(): boolean {
    return this.status === CUSTOMER_STATUS.ACTIVE;
  }

  isInactive(): boolean {
    return this.status === CUSTOMER_STATUS.INACTIVE;
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerStatusRequiredException();
    }
  }

  private validateType(value: string): void {
    if (!Object.values(CUSTOMER_STATUS).includes(value as CustomerStatusType)) {
      throw new CustomerStatusInvalidException();
    }
  }

  toPrimitives(): string {
    return this.status;
  }
}
