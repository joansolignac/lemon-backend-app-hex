import { CustomerAddressRequiredException } from '../exceptions/customer-address-required.exception';
import { CustomerAddressTooLongException } from '../exceptions/customer-address-too-long.exception';
import { CustomerAddressInvalidFormatException } from '../exceptions/customer-address-invalid-format.exception';

export class CustomerAddress {
  private constructor(private readonly address: string) {
    const normalizedAddress = this.normalize(address);
    this.validateRequired(normalizedAddress);
    this.validateLength(normalizedAddress);
    this.validateRegex(normalizedAddress);
    this.address = normalizedAddress;
  }

  static from(value: string): CustomerAddress {
    return new CustomerAddress(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerAddressRequiredException();
    }
  }

  private validateLength(value: string): void {
    if (value.length > 255) {
      throw new CustomerAddressTooLongException();
    }
  }

  private validateRegex(value: string): void {
    if (/^$/.test(value)) {
      throw new CustomerAddressInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.address;
  }
}
