import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerAddressRequiredException extends DomainException {
  constructor() {
    super(
      'Customer address is required',
      DomainErrorCode.CUSTOMER_ADDRESS_REQUIRED,
    );
  }
}
