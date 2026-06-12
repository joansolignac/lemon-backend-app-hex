import { DomainException } from '../../../common/exceptions/domain.exception';
import { DomainErrorCode } from '../../../common/exceptions/error-code.enum';

export class UserEmailAlreadyExistsException extends DomainException {
  constructor() {
    super(
      'User with this email already exists',
      DomainErrorCode.USER_EMAIL_ALREADY_EXISTS,
    );
  }
}
