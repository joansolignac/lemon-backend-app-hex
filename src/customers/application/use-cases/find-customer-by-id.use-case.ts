import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerFinderService } from '../services/customer-finder.service';

@Injectable()
export class FindCustomerByIdUseCase {
  private readonly logger = new Logger(FindCustomerByIdUseCase.name);

  constructor(
    private readonly repository: CustomerRepository,
    private readonly customerFinder: CustomerFinderService,
  ) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customerFinder.findByIdOrFail(id);

    this.logger.log(
      `Customer found by ID: ${customer.getId().toPrimitives()}, Name=${customer.getName().toPrimitives()}, NumDocument=${customer.getNumDocument().toPrimitives()}`,
    );

    return customer;
  }
}
