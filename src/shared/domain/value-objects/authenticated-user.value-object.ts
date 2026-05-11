export class AuthenticatedUser {
  private constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly role: string,
  ) {}

  static from(params: {
    id: string;
    email: string;
    role: string;
  }): AuthenticatedUser {
    return new AuthenticatedUser(params.id, params.email, params.role);
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    return this.role;
  }

  toPrimitives(): { id: string; email: string; role: string } {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
    };
  }
}
