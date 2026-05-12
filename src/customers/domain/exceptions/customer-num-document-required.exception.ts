import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { DomainErrorCode } from '../../../shared/domain/exceptions/error-code.enum';

export class CustomerNumDocumentRequiredException extends DomainException {
  constructor() {
    super(
      'Customer num document is required',
      DomainErrorCode.CUSTOMER_NUM_DOCUMENT_REQUIRED,
    );
  }
}
