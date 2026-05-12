import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserEmailAlreadyExistsException extends DomainException {
  constructor() {
    super('User already exists', DomainErrorCode.USER_EMAIL_ALREADY_EXISTS);
  }
}
