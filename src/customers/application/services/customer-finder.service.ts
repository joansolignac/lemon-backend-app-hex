import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerId } from '../../domain/value-objects/customer-id.value-object';
import { CustomerNotFoundException } from '../../domain/exceptions/customer-not-found.exception';
import { CustomerNumDocument } from '../../domain/value-objects/customer-num-document.value-object';

@Injectable()
export class CustomerFinderService {
  private readonly logger = new Logger(CustomerFinderService.name);

  constructor(private readonly repository: CustomerRepository) {}

  async findByIdOrFail(id: string): Promise<Customer> {
    const customerId = CustomerId.from(id);
    const customer = await this.repository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundException();
    }

    return customer;
  }

  async findByNumDocument(numDocument: string): Promise<Customer | undefined> {
    const customerNumDocument = CustomerNumDocument.from(numDocument);
    return this.repository.findByNumDocument(customerNumDocument);
  }
}
