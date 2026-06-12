export function resolvePagination(page: number, limit: number) {
  const p = Number.isFinite(page) ? Math.max(page, 1) : 1;
  const l = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 100) : 10;
  return { skip: (p - 1) * l, take: l, page: p, limit: l };
}
