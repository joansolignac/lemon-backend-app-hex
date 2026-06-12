import { Injectable, OnModuleInit } from '@nestjs/common';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const email = 'admin@lemon.com';
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) return;

    const rawPassword = '1234567890';
    const hashedPassword = await argon2.hash(rawPassword);

    await this.prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'Administrador',
        email,
        hashedPassword,
        role: Role.ADMINISTRADOR,
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
