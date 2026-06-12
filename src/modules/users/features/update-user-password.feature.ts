import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureUserById } from '../utils/user.util';
import { UserInactiveException } from '../exceptions/user-inactive.exception';

@Injectable()
export class UpdateUserPasswordFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, password: string): Promise<void> {
    const user = await ensureUserById(this.prisma, id);

    if (user.status === UserStatus.INACTIVE) throw new UserInactiveException();

    const hashedPassword = await argon2.hash(password);

    await this.prisma.user.update({
      where: { id },
      data: { hashedPassword, updatedAt: new Date() },
    });
  }
}
