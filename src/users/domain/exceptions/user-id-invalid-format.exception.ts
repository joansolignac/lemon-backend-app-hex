import { DomainException } from '../../../shared/domain/exceptions/domain.exception.js';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum.js';

export class UserIdInvalidFormatException extends DomainException {
  constructor() {
    super('Id must be an UUID', DomainErrorCode.USER_ID_INVALID_FORMAT);
  }
}
