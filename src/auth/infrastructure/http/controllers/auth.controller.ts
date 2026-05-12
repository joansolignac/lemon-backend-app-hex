import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { LoginUseCase } from '../../../application/use-cases/login.use.case';
import { LoginDto } from '../dtos/request/login.dto';
import { JwtTokensDto } from '../dtos/response/jwt-tokens.dto';
import { toJwtResponse } from '../../mappers/jwt-tokens-response.mapper';
import { JwtRefreshTokenGuard } from '../../../../shared/infrastructure/security/auth/guards/jwt-refresh-token.guard';
import { CurrentUser } from '../../../../shared/infrastructure/security/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../../shared/domain/value-objects/authenticated-user.value-object';
import { RefreshTokenUseCase } from '../../../application/use-cases/refresh-token-use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Sesion iniciada exitosamente',
    type: JwtTokensDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  async login(@Body() dto: LoginDto): Promise<JwtTokensDto> {
    const jwtTokens = await this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return toJwtResponse(jwtTokens);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refrescar tokens JWT' })
  @ApiResponse({
    status: 200,
    description: 'Tokens refrescados exitosamente',
    type: JwtTokensDto,
  })
  @ApiResponse({ status: 401, description: 'Token de refresh invalido' })
  async refresh(@CurrentUser() user: AuthenticatedUser): Promise<JwtTokensDto> {
    const jwtTokens = await this.refreshTokenUseCase.execute(user);
    return toJwtResponse(jwtTokens);
  }
}
