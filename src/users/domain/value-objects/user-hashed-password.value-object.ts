import { UserHashedPasswordRequiredException } from '../exceptions/user-hashed-password-required.exception';
import { UserHashedPasswordTooLongException } from '../exceptions/user-hashed-password-too-long.exception';
import { UserHashedPasswordInvalidFormatException } from '../exceptions/user-hashed-password-invalid-format.exception';

export class UserHashedPassword {
  private static readonly HASH_REGEX = /^\$argon2(id|i|d)\$.*$/;

  private constructor(private readonly password: string) {
    const normalizedPassword = this.normalize(password);
    this.validateRequired(normalizedPassword);
    this.validateLength(normalizedPassword);
    this.validateRegex(normalizedPassword);
    this.password = normalizedPassword;
  }

  static from(value: string): UserHashedPassword {
    return new UserHashedPassword(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new UserHashedPasswordRequiredException();
    }
  }

  private validateLength(value: string): void {
    if (value.length > 255) {
      throw new UserHashedPasswordTooLongException();
    }
  }

  private validateRegex(value: string): void {
    if (!UserHashedPassword.HASH_REGEX.test(value)) {
      throw new UserHashedPasswordInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.password;
  }
}
