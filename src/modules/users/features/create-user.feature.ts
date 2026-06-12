import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as argon2 from 'argon2';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserEmailAlreadyExistsException } from '../exceptions/user-email-already-exists.exception';

type CreateUserInput = {
  role: Role;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class CreateUserFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: CreateUserInput): Promise<void> {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existing) throw new UserEmailAlreadyExistsException();

    const hashedPassword = await argon2.hash(input.password);
    const now = new Date();

    await this.prisma.user.create({
      data: {
        id: randomUUID(),
        role: input.role,
        name: input.name,
        email: input.email,
        hashedPassword,
        status: UserStatus.ACTIVE,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
}
