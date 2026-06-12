import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { UserInactiveException } from '../exceptions/user-inactive.exception';
import type { LoginResult } from '../types/login-result.type';

@Injectable()
export class LoginFeature {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(email: string, password: string): Promise<LoginResult> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new InvalidCredentialsException();

    if (user.status !== UserStatus.ACTIVE) throw new UserInactiveException();

    const isValid = await argon2.verify(user.hashedPassword, password);
    if (!isValid) throw new InvalidCredentialsException();

    const payload = { sub: user.id, role: user.role, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('jwt.accessSecret'),
        expiresIn: this.configService.getOrThrow('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('jwt.refreshSecret'),
        expiresIn: this.configService.getOrThrow('jwt.refreshExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        fullName: user.name,
        email: user.email,
        role: user.role,
        isActive: user.status === UserStatus.ACTIVE,
      },
    };
  }
}
