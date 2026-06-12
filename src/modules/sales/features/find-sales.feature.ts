import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolvePagination } from '../../../common/utils/pagination.util';
import { resolveDateRange } from '../../../common/utils/resolve-date-range.util';
import { SaleResponseDto } from '../dtos/response/sale.response.dto';
import type { SalePaginatedResponseDto } from '../dtos/response/sale-paginated.response.dto';
import type { FindSalesInput } from '../types/find-sales-input.type';

@Injectable()
export class FindSalesFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: FindSalesInput): Promise<SalePaginatedResponseDto> {
    const { skip, take, page, limit } = resolvePagination(
      input.page,
      input.limit,
    );

    const where: Prisma.SaleWhereInput = {};

    if (input.status) where.paymentStatus = input.status;

    if (input.search) {
      where.OR = [
        { id: input.search },
        { customer: { name: { contains: input.search, mode: 'insensitive' } } },
        { seller: { name: { contains: input.search, mode: 'insensitive' } } },
      ];
    }

    const createdAt = resolveDateRange(input);
    if (createdAt) where.createdAt = createdAt;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { customer: true, seller: true },
      }),
      this.prisma.sale.count({ where }),
    ]);

    const sales: SaleResponseDto[] = data.map((s) => ({
      id: s.id,
      customerName: s.customer.name,
      sellerName: s.seller.name,
      kilograms: s.kilograms.toNumber(),
      pricePerKilogram: s.pricePerKilogram.toNumber(),
      totalAmount: s.totalAmount.toNumber(),
      paymentStatus: s.paymentStatus,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));

    return { data: sales, meta: { page, limit, total } };
  }
}
