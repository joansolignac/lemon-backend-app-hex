export class JwtTokens {
  private constructor(
    private readonly accessToken: string,
    private readonly refreshToken: string,
  ) {}

  static from(params: {
    accessToken: string;
    refreshToken: string;
  }): JwtTokens {
    return new JwtTokens(params.accessToken, params.refreshToken);
  }

  private getAccessToken(): string {
    return this.accessToken;
  }

  private getRefreshToken(): string {
    return this.refreshToken;
  }

  toPrimitives(): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }
}
