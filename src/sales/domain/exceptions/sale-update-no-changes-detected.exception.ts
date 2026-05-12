import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class SaleUpdateNoChangesDetectedException extends DomainException {
  constructor() {
    super('No changes detected for sale update', DomainErrorCode.SALE_UPDATE_NO_CHANGES_DETECTED);
  }
}
