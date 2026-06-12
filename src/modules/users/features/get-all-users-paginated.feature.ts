import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolvePagination } from '../../../common/utils/pagination.util';
import { UserResponseDto } from '../dtos/response/user.response.dto';

@Injectable()
export class GetAllUsersPaginatedFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(page: number, limit: number) {
    const { skip, take, page: p, limit: l } = resolvePagination(page, limit);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ skip, take }),
      this.prisma.user.count(),
    ]);

    const users: UserResponseDto[] = data.map((user) => ({
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return { data: users, meta: { page: p, limit: l, total } };
  }
}
