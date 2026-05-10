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
      throw new Error('Hashed password is required');
    }
  }

  private validateLength(value: string): void {
    if (value.length > 255) {
      throw new Error('Hashed password exceeds maximum length');
    }
  }

  private validateRegex(value: string): void {
    if (!UserHashedPassword.HASH_REGEX.test(value)) {
      throw new Error('Invalid hashed password format');
    }
  }

  toPrimitives(): string {
    return this.password;
  }
}
