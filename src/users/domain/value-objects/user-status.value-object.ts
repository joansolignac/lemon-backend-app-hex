export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type UserStatusType = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export class UserStatus {
  private readonly status: UserStatusType;

  private constructor(private readonly value: string) {
    const normalizedStatus = this.normalize(value);
    this.validateRequired(normalizedStatus);
    this.validateType(normalizedStatus);
    this.status = normalizedStatus as UserStatusType;
  }

  static generateActive(): UserStatus {
    return new UserStatus(USER_STATUS.ACTIVE);
  }

  static generateInactive(): UserStatus {
    return new UserStatus(USER_STATUS.INACTIVE);
  }

  static from(value: string): UserStatus {
    return new UserStatus(value);
  }

  isActive(): boolean {
    return this.status === USER_STATUS.ACTIVE;
  }

  isInactive(): boolean {
    return this.status === USER_STATUS.INACTIVE;
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new Error('Status is required');
    }
  }

  private validateType(value: string): void {
    if (!Object.values(USER_STATUS).includes(value as UserStatusType)) {
      throw new Error('Status is not valid');
    }
  }

  toPrimitives(): string {
    return this.status;
  }
}
