import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use.case';
import { DeactivateUserUseCase } from './application/use-cases/deactivate-user.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { GetAllUsersPaginatedUseCase } from './application/use-cases/get-all-users-paginated.use-case';

@Module({
  providers: [
    CreateUserUseCase,
    DeactivateUserUseCase,
    FindUserByIdUseCase,
    GetAllUsersUseCase,
    GetAllUsersPaginatedUseCase,
  ],
})
export class UsersModule {}
