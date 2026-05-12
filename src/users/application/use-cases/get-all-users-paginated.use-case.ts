import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';
import { User } from '../../domain/entities/user.entity';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';

@Injectable()
export class GetAllUsersPaginatedUseCase {
  private readonly logger = new Logger(GetAllUsersPaginatedUseCase.name);

  constructor(private readonly repository: UserRepository) {}

  async execute(params: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<User>> {
    const paginatedParams = PaginatedParams.create(params.page, params.limit);
    const result = await this.repository.getAllPaginated(paginatedParams);

    this.logger.log(
      `Paginated users: Page ${result.getPage()}, Limit ${result.getLimit()}, Found ${result.getData().length} of ${result.getTotal()} total users`,
    );

    return result;
  }
}
