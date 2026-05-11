import { Module } from '@nestjs/common';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenGuard } from './guards/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
    RolesGuard,
  ],
  exports: [
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
    RolesGuard,
  ],
})
export class AuthSharedModule {}
