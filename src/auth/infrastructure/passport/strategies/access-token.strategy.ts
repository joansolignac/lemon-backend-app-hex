import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../../../domain/value-objects/user-payload.value-object';
import { AuthUser } from '../../../domain/value-objects/auth-user.value-object';
import { FindUserByIdUseCase } from '../../../../users/application/use-cases/find-user-by-id.use.case';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-acess') {
  constructor(
    private readonly configService: ConfigService,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret'),
    });
  }

  validate(payload: UserPayload): AuthUser {
    return AuthUser.from({
      sub: payload.getSub(),
      role: payload.getRole(),
      email: payload.getEmail(),
    });
  }
}
