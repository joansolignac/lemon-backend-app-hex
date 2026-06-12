import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureUserById } from '../utils/user.util';
import { UserAlreadyInactiveException } from '../exceptions/user-already-inactive.exception';

@Injectable()
export class DeactivateUserFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const user = await ensureUserById(this.prisma, id);

    if (user.status === UserStatus.INACTIVE)
      throw new UserAlreadyInactiveException();

    await this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.INACTIVE, updatedAt: new Date() },
    });
  }
}
