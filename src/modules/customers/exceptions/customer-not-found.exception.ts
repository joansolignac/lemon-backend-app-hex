import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class CustomerNotFoundException extends DomainException {
  constructor() {
    super('Customer not found', DomainErrorCode.CUSTOMER_NOT_FOUND);
  }
}
