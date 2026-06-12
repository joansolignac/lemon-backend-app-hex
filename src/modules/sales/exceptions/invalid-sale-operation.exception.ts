import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class InvalidSaleOperationException extends DomainException {
  constructor(message: string) {
    super(message, DomainErrorCode.INVALID_SALE_OPERATION);
  }
}
