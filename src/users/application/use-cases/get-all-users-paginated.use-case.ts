import { UserRepository } from '../../domain/repositories/user.repository';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { User } from '../../domain/entities/user.entity';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';

export class GetAllUsersPaginatedUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<User>> {
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    return this.repository.getAllPaginated(paginatedParams);
  }
}
