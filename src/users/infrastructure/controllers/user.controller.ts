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
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { toUserResponse } from '../mappers/user-response.mapper';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id.use.case';
import { PaginatedQueryDto } from '../../../shared/infrastructure/dtos/request/paginated-query.dto';
import { PaginatedResponseDto } from '../../../shared/infrastructure/dtos/response/paginated-response.dto';
import { GetAllUsersPaginatedUseCase } from '../../application/use-cases/get-all-users-paginated.use-case';
import { toPaginatedResponse } from '../../../shared/infrastructure/mappers/paginated-response.mapper';
import { UpdateUserProfileDto } from '../dtos/request/update-user-profile.dto';
import { UpdateUserProfileUseCase } from '../../application/use-cases/update-user-profile.use-case';
import { UpdateUserPasswordDto } from '../dtos/request/update-user-password.dto';
import { UpdateUserPasswordUseCase } from '../../application/use-cases/update-user-password.use-case';
import { ActivateUserUseCase } from '../../application/use-cases/activate-user.use-case';
import { DeactivateUserUseCase } from '../../application/use-cases/deactivate-user.use-case';

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
  async create(@Body() dto: UserCreateDto): Promise<void> {
    await this.createUserUseCase.execute({
      role: dto.role,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.findUserByIdUseCase.execute(id);
    return toUserResponse(user);
  }

  @Get()
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

  @Patch('/:id')
  async updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserProfileDto,
  ): Promise<void> {
    await this.updateUserProfileUseCase.execute(id, {
      name: dto.name,
      email: dto.email,
    });
  }

  @Patch('/:id/password')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.updateUserPasswordUseCase.execute(id, dto.password);
  }

  @Patch('/:id/activate')
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.activateUserUseCase.execute(id);
  }

  @Patch('/:id/deactivate')
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deactivateUserUseCase.execute(id);
  }
}
