import { DomainException } from './domain.exception.js';
import { DomainErrorCode } from './error-code.enum.js';

export class PaginatedResultDataInvalidException extends DomainException {
  constructor() {
    super(
      'Data should be an array',
      DomainErrorCode.PAGINATED_RESULT_DATA_INVALID,
    );
  }
}
