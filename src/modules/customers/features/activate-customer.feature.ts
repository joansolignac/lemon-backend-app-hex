import { Injectable } from '@nestjs/common';
import { CustomerStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureCustomerById } from '../utils/customer.util';
import { CustomerAlreadyActiveException } from '../exceptions/customer-already-active.exception';

@Injectable()
export class ActivateCustomerFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const customer = await ensureCustomerById(this.prisma, id);

    if (customer.status === CustomerStatus.ACTIVE)
      throw new CustomerAlreadyActiveException();

    await this.prisma.customer.update({
      where: { id },
      data: { status: CustomerStatus.ACTIVE, updatedAt: new Date() },
    });
  }
}
