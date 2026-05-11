import { TokenService } from '../../domain/services/token.service';
import { JwtTokens } from '../../domain/value-objects/jwt-tokens.value-object';
import { UserPayload } from '../../domain/value-objects/user-payload.value-object';
import { AuthenticatedUser } from '../../../shared/domain/value-objects/authenticated-user.value-object';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { UserRole } from '../../../users/domain/value-objects/user-rol.value-object';
import { UserEmail } from '../../../users/domain/value-objects/user-email.value-object';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute(authUser: AuthenticatedUser): Promise<JwtTokens> {
    const payload = UserPayload.from({
      id: UserId.from(authUser.getId()),
      role: UserRole.from(authUser.getRole()),
      email: UserEmail.from(authUser.getEmail()),
    });

    return this.tokenService.generateTokens(payload);
  }
}
