import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class InvalidSaleOperationException extends DomainException {
  constructor(message: string = 'Invalid sale operation') {
    super(message, DomainErrorCode.INVALID_SALE_OPERATION);
  }
}
