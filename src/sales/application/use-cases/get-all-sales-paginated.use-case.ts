import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { Sale } from '../../domain/entities/sale.entity';

@Injectable()
export class GetAllSalesPaginatedUseCase {
  private readonly logger = new Logger(GetAllSalesPaginatedUseCase.name);

  constructor(private readonly repository: SaleRepository) {}

  async execute(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<Sale>> {
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    const result = await this.repository.getAllPaginated(paginatedParams);

    this.logger.log(
      `Paginated sales: Page ${result.getPage()}, Limit ${result.getLimit()}, Found ${result.getData().length} of ${result.getTotal()} total sales`,
    );

    return result;
  }
}
