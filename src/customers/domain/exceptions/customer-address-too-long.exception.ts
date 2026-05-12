import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerAddressTooLongException extends DomainException {
  constructor() {
    super(
      'Customer address is too long',
      DomainErrorCode.CUSTOMER_ADDRESS_TOO_LONG,
    );
  }
}
