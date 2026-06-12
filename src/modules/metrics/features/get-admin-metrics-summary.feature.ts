import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolveDateRange } from '../../../common/utils/resolve-date-range.util';
import type { AdminMetricsQueryDto } from '../dtos/request/admin-metrics-query.dto';
import type { AdminMetricsSummaryResponseDto } from '../dtos/response/admin-metrics-summary.response.dto';

@Injectable()
export class GetAdminMetricsSummaryFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: AdminMetricsQueryDto,
  ): Promise<AdminMetricsSummaryResponseDto> {
    const createdAt = resolveDateRange(query);
    const where = createdAt ? { createdAt } : {};
    const topCustomers = query.top ?? 5;
    const topSellers = query.topSellers ?? 5;

    const [agg, customerGroups, sellerGroups] = await Promise.all([
      this.prisma.sale.aggregate({
        where,
        _count: { id: true },
        _sum: { totalAmount: true, kilograms: true },
      }),
      this.prisma.sale.groupBy({
        by: ['customerId'],
        where,
        _count: { id: true },
        _sum: { kilograms: true, totalAmount: true },
        orderBy: { _sum: { totalAmount: 'desc' } },
        take: topCustomers,
      }),
      this.prisma.sale.groupBy({
        by: ['sellerId'],
        where,
        _count: { id: true },
        _sum: { kilograms: true, totalAmount: true },
        orderBy: { _sum: { totalAmount: 'desc' } },
        take: topSellers,
      }),
    ]);

    const [customers, sellers] = await Promise.all([
      this.prisma.customer.findMany({
        where: { id: { in: customerGroups.map((g) => g.customerId) } },
        select: { id: true, name: true, numDocument: true },
      }),
      this.prisma.user.findMany({
        where: { id: { in: sellerGroups.map((g) => g.sellerId) } },
        select: { id: true, name: true },
      }),
    ]);

    const customerMap = new Map(customers.map((c) => [c.id, c]));
    const sellerMap = new Map(sellers.map((s) => [s.id, s]));

    return {
      totalSales: agg._count.id,
      totalKilograms: agg._sum.kilograms?.toNumber() ?? 0,
      totalAmount: agg._sum.totalAmount?.toNumber() ?? 0,
      topCustomers: customerGroups.map((g) => ({
        customerName: customerMap.get(g.customerId)?.name ?? '',
        numDocument: customerMap.get(g.customerId)?.numDocument ?? '',
        totalSales: g._count.id,
        totalKilograms: g._sum.kilograms?.toNumber() ?? 0,
        totalAmount: g._sum.totalAmount?.toNumber() ?? 0,
      })),
      topSellers: sellerGroups.map((g) => ({
        sellerName: sellerMap.get(g.sellerId)?.name ?? '',
        totalSales: g._count.id,
        totalKilograms: g._sum.kilograms?.toNumber() ?? 0,
        totalAmount: g._sum.totalAmount?.toNumber() ?? 0,
      })),
    };
  }
}
