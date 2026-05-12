import { Sale } from '../entities/sale.entity';
import { SaleId } from '../value-objects/sale-id.value-object';
import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value-object';
import { UserId } from '../../../users/domain/value-objects/user-id.value-object';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';

export abstract class SaleRepository {
  abstract save(sale: Sale): Promise<void>;
  abstract findById(id: SaleId): Promise<Sale | undefined>;
  abstract getAllByCustomerIdPaginated(
    customerId: CustomerId,
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>>;
  abstract getAllBySellerIdPaginated(
    sellerId: UserId,
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>>;
  abstract getAllPendingPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>>;
  abstract getAllPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<Sale>>;
}
