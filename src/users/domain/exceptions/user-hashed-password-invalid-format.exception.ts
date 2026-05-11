import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserHashedPasswordInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Invalid hashed password format',
      DomainErrorCode.USER_HASHED_PASSWORD_INVALID_FORMAT,
    );
  }
}
