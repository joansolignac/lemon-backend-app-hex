import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerStatusInvalidException extends DomainException {
  constructor() {
    super(
      'Customer status is invalid',
      DomainErrorCode.CUSTOMER_STATUS_INVALID,
    );
  }
}
