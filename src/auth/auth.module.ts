import { Module } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use.case';
import { UsersModule } from '../users/users.module';
import { ValidateCredentialsService } from './application/services/validate-credentials.service';
import { HashModule } from '../shared/infrastructure/security/hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './domain/services/token.service';
import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { NestjsJwtService } from './infrastructure/jwt/nestjs-jwt.service';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token-use-case';
import { AuthSharedModule } from '../shared/infrastructure/security/auth/auth-shared.module';

@Module({
  imports: [
    UsersModule,
    HashModule,
    AuthSharedModule,
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
  providers: [
    LoginUseCase,
    RefreshTokenUseCase,
    ValidateCredentialsService,
    {
      provide: TokenService,
      useClass: NestjsJwtService,
    },
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
