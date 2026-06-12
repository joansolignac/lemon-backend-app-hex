import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureSaleById } from '../utils/sale.util';
import { InvalidSaleOperationException } from '../exceptions/invalid-sale-operation.exception';

@Injectable()
export class MarkSaleAsPaidFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const sale = await ensureSaleById(this.prisma, id);

    if (sale.paymentStatus === PaymentStatus.PAGADO) {
      throw new InvalidSaleOperationException('Sale is already paid');
    }

    await this.prisma.sale.update({
      where: { id },
      data: { paymentStatus: PaymentStatus.PAGADO, updatedAt: new Date() },
    });
  }
}
