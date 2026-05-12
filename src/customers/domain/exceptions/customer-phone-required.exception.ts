import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerPhoneRequiredException extends DomainException {
  constructor() {
    super(
      'Customer phone is required',
      DomainErrorCode.CUSTOMER_PHONE_REQUIRED,
    );
  }
}
