import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class UserIdRequiredException extends DomainException {
  constructor() {
    super('Id is required', DomainErrorCode.USER_ID_REQUIRED);
  }
}
