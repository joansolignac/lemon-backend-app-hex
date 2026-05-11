import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserUpdateNoChangesDetectedException extends DomainException {
  constructor() {
    super(
      'No changes detected',
      DomainErrorCode.USER_UPDATE_NO_CHANGES_DETECTED,
    );
  }
}
