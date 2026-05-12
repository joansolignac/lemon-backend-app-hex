import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleIdInvalidFormatException extends DomainException {
  constructor() {
    super('Sale ID has invalid format', DomainErrorCode.SALE_ID_INVALID_FORMAT);
  }
}
