import { SaleKilogramsRequiredException } from '../exceptions/sale-kilograms-required.exception';
import { SaleKilogramsInvalidFormatException } from '../exceptions/sale-kilograms-invalid-format.exception';
import { SaleKilogramsMustBePositiveException } from '../exceptions/sale-kilograms-must-be-positive.exception';

export class SaleKilograms {
  private static readonly KILOGRAMS_REGEX = /^\d+(\.\d{1,2})?$/;

  private constructor(private readonly kilograms: number) {
    this.validateRequired(kilograms);
    this.validateFormat(kilograms);
    this.validatePositive(kilograms);
    this.kilograms = kilograms;
  }

  static from(value: number): SaleKilograms {
    return new SaleKilograms(value);
  }

  private validateRequired(value: number): void {
    if (value === null || value === undefined) {
      throw new SaleKilogramsRequiredException();
    }
  }

  private validateFormat(value: number): void {
    const valueStr = value.toString();
    if (!SaleKilograms.KILOGRAMS_REGEX.test(valueStr)) {
      throw new SaleKilogramsInvalidFormatException();
    }
  }

  private validatePositive(value: number): void {
    if (value <= 0) {
      throw new SaleKilogramsMustBePositiveException();
    }
  }

  toPrimitives(): number {
    return this.kilograms;
  }
}
