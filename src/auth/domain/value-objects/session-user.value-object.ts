export class SessionUser {
  private constructor(
    private readonly id: string,
    private readonly fullName: string,
    private readonly email: string,
    private readonly role: string,
    private readonly isActive: boolean,
  ) {}

  static create(params: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
  }): SessionUser {
    if (!params.id?.trim()) {
      throw new Error('SessionUser.id is required');
    }
    if (!params.fullName?.trim()) {
      throw new Error('SessionUser.fullName is required');
    }
    if (!params.email?.trim()) {
      throw new Error('SessionUser.email is required');
    }
    if (!params.role?.trim()) {
      throw new Error('SessionUser.role is required');
    }

    return new SessionUser(
      params.id,
      params.fullName,
      params.email,
      params.role,
      params.isActive,
    );
  }

  getId(): string {
    return this.id;
  }

  getFullName(): string {
    return this.fullName;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    return this.role;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  toPrimitives(): {
    id: string;
    fullName: string;
    email: string;
    role: string;
    isActive: boolean;
  } {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      isActive: this.isActive,
    };
  }
}
