import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class SaleNotFoundException extends DomainException {
  constructor() {
    super('Sale not found', DomainErrorCode.SALE_NOT_FOUND);
  }
}
