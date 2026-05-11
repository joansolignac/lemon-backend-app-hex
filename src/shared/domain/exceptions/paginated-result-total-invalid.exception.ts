import { DomainException } from './domain.exception.js';
import { DomainErrorCode } from './error-code.enum.js';

export class PaginatedResultTotalInvalidException extends DomainException {
  constructor() {
    super(
      'Total cannot be negative',
      DomainErrorCode.PAGINATED_RESULT_TOTAL_INVALID,
    );
  }
}
