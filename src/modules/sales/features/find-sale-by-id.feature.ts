import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureSaleById } from '../utils/sale.util';
import { SaleResponseDto } from '../dtos/response/sale.response.dto';

@Injectable()
export class FindSaleByIdFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<SaleResponseDto> {
    const sale = await ensureSaleById(this.prisma, id);
    return {
      id: sale.id,
      customerId: sale.customerId,
      sellerId: sale.sellerId,
      kilograms: sale.kilograms.toNumber(),
      pricePerKilogram: sale.pricePerKilogram.toNumber(),
      totalAmount: sale.totalAmount.toNumber(),
      paymentStatus: sale.paymentStatus,
      createdAt: sale.createdAt.toISOString(),
      updatedAt: sale.updatedAt.toISOString(),
    };
  }
}
