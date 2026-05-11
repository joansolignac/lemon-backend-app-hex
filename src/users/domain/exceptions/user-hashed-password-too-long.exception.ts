import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserHashedPasswordTooLongException extends DomainException {
  constructor() {
    super(
      'Hashed password exceeds maximum length',
      DomainErrorCode.USER_HASHED_PASSWORD_TOO_LONG,
    );
  }
}
