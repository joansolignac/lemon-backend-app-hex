import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserRoleRequiredException extends DomainException {
  constructor() {
    super('Rol is required', DomainErrorCode.USER_ROLE_REQUIRED);
  }
}
