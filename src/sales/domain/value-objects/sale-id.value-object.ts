import { randomUUID } from 'node:crypto';
import { SaleIdRequiredException } from '../exceptions/sale-id-required.exception';
import { SaleIdInvalidFormatException } from '../exceptions/sale-id-invalid-format.exception';

export class SaleId {
  private static readonly UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  private constructor(private readonly id: string) {
    const normalizedId = this.normalize(id);
    this.validateRequired(normalizedId);
    this.validateRegex(normalizedId);
    this.id = normalizedId;
  }

  static generate(): SaleId {
    return new SaleId(randomUUID());
  }

  static from(value: string): SaleId {
    return new SaleId(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new SaleIdRequiredException();
    }
  }

  private validateRegex(value: string): void {
    if (!SaleId.UUID_REGEX.test(value)) {
      throw new SaleIdInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.id;
  }
}
