import { CustomerEmailInvalidFormatException } from '../exceptions/customer-email-invalid-format.exception';

export class CustomerEmail {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(private readonly email: string | null) {
    if (email !== null && email !== undefined) {
      const normalizedEmail = this.normalize(email);
      this.validateRegex(normalizedEmail);
      this.email = normalizedEmail;
    } else {
      this.email = null;
    }
  }

  static from(value: string | null): CustomerEmail {
    return new CustomerEmail(value);
  }

  private normalize(value: string): string {
    return value?.trim().toLowerCase();
  }

  private validateRegex(value: string): void {
    if (!CustomerEmail.EMAIL_REGEX.test(value)) {
      throw new CustomerEmailInvalidFormatException();
    }
  }

  toPrimitives(): string | null {
    return this.email;
  }
}
