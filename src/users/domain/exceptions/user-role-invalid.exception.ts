import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserRoleInvalidException extends DomainException {
  constructor() {
    super('Invalid type', DomainErrorCode.USER_ROLE_INVALID);
  }
}
