import { Injectable } from '@nestjs/common';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureUserById } from '../utils/user.util';
import { UserInactiveException } from '../exceptions/user-inactive.exception';
import { UserRoleAlreadyHasException } from '../exceptions/user-role-already-has.exception';

@Injectable()
export class UpdateUserRoleFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, role: Role): Promise<void> {
    const user = await ensureUserById(this.prisma, id);

    if (user.status === UserStatus.INACTIVE) throw new UserInactiveException();

    if (user.role === role) throw new UserRoleAlreadyHasException();

    await this.prisma.user.update({
      where: { id },
      data: { role, updatedAt: new Date() },
    });
  }
}
