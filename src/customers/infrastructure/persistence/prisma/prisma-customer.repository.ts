import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../../domain/repositories/customer.repository';
import { PrismaService } from '../../../../shared/infrastructure/persistence/prisma/services/prisma.service';
import { PaginatedParams } from 'src/shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from 'src/shared/domain/value-objects/paginated-result.value-object';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.value-object';
import { CustomerNumDocument } from 'src/customers/domain/value-objects/customer-num-document.value-object';
import { CustomerPhone } from 'src/customers/domain/value-objects/customer-phone.value-object';
import { CustomerEmail } from 'src/customers/domain/value-objects/customer-email.value-object';
import {
  toCustomerDomain,
  toCustomersDomainList,
} from './mapper/customer-domain.mapper';

@Injectable()
export class PrismaCustomerRepository extends CustomerRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(customer: Customer): Promise<void> {
    const CUSTOMER_ID = customer.getId().toPrimitives();
    const CUSTOMER_DATA = {
      id: CUSTOMER_ID,
      name: customer.getName().toPrimitives(),
      typeDocument: customer.getTypeDocument().toPrimitives(),
      numDocument: customer.getNumDocument().toPrimitives(),
      phone: customer.getPhone().toPrimitives(),
      email: customer.getEmail()?.toPrimitives() ?? null,
      address: customer.getAddress().toPrimitives(),
      status: customer.getStatus().toPrimitives(),
      createdAt: customer.getCreatedAt(),
      updatedAt: customer.getUpdatedAt(),
    };
    await this.prisma.customer.upsert({
      where: { id: CUSTOMER_ID },
      update: CUSTOMER_DATA,
      create: CUSTOMER_DATA,
    });
  }

  async findById(id: CustomerId): Promise<Customer | undefined> {
    const CUSTOMER_ID = id.toPrimitives();

    const customer = await this.prisma.customer.findUnique({
      where: { id: CUSTOMER_ID },
    });

    return customer ? toCustomerDomain(customer) : undefined;
  }

  async findByNumDocument(
    numDocument: CustomerNumDocument,
  ): Promise<Customer | undefined> {
    const CUSTOMER_NUM_DOCUMENT = numDocument.toPrimitives();

    const customer = await this.prisma.customer.findUnique({
      where: { numDocument: CUSTOMER_NUM_DOCUMENT },
    });

    return customer ? toCustomerDomain(customer) : undefined;
  }

  async existsByNumDocument(
    numDocument: CustomerNumDocument,
  ): Promise<boolean> {
    const CUSTOMER_NUM_DOCUMENT = numDocument.toPrimitives();

    const customer = await this.prisma.customer.findUnique({
      where: { numDocument: CUSTOMER_NUM_DOCUMENT },
    });

    return !!customer;
  }

  async existsByPhone(phone: CustomerPhone): Promise<boolean> {
    const CUSTOMER_PHONE = phone.toPrimitives();

    const customer = await this.prisma.customer.findUnique({
      where: { phone: CUSTOMER_PHONE },
    });

    return !!customer;
  }

  async existsByEmail(email: CustomerEmail): Promise<boolean> {
    const CUSTOMER_EMAIL = email.toPrimitives();
    if (!CUSTOMER_EMAIL) return false;

    const customer = await this.prisma.customer.findUnique({
      where: { email: CUSTOMER_EMAIL },
    });

    return !!customer;
  }

  async getAllPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<Customer>> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        skip: params.getSkip(),
        take: params.getTake(),
      }),
      this.prisma.customer.count(),
    ]);

    const customers = toCustomersDomainList(data);

    return PaginatedResult.generate<Customer>(params, customers, total);
  }
}
