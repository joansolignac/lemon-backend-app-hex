import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserEmailInvalidFormatException extends DomainException {
  constructor() {
    super('Email invalid format', DomainErrorCode.USER_EMAIL_INVALID_FORMAT);
  }
}
