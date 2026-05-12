import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleTotalAmountRequiredException extends DomainException {
  constructor() {
    super('Sale total amount is required', DomainErrorCode.SALE_TOTAL_AMOUNT_REQUIRED);
  }
}
