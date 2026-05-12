import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
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

@ApiTags('Users')
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
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
  @ApiResponse({ status: 409, description: 'El email ya existe' })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @UseAuth(ROLE.ADMINISTRADOR)
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.findUserByIdUseCase.execute(id);
    return toUserResponse(user);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar usuarios paginados' })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: PaginatedResponseDto<UserResponseDto>,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar perfil del usuario autenticado' })
  @ApiBody({ type: UpdateUserProfileDto })
  @ApiResponse({ status: 204, description: 'Perfil actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
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

  @Patch('/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar contrasena del usuario autenticado' })
  @ApiBody({ type: UpdateUserPasswordDto })
  @ApiResponse({
    status: 204,
    description: 'Contrasena actualizada exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async updatePassword(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.updateUserPasswordUseCase.execute(
      currentUser.getId(),
      dto.password,
    );
  }

  @Patch('/:id/activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Activar un usuario' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del usuario',
  })
  @ApiResponse({ status: 204, description: 'Usuario activado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 409, description: 'El usuario ya esta activo' })
  @UseAuth(ROLE.ADMINISTRADOR)
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.activateUserUseCase.execute(id);
  }

  @Patch('/:id/deactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Desactivar un usuario' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del usuario',
  })
  @ApiResponse({ status: 204, description: 'Usuario desactivado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos suficientes' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 409, description: 'El usuario ya esta inactivo' })
  @UseAuth(ROLE.ADMINISTRADOR)
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deactivateUserUseCase.execute(id);
  }
}
