import { SessionUser } from './session-user.value-object';

export class AuthenticatedSession {
  private constructor(
    private readonly accessToken: string,
    private readonly refreshToken: string,
    private readonly user: SessionUser,
  ) {}

  static create(params: {
    accessToken: string;
    refreshToken: string;
    user: SessionUser;
  }): AuthenticatedSession {
    if (!params.accessToken?.trim()) {
      throw new Error('AuthenticatedSession.accessToken is required');
    }
    if (!params.refreshToken?.trim()) {
      throw new Error('AuthenticatedSession.refreshToken is required');
    }
    if (!params.user) {
      throw new Error('AuthenticatedSession.user is required');
    }

    return new AuthenticatedSession(
      params.accessToken,
      params.refreshToken,
      params.user,
    );
  }

  toPrimitives(): {
    accessToken: string;
    refreshToken: string;
    user: ReturnType<SessionUser['toPrimitives']>;
  } {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      user: this.user.toPrimitives(),
    };
  }
}
