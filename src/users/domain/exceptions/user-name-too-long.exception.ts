import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserNameTooLongException extends DomainException {
  constructor() {
    super('Name exceeds maximum length', DomainErrorCode.USER_NAME_TOO_LONG);
  }
}
