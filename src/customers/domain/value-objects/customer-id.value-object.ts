import { randomUUID } from 'node:crypto';
import { CustomerIdRequiredException } from '../exceptions/customer-id-required.exception';
import { CustomerIdInvalidFormatException } from '../exceptions/customer-id-invalid-format.exception';

export class CustomerId {
  private static readonly UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  private constructor(private readonly id: string) {
    const normalizedId = this.normalize(id);
    this.validateRequired(normalizedId);
    this.validateRegex(normalizedId);
    this.id = normalizedId;
  }

  static generate(): CustomerId {
    return new CustomerId(randomUUID());
  }

  static from(value: string): CustomerId {
    return new CustomerId(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new CustomerIdRequiredException();
    }
  }

  private validateRegex(value: string): void {
    if (!CustomerId.UUID_REGEX.test(value)) {
      throw new CustomerIdInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.id;
  }
}
