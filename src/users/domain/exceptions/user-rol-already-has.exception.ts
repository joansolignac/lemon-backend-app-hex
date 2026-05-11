import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserRolAlreadyHasException extends DomainException {
  constructor() {
    super('User already has this role', DomainErrorCode.USER_ROLE_ALREADY_HAS);
  }
}
