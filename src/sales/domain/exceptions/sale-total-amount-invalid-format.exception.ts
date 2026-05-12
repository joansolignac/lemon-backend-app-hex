import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleTotalAmountInvalidFormatException extends DomainException {
  constructor() {
    super('Sale total amount has invalid format', DomainErrorCode.SALE_TOTAL_AMOUNT_INVALID_FORMAT);
  }
}
