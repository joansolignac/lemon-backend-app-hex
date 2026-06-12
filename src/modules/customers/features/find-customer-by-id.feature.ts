import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CustomerResponseDto } from '../dtos/response/customer.response.dto';
import { ensureCustomerById } from '../utils/customer.util';

@Injectable()
export class FindCustomerByIdFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<CustomerResponseDto> {
    const customer = await ensureCustomerById(this.prisma, id);
    return this.toResponse(customer);
  }

  toResponse(customer: {
    id: string;
    name: string;
    typeDocument: string;
    numDocument: string;
    phone: string;
    email: string | null;
    address: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): CustomerResponseDto {
    return {
      id: customer.id,
      name: customer.name,
      typeDocument: customer.typeDocument,
      numDocument: customer.numDocument,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      status: customer.status,
      createdAt: customer.createdAt.toISOString(),
      updatedAt: customer.updatedAt.toISOString(),
    };
  }
}
