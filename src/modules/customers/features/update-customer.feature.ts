import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ensureCustomerById } from '../utils/customer.util';
import { CustomerUpdateNoChangesDetectedException } from '../exceptions/customer-update-no-changes-detected.exception';
import { CustomerAlreadyExistsException } from '../exceptions/customer-already-exists.exception';

type UpdateCustomerInput = {
  name?: string;
  phone?: string;
  email?: string | null;
  address?: string;
};

@Injectable()
export class UpdateCustomerFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, input: UpdateCustomerInput): Promise<void> {
    const customer = await ensureCustomerById(this.prisma, id);

    const hasChanges =
      input.name !== undefined ||
      input.phone !== undefined ||
      input.email !== undefined ||
      input.address !== undefined;

    if (!hasChanges) throw new CustomerUpdateNoChangesDetectedException();

    if (input.phone && input.phone !== customer.phone) {
      const existing = await this.prisma.customer.findUnique({
        where: { phone: input.phone },
      });
      if (existing)
        throw new CustomerAlreadyExistsException('Phone already exists');
    }

    if (
      input.email !== undefined &&
      input.email !== null &&
      input.email !== customer.email
    ) {
      const existing = await this.prisma.customer.findUnique({
        where: { email: input.email },
      });
      if (existing)
        throw new CustomerAlreadyExistsException('Email already exists');
    }

    await this.prisma.customer.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.phone !== undefined && { phone: input.phone }),
        ...(input.email !== undefined && { email: input.email }),
        ...(input.address !== undefined && { address: input.address }),
        updatedAt: new Date(),
      },
    });
  }
}
