import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerNumDocument } from '../../domain/value-objects/customer-num-document.value-object';

@Injectable()
export class FindCustomerByNumDocumentUseCase {
  private readonly logger = new Logger(FindCustomerByNumDocumentUseCase.name);

  constructor(private readonly repository: CustomerRepository) {}

  async execute(numDocument: string): Promise<Customer | undefined> {
    const customerNumDocument = CustomerNumDocument.from(numDocument);
    const customer =
      await this.repository.findByNumDocument(customerNumDocument);

    if (customer) {
      this.logger.log(
        `Customer found by numDocument: ${customer.getNumDocument().toPrimitives()} -> ID=${customer.getId().toPrimitives()}, Name=${customer.getName().toPrimitives()}`,
      );
    } else {
      this.logger.log(`Customer not found by numDocument: ${numDocument}`);
    }

    return customer;
  }
}
