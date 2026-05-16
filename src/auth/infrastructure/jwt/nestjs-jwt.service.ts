import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../domain/value-objects/user-payload.value-object';
import { TokenService } from '../../domain/services/token.service';

@Injectable()
export class NestjsJwtService extends TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async generateTokens(payload: UserPayload): Promise<{ accessToken: string; refreshToken: string }> {
    const primitivePayload = payload.toPrimitives();

    const accessToken = await this.jwtService.signAsync(primitivePayload, {
      secret: this.configService.getOrThrow('jwt.accessSecret'),
      expiresIn: this.configService.getOrThrow('jwt.accessExpiresIn'),
    });

    const refreshToken = await this.jwtService.signAsync(primitivePayload, {
      secret: this.configService.getOrThrow('jwt.refreshSecret'),
      expiresIn: this.configService.getOrThrow('jwt.refreshExpiresIn'),
    });

    return { accessToken, refreshToken };
  }
}
