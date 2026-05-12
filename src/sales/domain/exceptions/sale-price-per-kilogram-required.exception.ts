import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SalePricePerKilogramRequiredException extends DomainException {
  constructor() {
    super('Sale price per kilogram is required', DomainErrorCode.SALE_PRICE_PER_KILOGRAM_REQUIRED);
  }
}
