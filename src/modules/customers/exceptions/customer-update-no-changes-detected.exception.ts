import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class CustomerUpdateNoChangesDetectedException extends DomainException {
  constructor() {
    super(
      'No changes detected for customer update',
      DomainErrorCode.CUSTOMER_UPDATE_NO_CHANGES_DETECTED,
    );
  }
}
