import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserStatusRequiredException extends DomainException {
  constructor() {
    super('Status is required', DomainErrorCode.USER_STATUS_REQUIRED);
  }
}
