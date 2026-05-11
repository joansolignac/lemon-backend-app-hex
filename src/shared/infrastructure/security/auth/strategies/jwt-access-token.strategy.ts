import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from '../../../../domain/value-objects/authenticated-user.value-object';
import { JwtRawPayload } from '../types/jwt-raw-payload.type';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret'),
    });
  }

  validate(payload: JwtRawPayload): AuthenticatedUser {
    return AuthenticatedUser.from({
      id: payload.sub,
      role: payload.role,
      email: payload.email,
    });
  }
}
