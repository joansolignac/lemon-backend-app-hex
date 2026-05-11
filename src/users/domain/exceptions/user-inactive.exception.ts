import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserInactiveException extends DomainException {
  constructor() {
    super('User is inactive', DomainErrorCode.USER_INACTIVE);
  }
}
