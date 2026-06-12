import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolvePagination } from '../../../common/utils/pagination.util';
import { SaleResponseDto } from '../dtos/response/sale.response.dto';

@Injectable()
export class FindSalesByCustomerFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(customerId: string, page: number, limit: number) {
    const { skip, take, page: p, limit: l } = resolvePagination(page, limit);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        where: { customerId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.sale.count({ where: { customerId } }),
    ]);

    const sales: SaleResponseDto[] = data.map((s) => ({
      id: s.id,
      customerId: s.customerId,
      sellerId: s.sellerId,
      kilograms: s.kilograms.toNumber(),
      pricePerKilogram: s.pricePerKilogram.toNumber(),
      totalAmount: s.totalAmount.toNumber(),
      paymentStatus: s.paymentStatus,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));

    return { data: sales, meta: { page: p, limit: l, total } };
  }
}
