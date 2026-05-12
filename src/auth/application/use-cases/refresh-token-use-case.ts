import { Injectable, Logger } from '@nestjs/common';
import { TokenService } from '../../domain/services/token.service';
import { JwtTokens } from '../../domain/value-objects/jwt-tokens.value-object';
import { UserPayload } from '../../domain/value-objects/user-payload.value-object';
import { AuthenticatedUser } from '../../../shared/domain/value-objects/authenticated-user.value-object';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { UserRole } from '../../../users/domain/value-objects/user-rol.value-object';
import { UserEmail } from '../../../users/domain/value-objects/user-email.value-object';

@Injectable()
export class RefreshTokenUseCase {
  private readonly logger = new Logger(RefreshTokenUseCase.name);

  constructor(private readonly tokenService: TokenService) {}

  async execute(authUser: AuthenticatedUser): Promise<JwtTokens> {
    const payload = UserPayload.from({
      id: UserId.from(authUser.getId()),
      role: UserRole.from(authUser.getRole()),
      email: UserEmail.from(authUser.getEmail()),
    });

    this.logger.log(
      `Token refreshed for user: ${authUser.getEmail()} (ID: ${authUser.getId()}, Role: ${authUser.getRole()})`,
    );

    return this.tokenService.generateTokens(payload);
  }
}
