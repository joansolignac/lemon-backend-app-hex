import { randomUUID } from 'node:crypto';
import { UserIdRequiredException } from '../exceptions/user-id-required.exception';
import { UserIdInvalidFormatException } from '../exceptions/user-id-invalid-format.exception';

export class UserId {
  private static readonly UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  private constructor(private readonly id: string) {
    const normalizedId = this.normalize(id);
    this.validateRequired(normalizedId);
    this.validateRegex(normalizedId);
    this.id = normalizedId;
  }

  static generate(): UserId {
    return new UserId(randomUUID());
  }

  static from(value: string): UserId {
    return new UserId(value);
  }

  private normalize(value: string): string {
    return value?.trim();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new UserIdRequiredException();
    }
  }

  private validateRegex(value: string): void {
    if (!UserId.UUID_REGEX.test(value)) {
      throw new UserIdInvalidFormatException();
    }
  }

  toPrimitives(): string {
    return this.id;
  }
}
