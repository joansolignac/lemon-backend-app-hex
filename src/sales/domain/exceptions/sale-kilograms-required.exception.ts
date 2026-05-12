import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleKilogramsRequiredException extends DomainException {
  constructor() {
    super('Sale kilograms is required', DomainErrorCode.SALE_KILOGRAMS_REQUIRED);
  }
}
