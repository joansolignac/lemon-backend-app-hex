import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SalePaymentStatusRequiredException extends DomainException {
  constructor() {
    super('Sale payment status is required', DomainErrorCode.SALE_PAYMENT_STATUS_REQUIRED);
  }
}
