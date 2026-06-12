import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentStatus, UserStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureCustomerById } from '../../customers/utils/customer.util';
import { ensureUserById } from '../../users/utils/user.util';
import { InvalidSaleOperationException } from '../exceptions/invalid-sale-operation.exception';
import type { CreateSaleInput } from '../types/create-sale-input.type';

@Injectable()
export class CreateSaleFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: CreateSaleInput): Promise<void> {
    await ensureCustomerById(this.prisma, input.customerId);

    const seller = await ensureUserById(this.prisma, input.sellerId);

    if (seller.status === UserStatus.INACTIVE) {
      throw new InvalidSaleOperationException('Seller is inactive');
    }

    const totalAmount = parseFloat(
      (input.kilograms * input.pricePerKilogram).toFixed(2),
    );
    const now = new Date();

    await this.prisma.sale.create({
      data: {
        id: randomUUID(),
        customerId: input.customerId,
        sellerId: input.sellerId,
        kilograms: input.kilograms,
        pricePerKilogram: input.pricePerKilogram,
        totalAmount,
        paymentStatus: PaymentStatus.PENDIENTE,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
}
