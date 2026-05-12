import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserRoleRequiredException extends DomainException {
  constructor() {
    super('Rol is required', DomainErrorCode.USER_ROLE_REQUIRED);
  }
}
