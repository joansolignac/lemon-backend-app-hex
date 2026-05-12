import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserNotFoundException extends DomainException {
  constructor() {
    super('User not found', DomainErrorCode.USER_NOT_FOUND);
  }
}
