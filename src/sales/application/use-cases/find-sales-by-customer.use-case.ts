import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value-object';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { Sale } from '../../domain/entities/sale.entity';

@Injectable()
export class FindSalesByCustomerUseCase {
  private readonly logger = new Logger(FindSalesByCustomerUseCase.name);

  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(
    customerId: string,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<Sale>> {
    const customerIdVO = CustomerId.from(customerId);
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    const result = await this.saleRepository.getAllByCustomerIdPaginated(
      customerIdVO,
      paginatedParams,
    );

    this.logger.log(
      `Sales found by customer: CustomerID=${customerId}, Page=${result.getPage()}, Found ${result.getData().length} of ${result.getTotal()}`,
    );

    return result;
  }
}
