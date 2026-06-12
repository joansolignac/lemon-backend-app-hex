import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolvePagination } from '../../../common/utils/pagination.util';
import { CustomerResponseDto } from '../dtos/response/customer.response.dto';
import type { GetAllCustomersPaginatedInput } from '../types/get-all-customers-paginated-input.type';

@Injectable()
export class GetAllCustomersPaginatedFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: GetAllCustomersPaginatedInput) {
    const { skip, take, page, limit } = resolvePagination(
      input.page,
      input.limit,
    );

    const where: Prisma.CustomerWhereInput = {};

    if (input.status) {
      where.status = input.status;
    }

    if (input.search) {
      where.OR = [
        { name: { contains: input.search, mode: 'insensitive' } },
        { numDocument: { contains: input.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count({ where }),
    ]);

    const customers: CustomerResponseDto[] = data.map((c) => ({
      id: c.id,
      name: c.name,
      typeDocument: c.typeDocument,
      numDocument: c.numDocument,
      phone: c.phone,
      email: c.email,
      address: c.address,
      status: c.status,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));

    return { data: customers, meta: { page, limit, total } };
  }
}
