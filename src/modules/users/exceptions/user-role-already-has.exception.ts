import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class UserRoleAlreadyHasException extends DomainException {
  constructor() {
    super('User already has this role', DomainErrorCode.USER_ROLE_ALREADY_HAS);
  }
}
