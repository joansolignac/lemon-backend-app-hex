import { Injectable } from '@nestjs/common';
import { SaleRepository } from '../../../domain/repositories/sale.repository';
import { PrismaService } from '../../../../shared/infrastructure/persistence/prisma/services/prisma.service';
import { PaginatedParams } from 'src/shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from 'src/shared/domain/value-objects/paginated-result.value-object';
import { Sale } from 'src/sales/domain/entities/sale.entity';
import { SaleId } from 'src/sales/domain/value-objects/sale-id.value-object';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.value-object';
import { UserId } from 'src/users/domain/value-objects/user-id.value-object';
import {
  toSaleDomain,
  toSalesDomainList,
} from './mapper/sale-domain.mapper';

@Injectable()
export class PrismaSaleRepository extends SaleRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(sale: Sale): Promise<void> {
    const SALE_ID = sale.getId().toPrimitives();
    const SALE_DATA = {
      id: SALE_ID,
      customerId: sale.getCustomerId().toPrimitives(),
      sellerId: sale.getSellerId().toPrimitives(),
      kilograms: sale.getKilograms().toPrimitives(),
      pricePerKilogram: sale.getPricePerKilogram().toPrimitives(),
      totalAmount: sale.getTotalAmount().toPrimitives(),
      paymentStatus: sale.getPaymentStatus().toPrimitives(),
      createdAt: sale.getCreatedAt(),
      updatedAt: sale.getUpdatedAt(),
    };
    await this.prisma.sale.upsert({
      where: { id: SALE_ID },
      update: SALE_DATA,
      create: SALE_DATA,
    });
  }

  async findById(id: SaleId): Promise<Sale | undefined> {
    const SALE_ID = id.toPrimitives();

    const sale = await this.prisma.sale.findUnique({
      where: { id: SALE_ID },
    });

    return sale ? toSaleDomain(sale) : undefined;
  }

  async getAllByCustomerIdPaginated(
    customerId: CustomerId,
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>> {
    const CUSTOMER_ID = customerId.toPrimitives();

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        where: { customerId: CUSTOMER_ID },
        skip: params.getSkip(),
        take: params.getTake(),
      }),
      this.prisma.sale.count({
        where: { customerId: CUSTOMER_ID },
      }),
    ]);

    const sales = toSalesDomainList(data);

    return PaginatedResult.generate<Sale>(params, sales, total);
  }

  async getAllBySellerIdPaginated(
    sellerId: UserId,
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>> {
    const SELLER_ID = sellerId.toPrimitives();

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        where: { sellerId: SELLER_ID },
        skip: params.getSkip(),
        take: params.getTake(),
      }),
      this.prisma.sale.count({
        where: { sellerId: SELLER_ID },
      }),
    ]);

    const sales = toSalesDomainList(data);

    return PaginatedResult.generate<Sale>(params, sales, total);
  }

  async getAllPendingPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        where: { paymentStatus: 'PENDIENTE' },
        skip: params.getSkip(),
        take: params.getTake(),
      }),
      this.prisma.sale.count({
        where: { paymentStatus: 'PENDIENTE' },
      }),
    ]);

    const sales = toSalesDomainList(data);

    return PaginatedResult.generate<Sale>(params, sales, total);
  }

  async getAllPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        skip: params.getSkip(),
        take: params.getTake(),
      }),
      this.prisma.sale.count(),
    ]);

    const sales = toSalesDomainList(data);

    return PaginatedResult.generate<Sale>(params, sales, total);
  }
}
