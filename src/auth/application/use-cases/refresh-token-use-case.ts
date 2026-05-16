import { Injectable, Logger } from '@nestjs/common';
import { TokenService } from '../../domain/services/token.service';
import { UserPayload } from '../../domain/value-objects/user-payload.value-object';
import { AuthenticatedUser } from '../../../shared/domain/value-objects/authenticated-user.value-object';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { UserRole } from '../../../users/domain/value-objects/user-rol.value-object';
import { UserEmail } from '../../../users/domain/value-objects/user-email.value-object';
import { UserFinderService } from '../../../users/application/services/user-finder.service';
import { AuthenticatedSession } from '../../domain/value-objects/authenticated-session.value-object';
import { SessionUser } from '../../domain/value-objects/session-user.value-object';

@Injectable()
export class RefreshTokenUseCase {
  private readonly logger = new Logger(RefreshTokenUseCase.name);

  constructor(
    private readonly tokenService: TokenService,
    private readonly userFinderService: UserFinderService,
  ) {}

  async execute(authUser: AuthenticatedUser): Promise<AuthenticatedSession> {
    const user = await this.userFinderService.findByIdOrFail(authUser.getId());

    const payload = UserPayload.from({
      id: UserId.from(authUser.getId()),
      role: UserRole.from(authUser.getRole()),
      email: UserEmail.from(authUser.getEmail()),
    });

    this.logger.log(
      `Token refreshed for user: ${authUser.getEmail()} (ID: ${authUser.getId()}, Role: ${authUser.getRole()})`,
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
