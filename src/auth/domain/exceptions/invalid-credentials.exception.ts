import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super('Invalid credentias', DomainErrorCode.INVALID_CREDENTIALS);
  }
}
