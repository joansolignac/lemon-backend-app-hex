import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../../application/use-cases/login.use.case';
import { LoginDto } from '../dtos/request/login.dto';
import { JwtTokensDto } from '../dtos/response/jwt-tokens.dto';
import { toJwtResponse } from '../../mappers/jwt-tokens-response.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<JwtTokensDto> {
    const jwtTokens = await this.loginUseCase.execute(dto);
    return toJwtResponse(jwtTokens);
  }
}
