import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserNameInvalidFormatException extends DomainException {
  constructor() {
    super('Invalid name format', DomainErrorCode.USER_NAME_INVALID_FORMAT);
  }
}
