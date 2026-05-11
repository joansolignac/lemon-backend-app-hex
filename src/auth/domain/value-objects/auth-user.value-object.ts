import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { UserEmail } from '../../../users/domain/value-objects/user-email.value-object';
import { UserRole } from '../../../users/domain/value-objects/user-rol.value-object';

export class AuthUser {
  private constructor(
    private readonly id: UserId,
    private readonly role: UserRole,
    private readonly email: UserEmail,
  ) {}

  static from(params: {
    sub: UserId;
    role: UserRole;
    email: UserEmail;
  }): AuthUser {
    return new AuthUser(params.sub, params.role, params.email);
  }

  private getId(): string {
    return this.id.toPrimitives();
  }

  private getRole(): string {
    return this.role.toPrimitives();
  }

  private getEmail(): string {
    return this.email.toPrimitives();
  }

  toPrimitives(): { id: string; role: string; email: string } {
    return {
      id: this.getId(),
      role: this.getRole(),
      email: this.getEmail(),
    };
  }
}
