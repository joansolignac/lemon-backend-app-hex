import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerFinderService } from '../services/customer-finder.service';

@Injectable()
export class DeactivateCustomerUseCase {
  private readonly logger = new Logger(DeactivateCustomerUseCase.name);

  constructor(
    private readonly repository: CustomerRepository,
    private readonly customerFinder: CustomerFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const customer = await this.customerFinder.findByIdOrFail(id);

    customer.deactivate();

    await this.repository.save(customer);

    this.logger.log(
      `Customer deactivated: ID=${customer.getId().toPrimitives()}, Name=${customer.getName().toPrimitives()}, NumDocument=${customer.getNumDocument().toPrimitives()}`,
    );
  }
}
