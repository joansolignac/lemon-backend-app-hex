import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerAlreadyExistsException extends DomainException {
  constructor(message: string = 'Customer already exists') {
    super(message, DomainErrorCode.CUSTOMER_ALREADY_EXISTS);
  }
}
