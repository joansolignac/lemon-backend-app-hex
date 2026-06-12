import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CustomerResponseDto } from '../dtos/response/customer.response.dto';
import { CustomerNotFoundException } from '../exceptions/customer-not-found.exception';

@Injectable()
export class FindCustomerByNumDocumentFeature {
  constructor(private readonly prisma: PrismaService) {}

  async execute(numDocument: string): Promise<CustomerResponseDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { numDocument },
    });
    if (!customer) throw new CustomerNotFoundException();
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
