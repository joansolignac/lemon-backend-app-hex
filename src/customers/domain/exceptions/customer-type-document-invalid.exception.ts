import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerTypeDocumentInvalidException extends DomainException {
  constructor() {
    super(
      'Customer type document is invalid',
      DomainErrorCode.CUSTOMER_TYPE_DOCUMENT_INVALID,
    );
  }
}
