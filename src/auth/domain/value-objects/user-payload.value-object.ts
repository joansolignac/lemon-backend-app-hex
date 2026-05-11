import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { UserRole } from '../../../users/domain/value-objects/user-rol.value-object';
import { UserEmail } from '../../../users/domain/value-objects/user-email.value-object';

export class UserPayload {
  private constructor(
    private readonly sub: UserId,
    private readonly role: UserRole,
    private readonly email: UserEmail,
  ) {}

  static from(params: {
    id: UserId;
    role: UserRole;
    email: UserEmail;
  }): UserPayload {
    return new UserPayload(params.id, params.role, params.email);
  }

  getSub(): UserId {
    return this.sub;
  }

  getRole(): UserRole {
    return this.role;
  }

  getEmail(): UserEmail {
    return this.email;
  }

  toPrimitives(): { sub: string; role: string; email: string } {
    return {
      sub: this.getSub().toPrimitives(),
      role: this.getRole().toPrimitives(),
      email: this.getEmail().toPrimitives(),
    };
  }
}
