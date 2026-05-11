import { Module } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use.case';
import { UsersModule } from '../users/users.module';
import { ValidateCredentialsService } from './application/services/validate-credentials.service';
import { HashModule } from '../shared/infrastructure/security/hash/hash.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/passport/strategies/access-token.strategy';
import { TokenService } from './domain/services/token.service';
import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { NestJwtService } from './infrastructure/jwt/nestjs-jwt.service';

@Module({
  providers: [
    LoginUseCase,
    ValidateCredentialsService,
    JwtStrategy,
    {
      provide: TokenService,
      useClass: NestJwtService,
    },
  ],
  imports: [
    UsersModule,
    HashModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: configService.getOrThrow('jwt.accessExpiresIn'),
        },
      }),
    }),
  ],
  exports: [JwtModule, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
