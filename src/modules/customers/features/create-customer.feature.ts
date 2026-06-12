import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CustomerStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CustomerAlreadyExistsException } from '../exceptions/customer-already-exists.exception';
import type { CreateCustomerInput } from '../types/create-customer-input.type';

@Injectable()
export class CreateCustomerFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(input: CreateCustomerInput): Promise<void> {
    const existsByNumDocument = await this.prisma.customer.findUnique({
      where: { numDocument: input.numDocument },
    });
    if (existsByNumDocument) {
      throw new CustomerAlreadyExistsException('Num document already exists');
    }

    const existsByPhone = await this.prisma.customer.findUnique({
      where: { phone: input.phone },
    });
    if (existsByPhone) {
      throw new CustomerAlreadyExistsException('Phone already exists');
    }

    if (input.email) {
      const existsByEmail = await this.prisma.customer.findUnique({
        where: { email: input.email },
      });
      if (existsByEmail) {
        throw new CustomerAlreadyExistsException('Email already exists');
      }
    }

    const now = new Date();
    await this.prisma.customer.create({
      data: {
        id: randomUUID(),
        name: input.name,
        typeDocument: input.typeDocument,
        numDocument: input.numDocument,
        phone: input.phone,
        email: input.email ?? null,
        address: input.address,
        status: CustomerStatus.ACTIVE,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
}
