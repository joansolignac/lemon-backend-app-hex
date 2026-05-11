import { PaginatedResponseDto } from '../dtos/response/paginated-response.dto';

export const toPaginatedResponse = <T>(params: {
  data: T[];
  page: number;
  limit: number;
  total: number;
}): PaginatedResponseDto<T> => ({
  data: params.data,
  meta: {
    page: params.page,
    limit: params.limit,
    total: params.total,
  },
});
