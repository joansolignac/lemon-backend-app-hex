import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserRoleInvalidException extends DomainException {
  constructor() {
    super('Invalid type', DomainErrorCode.USER_ROLE_INVALID);
  }
}
