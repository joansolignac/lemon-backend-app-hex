import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerAddressInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Customer address has invalid format',
      DomainErrorCode.CUSTOMER_ADDRESS_INVALID_FORMAT,
    );
  }
}
