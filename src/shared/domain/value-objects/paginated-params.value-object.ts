export class PaginatedParams {
  private constructor(
    private readonly page: number,
    private readonly limit: number,
  ) {}

  static create(page: number, limit: number): PaginatedParams {
    const normalizedPage = Number.isFinite(page) ? Math.max(page, 1) : 1;
    const normalizedLimit = Number.isFinite(limit)
      ? Math.min(Math.max(limit, 1), 100)
      : 10;
    return new PaginatedParams(normalizedPage, normalizedLimit);
  }
}
