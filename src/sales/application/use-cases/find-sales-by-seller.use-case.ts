import { Injectable, Logger } from '@nestjs/common';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { Sale } from '../../domain/entities/sale.entity';

@Injectable()
export class FindSalesBySellerUseCase {
  private readonly logger = new Logger(FindSalesBySellerUseCase.name);

  constructor(private readonly saleRepository: SaleRepository) {}

  async execute(
    sellerId: string,
    params: { page: number; limit: number },
  ): Promise<PaginatedResult<Sale>> {
    const sellerIdVO = UserId.from(sellerId);
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    const result = await this.saleRepository.getAllBySellerIdPaginated(
      sellerIdVO,
      paginatedParams,
    );

    this.logger.log(
      `Sales found by seller: SellerID=${sellerId}, Page=${result.getPage()}, Found ${result.getData().length} of ${result.getTotal()}`,
    );

    return result;
  }
}
