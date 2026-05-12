import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerNameTooLongException extends DomainException {
  constructor() {
    super('Customer name is too long', DomainErrorCode.CUSTOMER_NAME_TOO_LONG);
  }
}
