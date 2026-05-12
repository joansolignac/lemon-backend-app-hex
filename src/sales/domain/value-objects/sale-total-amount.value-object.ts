import { SaleTotalAmountRequiredException } from '../exceptions/sale-total-amount-required.exception';
import { SaleTotalAmountInvalidFormatException } from '../exceptions/sale-total-amount-invalid-format.exception';

export class SaleTotalAmount {
  private static readonly AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;

  private constructor(private readonly amount: number) {
    this.validateRequired(amount);
    this.validateFormat(amount);
    this.amount = amount;
  }

  static from(value: number): SaleTotalAmount {
    return new SaleTotalAmount(value);
  }

  private validateRequired(value: number): void {
    if (value === null || value === undefined) {
      throw new SaleTotalAmountRequiredException();
    }
  }

  private validateFormat(value: number): void {
    const valueStr = value.toString();
    if (!SaleTotalAmount.AMOUNT_REGEX.test(valueStr)) {
      throw new SaleTotalAmountInvalidFormatException();
    }
  }

  toPrimitives(): number {
    return this.amount;
  }
}
