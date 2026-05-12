import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleKilogramsInvalidFormatException extends DomainException {
  constructor() {
    super('Sale kilograms has invalid format', DomainErrorCode.SALE_KILOGRAMS_INVALID_FORMAT);
  }
}
