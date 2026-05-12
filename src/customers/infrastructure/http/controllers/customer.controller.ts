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
import { CustomerCreateDto } from '../dtos/request/customer-create.dto';
import { CreateCustomerUseCase } from '../../../application/use-cases/create-customer.use-case';
import { CustomerResponseDto } from '../dtos/response/customer-response.dto';
import { toCustomerResponse } from '../../mappers/customer-response.mapper';
import { FindCustomerByIdUseCase } from '../../../application/use-cases/find-customer-by-id.use-case';
import { PaginatedQueryDto } from '../../../../shared/infrastructure/dtos/request/paginated-query.dto';
import { PaginatedResponseDto } from '../../../../shared/infrastructure/dtos/response/paginated-response.dto';
import { GetAllCustomersPaginatedUseCase } from '../../../application/use-cases/get-all-customers-paginated.use-case';
import { toPaginatedResponse } from '../../../../shared/infrastructure/mappers/paginated-response.mapper';
import { CustomerUpdateDto } from '../dtos/request/customer-update.dto';
import { UpdateCustomerUseCase } from '../../../application/use-cases/update-customer.use-case';
import { ActivateCustomerUseCase } from '../../../application/use-cases/activate-customer.use-case';
import { DeactivateCustomerUseCase } from '../../../application/use-cases/deactivate-customer.use-case';
import { FindCustomerByNumDocumentUseCase } from '../../../application/use-cases/find-customer-by-num-document.use-case';
import { UseAuth } from '../../../../shared/infrastructure/security/auth/decorators/use-auth.decorator';
import { ROLE } from '../../../../users/domain/value-objects/user-rol.value-object';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase,
    private readonly findCustomerByNumDocumentUseCase: FindCustomerByNumDocumentUseCase,
    private readonly getAllCustomersPaginatedUseCase: GetAllCustomersPaginatedUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly activateCustomerUseCase: ActivateCustomerUseCase,
    private readonly deactivateCustomerUseCase: DeactivateCustomerUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiBody({ type: CustomerCreateDto })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 409, description: 'El cliente ya existe' })
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async create(@Body() dto: CustomerCreateDto): Promise<void> {
    await this.createCustomerUseCase.execute({
      name: dto.name,
      typeDocument: dto.typeDocument,
      numDocument: dto.numDocument,
      phone: dto.phone,
      email: dto.email,
      address: dto.address,
    });
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerResponseDto> {
    const customer = await this.findCustomerByIdUseCase.execute(id);
    return toCustomerResponse(customer);
  }

  @Get('/document/:numDocument')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener cliente por numero de documento' })
  @ApiParam({
    name: 'numDocument',
    type: 'string',
    description: 'Numero de documento del cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async findByNumDocument(
    @Param('numDocument') numDocument: string,
  ): Promise<CustomerResponseDto | undefined> {
    const customer =
      await this.findCustomerByNumDocumentUseCase.execute(numDocument);
    return customer ? toCustomerResponse(customer) : undefined;
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar clientes paginados' })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: PaginatedResponseDto<CustomerResponseDto>,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async getAllPaginated(
    @Query() query: PaginatedQueryDto,
  ): Promise<PaginatedResponseDto<CustomerResponseDto>> {
    const paginatedResult =
      await this.getAllCustomersPaginatedUseCase.execute(query);

    const customersResponse = paginatedResult.getData().map(toCustomerResponse);

    return toPaginatedResponse<CustomerResponseDto>({
      data: customersResponse,
      page: paginatedResult.getPage(),
      limit: paginatedResult.getLimit(),
      total: paginatedResult.getTotal(),
    });
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar cliente' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del cliente',
  })
  @ApiBody({ type: CustomerUpdateDto })
  @ApiResponse({ status: 204, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 409, description: 'El cliente ya existe' })
  @UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CustomerUpdateDto,
  ): Promise<void> {
    await this.updateCustomerUseCase.execute(id, {
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      address: dto.address,
    });
  }

  @Patch('/:id/activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Activar un cliente' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del cliente',
  })
  @ApiResponse({ status: 204, description: 'Cliente activado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 409, description: 'El cliente ya esta activo' })
  @UseAuth(ROLE.ADMINISTRADOR)
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.activateCustomerUseCase.execute(id);
  }

  @Patch('/:id/deactivate')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Desactivar un cliente' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID del cliente',
  })
  @ApiResponse({ status: 204, description: 'Cliente desactivado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 409, description: 'El cliente ya esta inactivo' })
  @UseAuth(ROLE.ADMINISTRADOR)
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deactivateCustomerUseCase.execute(id);
  }
}
