import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerEmailInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Customer email has invalid format',
      DomainErrorCode.CUSTOMER_EMAIL_INVALID_FORMAT,
    );
  }
}
