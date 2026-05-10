export const ROLE = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  SUPERVISOR: 'SUPERVISOR',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];

export class UserRole {
  private readonly role: Role;

  private constructor(private readonly value: string) {
    const normalizedRole = this.normalize(value);
    this.validateRequired(normalizedRole);
    this.validateType(normalizedRole);
    this.role = normalizedRole as Role;
  }

  static generateAdministrador(): UserRole {
    return new UserRole(ROLE.ADMINISTRADOR);
  }

  static generateSupervisor(): UserRole {
    return new UserRole(ROLE.SUPERVISOR);
  }

  static from(value: string): UserRole {
    return new UserRole(value);
  }

  private normalize(value: string): string {
    return value?.trim().toUpperCase();
  }

  private validateRequired(value: string): void {
    if (!value) {
      throw new Error('Rol is required');
    }
  }

  private validateType(value: string): void {
    if (!Object.values(ROLE).includes(value as Role)) {
      throw new Error('Invalid type');
    }
  }

  toPrimitives(): string {
    return this.role;
  }
}
