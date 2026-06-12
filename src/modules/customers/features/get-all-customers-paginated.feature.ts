import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolvePagination } from '../../../common/utils/pagination.util';
import { CustomerResponseDto } from '../dtos/response/customer.response.dto';

@Injectable()
export class GetAllCustomersPaginatedFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(page: number, limit: number) {
    const { skip, take, page: p, limit: l } = resolvePagination(page, limit);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({ skip, take }),
      this.prisma.customer.count(),
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

    return { data: customers, meta: { page: p, limit: l, total } };
  }
}
