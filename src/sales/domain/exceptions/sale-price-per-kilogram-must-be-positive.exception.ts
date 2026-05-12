import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SalePricePerKilogramMustBePositiveException extends DomainException {
  constructor() {
    super('Sale price per kilogram must be positive', DomainErrorCode.SALE_PRICE_PER_KILOGRAM_MUST_BE_POSITIVE);
  }
}
