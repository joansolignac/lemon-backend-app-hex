import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserHashedPasswordRequiredException extends DomainException {
  constructor() {
    super(
      'Hashed password is required',
      DomainErrorCode.USER_HASHED_PASSWORD_REQUIRED,
    );
  }
}
