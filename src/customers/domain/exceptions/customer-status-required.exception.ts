import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerStatusRequiredException extends DomainException {
  constructor() {
    super(
      'Customer status is required',
      DomainErrorCode.CUSTOMER_STATUS_REQUIRED,
    );
  }
}
