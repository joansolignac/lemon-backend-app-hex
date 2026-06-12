import { Injectable } from '@nestjs/common';
import { CustomerStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureCustomerById } from '../utils/customer.util';
import { CustomerAlreadyInactiveException } from '../exceptions/customer-already-inactive.exception';

@Injectable()
export class DeactivateCustomerFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const customer = await ensureCustomerById(this.prisma, id);

    if (customer.status === CustomerStatus.INACTIVE)
      throw new CustomerAlreadyInactiveException();

    await this.prisma.customer.update({
      where: { id },
      data: { status: CustomerStatus.INACTIVE, updatedAt: new Date() },
    });
  }
}
