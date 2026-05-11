import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserNotFoundException extends DomainException {
  constructor() {
    super('User not found', DomainErrorCode.USER_NOT_FOUND);
  }
}
