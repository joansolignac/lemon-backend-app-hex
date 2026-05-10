import { UserId } from '../value-objects/user-id.value-object';
import { UserName } from '../value-objects/user-name.value-object';
import { UserEmail } from '../value-objects/user-email.value-object';
import { UserHashedPassword } from '../value-objects/user-hashed-password.value-object';
import { UserStatus } from '../value-objects/user-status.value-object';
import { UserRole } from '../value-objects/user-rol.volue-object';

export class User {
  private constructor(
    private readonly id: UserId,
    private role: UserRole,
    private name: UserName,
    private email: UserEmail,
    private hashedPassword: UserHashedPassword,
    private status: UserStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt?: Date,
  ) {}

  static create(params: {
    role: string;
    name: string;
    email: string;
    hashedPassword: string;
  }): User {
    const USER_ID = UserId.generate();
    const userRole = UserRole.from(params.role);
    const userName = UserName.from(params.name);
    const userEmail = UserEmail.from(params.email);
    const hashedPassword = UserHashedPassword.from(params.hashedPassword);
    const USER_STATUS = UserStatus.generateActive();
    const NOW = new Date();

    return new User(
      USER_ID,
      userRole,
      userName,
      userEmail,
      hashedPassword,
      USER_STATUS,
      NOW,
      NOW,
    );
  }

  static from(
    id: UserId,
    role: UserRole,
    name: UserName,
    email: UserEmail,
    hashedPassword: UserHashedPassword,
    status: UserStatus,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
  ): User {
    return new User(
      id,
      role,
      name,
      email,
      hashedPassword,
      status,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  updateProfile(params: { name?: string; email?: string }): void {
    this.validateActive();

    if (!params.name && !params.email) {
      throw new Error('No changes detected');
    }

    if (params.name) {
      this.name = UserName.from(params.name);
    }

    if (params.email) {
      this.email = UserEmail.from(params.email);
    }

    this.touch();
  }

  updatePassword(hashedPassword: UserHashedPassword): void {
    this.validateActive();

    this.hashedPassword = hashedPassword;

    this.touch();
  }

  updateRole(role: UserRole): void {
    this.validateActive();

    if (this.role.toPrimitives() === role.toPrimitives()) {
      throw new Error('User already has this role');
    }

    this.role = role;

    this.touch();
  }

  activate(): void {
    if (this.status.isActive()) {
      throw new Error('User is already active');
    }

    this.status = UserStatus.generateActive();

    this.touch();
  }

  deactivate(): void {
    if (this.status.isInactive()) {
      throw new Error('User is already inactive');
    }

    this.status = UserStatus.generateInactive();

    this.touch();
  }

  private validateActive(): void {
    if (this.status.isInactive()) {
      throw new Error('User is inactive');
    }
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
