import { Injectable, Logger } from '@nestjs/common';
import { ValidateCredentialsService } from '../services/validate-credentials.service';
import { UserPayload } from '../../domain/value-objects/user-payload.value-object';
import { TokenService } from '../../domain/services/token.service';
import { AuthenticatedSession } from '../../domain/value-objects/authenticated-session.value-object';
import { SessionUser } from '../../domain/value-objects/session-user.value-object';

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);

  constructor(
    private readonly validateCredentialsService: ValidateCredentialsService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(params: {
    email: string;
    password: string;
  }): Promise<AuthenticatedSession> {
    const user = await this.validateCredentialsService.validate(
      params.email,
      params.password,
    );

    const payload = UserPayload.from({
      id: user.getId(),
      role: user.getRole(),
      email: user.getEmail(),
    });

    this.logger.log(
      `User logged in: ${user.getEmail().toPrimitives()} (ID: ${user.getId().toPrimitives()}, Role: ${user.getRole().toPrimitives()})`,
    );

    const { accessToken, refreshToken } = await this.tokenService.generateTokens(payload);

    const sessionUser = SessionUser.create({
      id: user.getId().toPrimitives(),
      fullName: user.getName().toPrimitives(),
      email: user.getEmail().toPrimitives(),
      role: user.getRole().toPrimitives(),
      isActive: user.getStatus().isActive(),
    });

    return AuthenticatedSession.create({
      accessToken,
      refreshToken,
      user: sessionUser,
    });
  }
}
