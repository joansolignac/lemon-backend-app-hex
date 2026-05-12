import { Customer } from '../entities/customer.entity';
import { CustomerId } from '../value-objects/customer-id.value-object';
import { CustomerNumDocument } from '../value-objects/customer-num-document.value-object';
import { CustomerPhone } from '../value-objects/customer-phone.value-object';
import { CustomerEmail } from '../value-objects/customer-email.value-object';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';

export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
  abstract findById(id: CustomerId): Promise<Customer | undefined>;
  abstract findByNumDocument(
    numDocument: CustomerNumDocument,
  ): Promise<Customer | undefined>;
  abstract existsByNumDocument(
    numDocument: CustomerNumDocument,
  ): Promise<boolean>;
  abstract existsByPhone(phone: CustomerPhone): Promise<boolean>;
  abstract existsByEmail(email: CustomerEmail): Promise<boolean>;
  abstract getAllPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<Customer>>;
}
