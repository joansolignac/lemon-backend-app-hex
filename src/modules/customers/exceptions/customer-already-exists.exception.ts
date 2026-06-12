import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class CustomerAlreadyExistsException extends DomainException {
  constructor(message: string = 'Customer already exists') {
    super(message, DomainErrorCode.CUSTOMER_ALREADY_EXISTS);
  }
}
