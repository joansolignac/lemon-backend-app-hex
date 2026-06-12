import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { resolveDateRange } from '../../../common/utils/resolve-date-range.util';
import type { MetricsQueryDto } from '../dtos/request/metrics-query.dto';
import type { MetricsSummaryResponseDto } from '../dtos/response/metrics-summary.response.dto';

@Injectable()
export class GetSupervisorMetricsSummaryFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    sellerId: string,
    query: MetricsQueryDto,
  ): Promise<MetricsSummaryResponseDto> {
    const createdAt = resolveDateRange(query);
    const where = { sellerId, ...(createdAt ? { createdAt } : {}) };
    const top = query.top ?? 5;

    const [agg, groups] = await Promise.all([
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
        take: top,
      }),
    ]);

    const customers = await this.prisma.customer.findMany({
      where: { id: { in: groups.map((g) => g.customerId) } },
      select: { id: true, name: true, numDocument: true },
    });

    const customerMap = new Map(customers.map((c) => [c.id, c]));

    return {
      totalSales: agg._count.id,
      totalKilograms: agg._sum.kilograms?.toNumber() ?? 0,
      totalAmount: agg._sum.totalAmount?.toNumber() ?? 0,
      topCustomers: groups.map((g) => ({
        customerName: customerMap.get(g.customerId)?.name ?? '',
        numDocument: customerMap.get(g.customerId)?.numDocument ?? '',
        totalSales: g._count.id,
        totalKilograms: g._sum.kilograms?.toNumber() ?? 0,
        totalAmount: g._sum.totalAmount?.toNumber() ?? 0,
      })),
    };
  }
}
