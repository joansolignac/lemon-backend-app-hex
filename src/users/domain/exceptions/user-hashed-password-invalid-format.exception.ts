import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserHashedPasswordInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Invalid hashed password format',
      DomainErrorCode.USER_HASHED_PASSWORD_INVALID_FORMAT,
    );
  }
}
