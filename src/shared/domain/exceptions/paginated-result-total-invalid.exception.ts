import { DomainException } from './domain.exception';
import { DomainErrorCode } from './error-code.enum';

export class PaginatedResultTotalInvalidException extends DomainException {
  constructor() {
    super(
      'Total cannot be negative',
      DomainErrorCode.PAGINATED_RESULT_TOTAL_INVALID,
    );
  }
}
