import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserEmailRequiredException extends DomainException {
  constructor() {
    super('Email is required', DomainErrorCode.USER_EMAIL_REQUIRED);
  }
}
