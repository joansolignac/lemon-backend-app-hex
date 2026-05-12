import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerIdInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Customer ID has invalid format',
      DomainErrorCode.CUSTOMER_ID_INVALID_FORMAT,
    );
  }
}
