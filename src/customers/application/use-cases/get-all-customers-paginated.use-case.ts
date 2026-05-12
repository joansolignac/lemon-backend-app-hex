import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { Customer } from '../../domain/entities/customer.entity';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';

@Injectable()
export class GetAllCustomersPaginatedUseCase {
  private readonly logger = new Logger(GetAllCustomersPaginatedUseCase.name);

  constructor(private readonly repository: CustomerRepository) {}

  async execute(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<Customer>> {
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    const result = await this.repository.getAllPaginated(paginatedParams);

    this.logger.log(
      `Paginated customers: Page ${result.getPage()}, Limit ${result.getLimit()}, Found ${result.getData().length} of ${result.getTotal()} total customers`,
    );

    return result;
  }
}
