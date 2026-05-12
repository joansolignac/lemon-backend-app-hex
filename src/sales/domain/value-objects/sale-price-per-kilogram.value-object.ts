import { SalePricePerKilogramRequiredException } from '../exceptions/sale-price-per-kilogram-required.exception';
import { SalePricePerKilogramInvalidFormatException } from '../exceptions/sale-price-per-kilogram-invalid-format.exception';
import { SalePricePerKilogramMustBePositiveException } from '../exceptions/sale-price-per-kilogram-must-be-positive.exception';

export class SalePricePerKilogram {
  private static readonly PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

  private constructor(private readonly price: number) {
    this.validateRequired(price);
    this.validateFormat(price);
    this.validatePositive(price);
    this.price = price;
  }

  static from(value: number): SalePricePerKilogram {
    return new SalePricePerKilogram(value);
  }

  private validateRequired(value: number): void {
    if (value === null || value === undefined) {
      throw new SalePricePerKilogramRequiredException();
    }
  }

  private validateFormat(value: number): void {
    const valueStr = value.toString();
    if (!SalePricePerKilogram.PRICE_REGEX.test(valueStr)) {
      throw new SalePricePerKilogramInvalidFormatException();
    }
  }

  private validatePositive(value: number): void {
    if (value <= 0) {
      throw new SalePricePerKilogramMustBePositiveException();
    }
  }

  toPrimitives(): number {
    return this.price;
  }
}
