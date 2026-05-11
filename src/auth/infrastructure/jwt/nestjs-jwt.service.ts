import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';

import { UserPayload } from '../../domain/value-objects/user-payload.value-object';

import { JwtTokens } from '../../domain/value-objects/jwt-tokens.value-object';

import { TokenService } from '../../domain/services/token.service';

@Injectable()
export class NestJwtService extends TokenService {
  constructor(
    private readonly configService: ConfigService,

    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async generateTokens(payload: UserPayload): Promise<JwtTokens> {
    const primitivePayload = payload.toPrimitives();

    const accessToken = await this.jwtService.signAsync(primitivePayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),

      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = await this.jwtService.signAsync(primitivePayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),

      expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    });

    return JwtTokens.from({
      accessToken,
      refreshToken,
    });
  }
}
