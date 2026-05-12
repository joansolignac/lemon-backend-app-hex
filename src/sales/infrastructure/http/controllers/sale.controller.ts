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
import { SaleCreateDto } from '../dtos/request/sale-create.dto';
import { CreateSaleUseCase } from '../../../application/use-cases/create-sale.use-case';
import { SaleResponseDto } from '../dtos/response/sale-response.dto';
import { toSaleResponse } from '../../mappers/sale-response.mapper';
import { FindSaleByIdUseCase } from '../../../application/use-cases/find-sale-by-id.use-case';
import { PaginatedQueryDto } from '../../../../shared/infrastructure/dtos/request/paginated-query.dto';
import { PaginatedResponseDto } from '../../../../shared/infrastructure/dtos/response/paginated-response.dto';
import { FindSalesByCustomerUseCase } from '../../../application/use-cases/find-sales-by-customer.use-case';
import { FindSalesBySellerUseCase } from '../../../application/use-cases/find-sales-by-seller.use-case';
import { FindPendingSalesUseCase } from '../../../application/use-cases/find-pending-sales.use-case';
import { GetAllSalesPaginatedUseCase } from '../../../application/use-cases/get-all-sales-paginated.use-case';
import { toPaginatedResponse } from '../../../../shared/infrastructure/mappers/paginated-response.mapper';
import { SaleUpdateDto } from '../dtos/request/sale-update.dto';
import { UpdateSaleUseCase } from '../../../application/use-cases/update-sale.use-case';
import { MarkSaleAsPaidUseCase } from '../../../application/use-cases/mark-sale-as-paid.use-case';
import { UseAuth } from '../../../../shared/infrastructure/security/auth/decorators/use-auth.decorator';
import { ROLE } from '../../../../users/domain/value-objects/user-rol.value-object';
import { CurrentUser } from '../../../../shared/infrastructure/security/auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../../shared/domain/value-objects/authenticated-user.value-object';

@ApiTags('Sales')
@UseAuth(ROLE.ADMINISTRADOR, ROLE.SUPERVISOR)
@Controller('sales')
export class SaleController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly findSaleByIdUseCase: FindSaleByIdUseCase,
    private readonly findSalesByCustomerUseCase: FindSalesByCustomerUseCase,
    private readonly findSalesBySellerUseCase: FindSalesBySellerUseCase,
    private readonly findPendingSalesUseCase: FindPendingSalesUseCase,
    private readonly getAllSalesPaginatedUseCase: GetAllSalesPaginatedUseCase,
    private readonly updateSaleUseCase: UpdateSaleUseCase,
    private readonly markSaleAsPaidUseCase: MarkSaleAsPaidUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiBody({ type: SaleCreateDto })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente o vendedor no encontrado' })
  @ApiResponse({ status: 409, description: 'Vendedor inactivo' })
  async create(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() dto: SaleCreateDto,
  ): Promise<void> {
    await this.createSaleUseCase.execute({
      customerId: dto.customerId,
      sellerId: currentUser.getId(),
      kilograms: dto.kilograms,
      pricePerKilogram: dto.pricePerKilogram,
    });
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas las ventas paginadas' })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'Lista de ventas',
    type: PaginatedResponseDto<SaleResponseDto>,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async getAllPaginated(
    @Query() query: PaginatedQueryDto,
  ): Promise<PaginatedResponseDto<SaleResponseDto>> {
    const paginatedResult =
      await this.getAllSalesPaginatedUseCase.execute(query);

    const salesResponse = paginatedResult.getData().map(toSaleResponse);

    return toPaginatedResponse<SaleResponseDto>({
      data: salesResponse,
      page: paginatedResult.getPage(),
      limit: paginatedResult.getLimit(),
      total: paginatedResult.getTotal(),
    });
  }

  @Get('/pending')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar ventas pendientes de pago' })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'Lista de ventas pendientes',
    type: PaginatedResponseDto<SaleResponseDto>,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findPending(
    @Query() query: PaginatedQueryDto,
  ): Promise<PaginatedResponseDto<SaleResponseDto>> {
    const paginatedResult = await this.findPendingSalesUseCase.execute(query);

    const salesResponse = paginatedResult.getData().map(toSaleResponse);

    return toPaginatedResponse<SaleResponseDto>({
      data: salesResponse,
      page: paginatedResult.getPage(),
      limit: paginatedResult.getLimit(),
      total: paginatedResult.getTotal(),
    });
  }

  @Get('/customer/:customerId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar ventas por cliente' })
  @ApiParam({
    name: 'customerId',
    type: 'string',
    format: 'uuid',
    description: 'UUID del cliente',
  })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'Lista de ventas del cliente',
    type: PaginatedResponseDto<SaleResponseDto>,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findByCustomer(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<PaginatedResponseDto<SaleResponseDto>> {
    const paginatedResult = await this.findSalesByCustomerUseCase.execute(
      customerId,
      query,
    );

    const salesResponse = paginatedResult.getData().map(toSaleResponse);

    return toPaginatedResponse<SaleResponseDto>({
      data: salesResponse,
      page: paginatedResult.getPage(),
      limit: paginatedResult.getLimit(),
      total: paginatedResult.getTotal(),
    });
  }

  @Get('/seller/:sellerId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar ventas por vendedor' })
  @ApiParam({
    name: 'sellerId',
    type: 'string',
    format: 'uuid',
    description: 'UUID del vendedor',
  })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'Lista de ventas del vendedor',
    type: PaginatedResponseDto<SaleResponseDto>,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findBySeller(
    @Param('sellerId', ParseUUIDPipe) sellerId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<PaginatedResponseDto<SaleResponseDto>> {
    const paginatedResult = await this.findSalesBySellerUseCase.execute(
      sellerId,
      query,
    );

    const salesResponse = paginatedResult.getData().map(toSaleResponse);

    return toPaginatedResponse<SaleResponseDto>({
      data: salesResponse,
      page: paginatedResult.getPage(),
      limit: paginatedResult.getLimit(),
      total: paginatedResult.getTotal(),
    });
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener venta por ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID de la venta',
  })
  @ApiResponse({
    status: 200,
    description: 'Venta encontrada',
    type: SaleResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SaleResponseDto> {
    const sale = await this.findSaleByIdUseCase.execute(id);
    return toSaleResponse(sale);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar venta' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID de la venta',
  })
  @ApiBody({ type: SaleUpdateDto })
  @ApiResponse({ status: 204, description: 'Venta actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SaleUpdateDto,
  ): Promise<void> {
    await this.updateSaleUseCase.execute(id, {
      kilograms: dto.kilograms,
      pricePerKilogram: dto.pricePerKilogram,
      paymentStatus: dto.paymentStatus,
    });
  }

  @Patch('/:id/pay')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar venta como pagada' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'UUID de la venta',
  })
  @ApiResponse({ status: 204, description: 'Venta marcada como pagada' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  @ApiResponse({ status: 409, description: 'La venta ya esta pagada' })
  async markAsPaid(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.markSaleAsPaidUseCase.execute(id);
  }
}
