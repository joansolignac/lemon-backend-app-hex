import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerNumDocumentInvalidFormatException extends DomainException {
  constructor() {
    super(
      'Customer num document has invalid format',
      DomainErrorCode.CUSTOMER_NUM_DOCUMENT_INVALID_FORMAT,
    );
  }
}
