import { UserEmailRequiredException } from '../exceptions/user-email-required.exception.js';
import { UserEmailInvalidFormatException } from '../exceptions/user-email-invalid-format.exception.js';

export class UserEmail {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(private readonly email: string) {
    const normalizedEmail = this.normalize(email);
    this.validateRequired(normalizedEmail);
    this.validateRegex(normalizedEmail);
    this.email = normalizedEmail;
  }

  static from(value: string): UserEmail {
    return new UserEmail(value);
  }

  private normalize(value: string): string {
    return value?.trim().toLowerCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new UserEmailRequiredException();
    }
  }

  private validateRegex(value: string): void {
    if (!UserEmail.EMAIL_REGEX.test(value)) {
      throw new UserEmailInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.email;
  }
}
