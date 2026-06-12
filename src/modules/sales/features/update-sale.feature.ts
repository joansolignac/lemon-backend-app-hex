import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureSaleById } from '../utils/sale.util';
import { SaleUpdateNoChangesDetectedException } from '../exceptions/sale-update-no-changes-detected.exception';

type UpdateSaleInput = {
  kilograms?: number;
  pricePerKilogram?: number;
  paymentStatus?: PaymentStatus;
};

@Injectable()
export class UpdateSaleFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, input: UpdateSaleInput): Promise<void> {
    const sale = await ensureSaleById(this.prisma, id);

    if (!input.kilograms && !input.pricePerKilogram && !input.paymentStatus) {
      throw new SaleUpdateNoChangesDetectedException();
    }

    const newKilograms = input.kilograms ?? sale.kilograms.toNumber();
    const newPrice = input.pricePerKilogram ?? sale.pricePerKilogram.toNumber();
    const shouldRecalculate =
      input.kilograms !== undefined || input.pricePerKilogram !== undefined;
    const newTotal = shouldRecalculate
      ? parseFloat((newKilograms * newPrice).toFixed(2))
      : undefined;

    await this.prisma.sale.update({
      where: { id },
      data: {
        ...(input.kilograms !== undefined && { kilograms: input.kilograms }),
        ...(input.pricePerKilogram !== undefined && {
          pricePerKilogram: input.pricePerKilogram,
        }),
        ...(input.paymentStatus !== undefined && {
          paymentStatus: input.paymentStatus,
        }),
        ...(newTotal !== undefined && { totalAmount: newTotal }),
        updatedAt: new Date(),
      },
    });
  }
}
