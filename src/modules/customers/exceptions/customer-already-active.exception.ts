import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class CustomerAlreadyActiveException extends DomainException {
  constructor() {
    super(
      'Customer is already active',
      DomainErrorCode.CUSTOMER_ALREADY_ACTIVE,
    );
  }
}
