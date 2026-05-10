import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.value-object';
import { UserEmail } from '../value-objects/user-email.value-object';
import { PaginatedParams } from '../../../shared/domain/value-objects/paginated-params.value-object';
import { PaginatedResult } from '../../../shared/domain/value-objects/paginated-result.value-object';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(id: UserId): Promise<User>;
  abstract findByEmail(email: UserEmail): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract getAllPaginated(
    params: PaginatedParams,
  ): Promise<PaginatedResult<User>>;
}
