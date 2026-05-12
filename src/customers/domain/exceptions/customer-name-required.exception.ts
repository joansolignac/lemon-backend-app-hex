import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerNameRequiredException extends DomainException {
  constructor() {
    super('Customer name is required', DomainErrorCode.CUSTOMER_NAME_REQUIRED);
  }
}
