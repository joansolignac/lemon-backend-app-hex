import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserAlreadyInactiveException extends DomainException {
  constructor() {
    super('User is already inactive', DomainErrorCode.USER_ALREADY_INACTIVE);
  }
}
