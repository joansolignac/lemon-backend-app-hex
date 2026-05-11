import { UserNameRequiredException } from '../exceptions/user-name-required.exception.js';
import { UserNameTooLongException } from '../exceptions/user-name-too-long.exception.js';
import { UserNameInvalidFormatException } from '../exceptions/user-name-invalid-format.exception.js';

export class UserName {
  private static readonly NAME_REGEX = /^[A-ZÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÑ' ]+$/;

  private constructor(private readonly name: string) {
    const normalizedName = this.normalize(name);
    this.validateRequired(normalizedName);
    this.validateLength(normalizedName);
    this.validateRegex(normalizedName);
    this.name = normalizedName;
  }

  static from(value: string): UserName {
    return new UserName(value);
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new UserNameRequiredException();
    }
  }

  private validateLength(value: string): void {
    if (value.length > 200) {
      throw new UserNameTooLongException();
    }
  }

  private validateRegex(value: string): void {
    if (!UserName.NAME_REGEX.test(value)) {
      throw new UserNameInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.name;
  }
}
