import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerUpdateNoChangesDetectedException extends DomainException {
  constructor() {
    super(
      'No changes detected for customer update',
      DomainErrorCode.CUSTOMER_UPDATE_NO_CHANGES_DETECTED,
    );
  }
}
