import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureUserById } from '../utils/user.util';
import { UserAlreadyActiveException } from '../exceptions/user-already-active.exception';

@Injectable()
export class ActivateUserFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const user = await ensureUserById(this.prisma, id);

    if (user.status === UserStatus.ACTIVE)
      throw new UserAlreadyActiveException();

    await this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.ACTIVE, updatedAt: new Date() },
    });
  }
}
