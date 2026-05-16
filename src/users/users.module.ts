import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use.case';
import { DeactivateUserUseCase } from './application/use-cases/deactivate-user.use-case';
import { GetAllUsersPaginatedUseCase } from './application/use-cases/get-all-users-paginated.use-case';
import { ActivateUserUseCase } from './application/use-cases/activate-user.use-case';
import { UpdateUserRoleUseCase } from './application/use-cases/update-user-role.use-case';
import { UpdateUserProfileUseCase } from './application/use-cases/update-user-profile.use-case';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { UserFinderService } from './application/services/user-finder.service';
import { PrismaModule } from '../shared/infrastructure/persistence/prisma/prisma.module';
import { UpdateUserPasswordUseCase } from './application/use-cases/update-user-password.use-case';
import { HashModule } from '../shared/infrastructure/security/hash/hash.module';
import { AuthSharedModule } from '../shared/infrastructure/security/auth/auth-shared.module';

@Module({
  imports: [PrismaModule, HashModule, AuthSharedModule],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    GetAllUsersPaginatedUseCase,
    ActivateUserUseCase,
    DeactivateUserUseCase,
    UpdateUserRoleUseCase,
    UpdateUserProfileUseCase,
    UpdateUserPasswordUseCase,
    UserFinderService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [UserController],
  exports: [UserRepository, FindUserByIdUseCase, UserFinderService],
})
export class UsersModule {}
