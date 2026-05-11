import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserEmailRequiredException extends DomainException {
  constructor() {
    super('Email is required', DomainErrorCode.USER_EMAIL_REQUIRED);
  }
}
