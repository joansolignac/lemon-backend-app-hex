import { Injectable } from '@nestjs/common';
import { JwtTokens } from '../../domain/value-objects/jwt-tokens.value-object';
import { ValidateCredentialsService } from '../services/validate-credentials.service';
import { UserPayload } from '../../domain/value-objects/user-payload.value-object';
import { TokenService } from '../../domain/services/token.service';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly validateCredentialsService: ValidateCredentialsService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(params: {
    email: string;
    password: string;
  }): Promise<JwtTokens> {
    const user = await this.validateCredentialsService.validate(
      params.email,
      params.password,
    );

    const payload = UserPayload.from({
      id: user.getId(),
      role: user.getRole(),
      email: user.getEmail(),
    });

    return await this.tokenService.generateTokens(payload);
  }
}
