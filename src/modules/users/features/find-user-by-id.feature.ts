import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserResponseDto } from '../dtos/response/user.response.dto';
import { ensureUserById } from '../utils/user.util';

@Injectable()
export class FindUserByIdFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await ensureUserById(this.prisma, id);
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
