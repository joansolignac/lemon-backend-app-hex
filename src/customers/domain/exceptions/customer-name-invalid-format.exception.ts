import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerNameInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Customer name has invalid format',
      DomainErrorCode.CUSTOMER_NAME_INVALID_FORMAT,
    );
  }
}
