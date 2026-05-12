import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserEmailInvalidFormatException extends DomainException {
  constructor() {
    super('Email invalid format', DomainErrorCode.USER_EMAIL_INVALID_FORMAT);
  }
}
