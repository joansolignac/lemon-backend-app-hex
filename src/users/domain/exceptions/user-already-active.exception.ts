import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserAlreadyActiveException extends DomainException {
  constructor() {
    super('User is already active', DomainErrorCode.USER_ALREADY_ACTIVE);
  }
}
