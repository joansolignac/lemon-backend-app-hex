import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '../../../application/use-cases/login.use.case';
import { LoginDto } from '../dtos/request/login.dto';
import { JwtTokensDto } from '../dtos/response/jwt-tokens.dto';
import { toJwtResponse } from '../../mappers/jwt-tokens-response.mapper';
import { JwtRefreshTokenGuard } from '../../../../shared/infrastructure/security/auth/guards/jwt-refresh-token.guard';
import { CurrentUser } from '../../../../shared/infrastructure/security/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../../shared/domain/value-objects/authenticated-user.value-object';
import { RefreshTokenUseCase } from '../../../application/use-cases/refresh-token-use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<JwtTokensDto> {
    const jwtTokens = await this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return toJwtResponse(jwtTokens);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  async refresh(@CurrentUser() user: AuthenticatedUser): Promise<JwtTokensDto> {
    const jwtTokens = await this.refreshTokenUseCase.execute(user);
    return toJwtResponse(jwtTokens);
  }
}
