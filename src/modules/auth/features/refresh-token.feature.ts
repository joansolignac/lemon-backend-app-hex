import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureUserById } from '../../../modules/users/utils/user.util';
import type { AuthCurrentUser } from '../../../common/interfaces/auth-current-user.interface';
import type { RefreshResult } from '../types/refresh-result.type';

@Injectable()
export class RefreshTokenFeature {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(currentUser: AuthCurrentUser): Promise<RefreshResult> {
    const user = await ensureUserById(this.prisma, currentUser.id);

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
