import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserStatusInvalidException extends DomainException {
  constructor() {
    super('Status is not valid', DomainErrorCode.USER_STATUS_INVALID);
  }
}
