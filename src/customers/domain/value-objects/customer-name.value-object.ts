import { CustomerNameRequiredException } from '../exceptions/customer-name-required.exception';
import { CustomerNameTooLongException } from '../exceptions/customer-name-too-long.exception';
import { CustomerNameInvalidFormatException } from '../exceptions/customer-name-invalid-format.exception';

export class CustomerName {
  private static readonly NAME_REGEX = /^[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ' ]+$/;

  private constructor(private readonly name: string) {
    const normalizedName = this.normalize(name);
    this.validateRequired(normalizedName);
    this.validateLength(normalizedName);
    this.validateRegex(normalizedName);
    this.name = normalizedName;
  }

  static from(value: string): CustomerName {
    return new CustomerName(value);
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerNameRequiredException();
    }
  }

  private validateLength(value: string): void {
    if (value.length > 200) {
      throw new CustomerNameTooLongException();
    }
  }

  private validateRegex(value: string): void {
    if (!CustomerName.NAME_REGEX.test(value)) {
      throw new CustomerNameInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.name;
  }
}
