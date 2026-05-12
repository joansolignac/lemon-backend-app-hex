import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerTypeDocumentRequiredException extends DomainException {
  constructor() {
    super(
      'Customer type document is required',
      DomainErrorCode.CUSTOMER_TYPE_DOCUMENT_REQUIRED,
    );
  }
}
