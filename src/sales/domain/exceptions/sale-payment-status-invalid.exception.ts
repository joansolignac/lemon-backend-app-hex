import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SalePaymentStatusInvalidException extends DomainException {
  constructor() {
    super('Sale payment status is invalid', DomainErrorCode.SALE_PAYMENT_STATUS_INVALID);
  }
}
