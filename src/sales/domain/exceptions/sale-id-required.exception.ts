import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleIdRequiredException extends DomainException {
  constructor() {
    super('Sale ID is required', DomainErrorCode.SALE_ID_REQUIRED);
  }
}
