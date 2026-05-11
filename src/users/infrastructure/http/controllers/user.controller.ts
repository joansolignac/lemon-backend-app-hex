import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserCreateDto } from '../dtos/request/user-create.dto';
import { CreateUserUseCase } from '../../../application/use-cases/create-user.use-case';
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { toUserResponse } from '../../mappers/user-response.mapper';
import { FindUserByIdUseCase } from '../../../application/use-cases/find-user-by-id.use.case';
import { PaginatedQueryDto } from '../../../../shared/infrastructure/dtos/request/paginated-query.dto';
import { PaginatedResponseDto } from '../../../../shared/infrastructure/dtos/response/paginated-response.dto';
import { GetAllUsersPaginatedUseCase } from '../../../application/use-cases/get-all-users-paginated.use-case';
import { toPaginatedResponse } from '../../../../shared/infrastructure/mappers/paginated-response.mapper';
import { UpdateUserProfileDto } from '../dtos/request/update-user-profile.dto';
import { UpdateUserProfileUseCase } from '../../../application/use-cases/update-user-profile.use-case';
import { UpdateUserPasswordDto } from '../dtos/request/update-user-password.dto';
import { UpdateUserPasswordUseCase } from '../../../application/use-cases/update-user-password.use-case';
import { ActivateUserUseCase } from '../../../application/use-cases/activate-user.use-case';
import { DeactivateUserUseCase } from '../../../application/use-cases/deactivate-user.use-case';
import { UseAuth } from '../../../../shared/infrastructure/security/auth/decorators/use-auth.decorator';
import { ROLE } from '../../../domain/value-objects/user-rol.value-object';
import { CurrentUser } from '../../../../shared/infrastructure/security/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../../shared/domain/value-objects/authenticated-user.value-object';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly getAllUserPaginatedUseCase: GetAllUsersPaginatedUseCase,
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
    private readonly deactivateUserUseCase: DeactivateUserUseCase,
  ) {}

  @Post()
  @UseAuth(ROLE.ADMINISTRADOR)
  async create(@Body() dto: UserCreateDto): Promise<void> {
    await this.createUserUseCase.execute({
      role: dto.role,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }

  @Get('/:id')
  @UseAuth(ROLE.ADMINISTRADOR)
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.findUserByIdUseCase.execute(id);
    return toUserResponse(user);
  }

  @Get()
  @UseAuth(ROLE.ADMINISTRADOR)
  async getAllPaginated(
    @Query() query: PaginatedQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const paginatedResult =
      await this.getAllUserPaginatedUseCase.execute(query);

    const usersResponse = paginatedResult.getData().map(toUserResponse);

    return toPaginatedResponse<UserResponseDto>({
      data: usersResponse,
      page: paginatedResult.getPage(),
      limit: paginatedResult.getLimit(),
      total: paginatedResult.getTotal(),
    });
  }

  @Patch('/profile')
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async updateProfile(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<void> {
    await this.updateUserProfileUseCase.execute(currentUser.getId(), {
      name: dto.name,
      email: dto.email,
    });
  }

  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  @Patch('/password')
  async updatePassword(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.updateUserPasswordUseCase.execute(
      currentUser.getId(),
      dto.password,
    );
  }

  @UseAuth(ROLE.ADMINISTRADOR)
  @Patch('/:id/activate')
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.activateUserUseCase.execute(id);
  }

  @UseAuth(ROLE.ADMINISTRADOR)
  @Patch('/:id/deactivate')
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deactivateUserUseCase.execute(id);
  }
}
