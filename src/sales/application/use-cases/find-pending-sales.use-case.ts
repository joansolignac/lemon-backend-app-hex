import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { Sale } from '../../domain/entities/sale.entity';

@Injectable()
export class FindPendingSalesUseCase {
  private readonly logger = new Logger(FindPendingSalesUseCase.name);

  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<Sale>> {
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    const result = await this.saleRepository.getAllPendingPaginated(
      paginatedParams,
    );

    this.logger.log(
      `Pending sales found: Page=${result.getPage()}, Found ${result.getData().length} of ${result.getTotal()}`,
    );

    return result;
  }
}
