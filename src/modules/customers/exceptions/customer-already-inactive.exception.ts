import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class CustomerAlreadyInactiveException extends DomainException {
  constructor() {
    super(
      'Customer is already inactive',
      DomainErrorCode.CUSTOMER_ALREADY_INACTIVE,
    );
  }
}
