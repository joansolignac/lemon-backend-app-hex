import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerPhoneInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Customer phone has invalid format',
      DomainErrorCode.CUSTOMER_PHONE_INVALID_FORMAT,
    );
  }
}
