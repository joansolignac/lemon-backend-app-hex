import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use.case';
import { DeactivateUserUseCase } from './application/use-cases/deactivate-user.use-case';
import { GetAllUsersPaginatedUseCase } from './application/use-cases/get-all-users-paginated.use-case';
import { ActivateUserUseCase } from './application/use-cases/activate-user.use-case';
import { UpdateUserRoleUseCase } from './application/use-cases/update-user-role.use-case';
import { UpdateUserProfileUseCase } from './application/use-cases/update-user-profile.use-case';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
  providers: [
    CreateUserUseCase,
    DeactivateUserUseCase,
    FindUserByIdUseCase,
    GetAllUsersPaginatedUseCase,
    ActivateUserUseCase,
    DeactivateUserUseCase,
    UpdateUserRoleUseCase,
    UpdateUserProfileUseCase,
  ],
  controllers: [UserController],
})
export class UsersModule {}
