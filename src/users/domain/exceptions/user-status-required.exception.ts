import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserStatusRequiredException extends DomainException {
  constructor() {
    super('Status is required', DomainErrorCode.USER_STATUS_REQUIRED);
  }
}
