import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerAlreadyActiveException extends DomainException {
  constructor() {
    super(
      'Customer is already active',
      DomainErrorCode.CUSTOMER_ALREADY_ACTIVE,
    );
  }
}
