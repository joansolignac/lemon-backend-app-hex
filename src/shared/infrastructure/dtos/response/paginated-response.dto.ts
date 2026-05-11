export class PaginatedResponseDto<T> {
  declare readonly data: T[];
  declare readonly meta: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
  };
}
