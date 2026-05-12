import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserNameRequiredException extends DomainException {
  constructor() {
    super('Name is required', DomainErrorCode.USER_NAME_REQUIRED);
  }
}
