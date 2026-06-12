import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthCurrentUser } from '../../common/interfaces/auth-current-user.interface';
import { LoginRequestDto } from './dtos/request/login.request.dto';
import { AuthenticatedSessionResponseDto } from './dtos/response/authenticated-session.response.dto';
import { LoginFeature } from './features/login.feature';
import { RefreshTokenFeature } from './features/refresh-token.feature';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginFeature: LoginFeature,
    private readonly refreshTokenFeature: RefreshTokenFeature,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesion' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ status: 200, type: AuthenticatedSessionResponseDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  async login(
    @Body() dto: LoginRequestDto,
  ): Promise<AuthenticatedSessionResponseDto> {
    return this.loginFeature.execute(dto.email, dto.password);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refrescar tokens JWT' })
  @ApiResponse({ status: 200, type: AuthenticatedSessionResponseDto })
  @ApiResponse({ status: 401, description: 'Token de refresh invalido' })
  async refresh(
    @CurrentUser() currentUser: AuthCurrentUser,
  ): Promise<AuthenticatedSessionResponseDto> {
    return this.refreshTokenFeature.execute(currentUser);
  }
}
