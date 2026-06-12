import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureUserById } from '../utils/user.util';
import { UserInactiveException } from '../exceptions/user-inactive.exception';
import { UserUpdateNoChangesDetectedException } from '../exceptions/user-update-no-changes-detected.exception';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists.exception';

type UpdateUserProfileInput = {
  name?: string;
  email?: string;
};

@Injectable()
export class UpdateUserProfileFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, input: UpdateUserProfileInput): Promise<void> {
    const user = await ensureUserById(this.prisma, id);

    if (user.status === UserStatus.INACTIVE) throw new UserInactiveException();

    if (!input.name && !input.email) {
      throw new UserUpdateNoChangesDetectedException();
    }

    if (input.email) {
      const existingWithEmail = await this.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existingWithEmail && existingWithEmail.id !== user.id) {
        throw new UserEmailAlreadyExistsException();
      }
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.email && { email: input.email }),
        updatedAt: new Date(),
      },
    });
  }
}
