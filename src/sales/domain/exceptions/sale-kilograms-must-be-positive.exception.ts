import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleKilogramsMustBePositiveException extends DomainException {
  constructor() {
    super('Sale kilograms must be positive', DomainErrorCode.SALE_KILOGRAMS_MUST_BE_POSITIVE);
  }
}
