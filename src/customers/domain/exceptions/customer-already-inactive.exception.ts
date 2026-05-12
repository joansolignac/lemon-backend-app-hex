import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerAlreadyInactiveException extends DomainException {
  constructor() {
    super(
      'Customer is already inactive',
      DomainErrorCode.CUSTOMER_ALREADY_INACTIVE,
    );
  }
}
