import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleNotFoundException extends DomainException {
  constructor() {
    super('Sale not found', DomainErrorCode.SALE_NOT_FOUND);
  }
}
