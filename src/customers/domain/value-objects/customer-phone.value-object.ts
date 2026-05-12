import { CustomerPhoneRequiredException } from '../exceptions/customer-phone-required.exception';
import { CustomerPhoneInvalidFormatException } from '../exceptions/customer-phone-invalid-format.exception';

export class CustomerPhone {
  private static readonly PHONE_REGEX = /^\d{9}$/;

  private constructor(private readonly phone: string) {
    const normalizedPhone = this.normalize(phone);
    this.validateRequired(normalizedPhone);
    this.validateRegex(normalizedPhone);
    this.phone = normalizedPhone;
  }

  static from(value: string): CustomerPhone {
    return new CustomerPhone(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerPhoneRequiredException();
    }
  }

  private validateRegex(value: string): void {
    if (!CustomerPhone.PHONE_REGEX.test(value)) {
      throw new CustomerPhoneInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.phone;
  }
}
