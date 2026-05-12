import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerIdRequiredException extends DomainException {
  constructor() {
    super('Customer ID is required', DomainErrorCode.CUSTOMER_ID_REQUIRED);
  }
}
