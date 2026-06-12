import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class UserUpdateNoChangesDetectedException extends DomainException {
  constructor() {
    super(
      'No changes detected for user update',
      DomainErrorCode.USER_UPDATE_NO_CHANGES_DETECTED,
    );
  }
}
