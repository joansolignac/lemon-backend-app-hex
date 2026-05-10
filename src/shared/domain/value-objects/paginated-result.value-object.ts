import { PaginatedParams } from './paginated-params.value-object';

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
      throw new Error('Data should be an array');
    }
  }

  private validateTotal(value: number): void {
    if (value < 0) {
      throw new Error(`Total cannot be negative`);
    }
  }
}
