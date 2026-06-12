import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolvePagination } from '../../../common/utils/pagination.util';
import { UserResponseDto } from '../dtos/response/user.response.dto';
import type { GetAllUsersPaginatedInput } from '../types/get-all-users-paginated-input.type';

@Injectable()
export class GetAllUsersPaginatedFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: GetAllUsersPaginatedInput) {
    const { skip, take, page, limit } = resolvePagination(
      input.page,
      input.limit,
    );

    const where: Prisma.UserWhereInput = {};

    if (input.status) {
      where.status = input.status;
    }

    if (input.search) {
      where.OR = [
        { name: { contains: input.search, mode: 'insensitive' } },
        { email: { contains: input.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
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

    return { data: users, meta: { page, limit, total } };
  }
}
