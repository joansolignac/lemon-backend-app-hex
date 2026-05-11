import { PaginatedParams } from './paginated-params.value-object.js';
import { PaginatedResultDataInvalidException } from '../exceptions/paginated-result-data-invalid.exception.js';
import { PaginatedResultTotalInvalidException } from '../exceptions/paginated-result-total-invalid.exception.js';

export class PaginatedResult<T> {
  private constructor(
    private readonly paginatedParams: PaginatedParams,
    private readonly data: T[],
    private readonly total: number,
  ) {
    this.validateData(data);
    this.validateTotal(total);
  }

  static generate<T>(
    paginatedParams: PaginatedParams,
    data: T[],
    total: number,
  ) {
    return new PaginatedResult<T>(paginatedParams, data, total);
  }

  private validateData(data: T[]) {
    if (!Array.isArray(data)) {
      throw new PaginatedResultDataInvalidException();
    }
  }

  private validateTotal(value: number): void {
    if (value < 0) {
      throw new PaginatedResultTotalInvalidException();
    }
  }

  getPage(): number {
    return this.paginatedParams.toPrimitives().page;
  }

  getLimit(): number {
    return this.paginatedParams.toPrimitives().limit;
  }

  getData(): T[] {
    return this.data;
  }

  getTotal(): number {
    return this.total;
  }
}
