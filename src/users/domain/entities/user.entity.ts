import { UserId } from '../value-objects/user-id.value-object.js';
import { UserName } from '../value-objects/user-name.value-object.js';
import { UserEmail } from '../value-objects/user-email.value-object.js';
import { UserHashedPassword } from '../value-objects/user-hashed-password.value-object.js';
import { UserStatus } from '../value-objects/user-status.value-object.js';
import { UserRole } from '../value-objects/user-rol.value-object.js';
import { UserUpdateNoChangesDetectedException } from '../exceptions/user-update-no-changes-detected.exception.js';
import { UserRolAlreadyHasException } from '../exceptions/user-rol-already-has.exception.js';
import { UserAlreadyInactiveException } from '../exceptions/user-already-inactive.exception.js';
import { UserAlreadyActiveException } from '../exceptions/user-already-active.exception.js';
import { UserInactiveException } from '../exceptions/user-inactive.exception.js';

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
  ) {}

  static create(params: {
    role: string;
    name: string;
    email: string;
    hashedPassword: string;
  }): User {
    const USER_ID = UserId.generate();
    const USER_ROLE = UserRole.from(params.role);

    const USER_NAME = UserName.from(params.name);

    const USER_EMAIL = UserEmail.from(params.email);

    const USER_PASSWORD = UserHashedPassword.from(params.hashedPassword);

    const USER_STATUS = UserStatus.generateActive();

    const NOW = new Date();

    return new User(
      USER_ID,
      USER_ROLE,
      USER_NAME,
      USER_EMAIL,
      USER_PASSWORD,
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
    );
  }

  getId(): string {
    return this.id.toPrimitives();
  }

  getRole(): string {
    return this.role.toPrimitives();
  }

  getName(): string {
    return this.name.toPrimitives();
  }

  getEmail(): string {
    return this.email.toPrimitives();
  }

  getHashedPassword(): string {
    return this.hashedPassword.toPrimitives();
  }

  getStatus(): string {
    return this.status.toPrimitives();
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateProfile(params: { name?: UserName; email?: UserEmail }): void {
    this.validateActive();

    if (!params.name && !params.email) {
      throw new UserUpdateNoChangesDetectedException();
    }

    if (params.name) {
      this.name = params.name;
    }

    if (params.email) {
      this.email = params.email;
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
      throw new UserRolAlreadyHasException();
    }

    this.role = role;

    this.touch();
  }

  activate(): void {
    if (this.status.isActive()) {
      throw new UserAlreadyActiveException();
    }

    this.status = UserStatus.generateActive();

    this.touch();
  }

  deactivate(): void {
    if (this.status.isInactive()) {
      throw new UserAlreadyInactiveException();
    }

    this.status = UserStatus.generateInactive();

    this.touch();
  }

  private validateActive(): void {
    if (this.status.isInactive()) {
      throw new UserInactiveException();
    }
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
