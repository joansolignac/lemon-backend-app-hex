import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SalePricePerKilogramInvalidFormatException extends DomainException {
  constructor() {
    super('Sale price per kilogram has invalid format', DomainErrorCode.SALE_PRICE_PER_KILOGRAM_INVALID_FORMAT);
  }
}
