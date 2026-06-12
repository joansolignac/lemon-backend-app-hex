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
import { Role } from '@prisma/client';
import { UseAuth } from '../auth/decorators/use-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginatedQueryDto } from '../../common/dtos/paginated-query.dto';
import type { AuthCurrentUser } from '../../common/interfaces/auth-current-user.interface';
import { CreateSaleRequestDto } from './dtos/request/create-sale.request.dto';
import { UpdateSaleRequestDto } from './dtos/request/update-sale.request.dto';
import { SaleResponseDto } from './dtos/response/sale.response.dto';
import { CreateSaleFeature } from './features/create-sale.feature';
import { FindSaleByIdFeature } from './features/find-sale-by-id.feature';
import { GetAllSalesPaginatedFeature } from './features/get-all-sales-paginated.feature';
import { FindSalesByCustomerFeature } from './features/find-sales-by-customer.feature';
import { FindSalesBySellerFeature } from './features/find-sales-by-seller.feature';
import { FindPendingSalesFeature } from './features/find-pending-sales.feature';
import { UpdateSaleFeature } from './features/update-sale.feature';
import { MarkSaleAsPaidFeature } from './features/mark-sale-as-paid.feature';

@ApiTags('Sales')
@UseAuth(Role.ADMINISTRADOR, Role.SUPERVISOR)
@Controller('sales')
export class SalesController {
  constructor(
    private readonly createSale: CreateSaleFeature,
    private readonly findSaleById: FindSaleByIdFeature,
    private readonly getAllSalesPaginated: GetAllSalesPaginatedFeature,
    private readonly findSalesByCustomer: FindSalesByCustomerFeature,
    private readonly findSalesBySeller: FindSalesBySellerFeature,
    private readonly findPendingSales: FindPendingSalesFeature,
    private readonly updateSale: UpdateSaleFeature,
    private readonly markSaleAsPaid: MarkSaleAsPaidFeature,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiBody({ type: CreateSaleRequestDto })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Cliente o vendedor no encontrado' })
  @ApiResponse({ status: 409, description: 'Vendedor inactivo' })
  async create(
    @CurrentUser() currentUser: AuthCurrentUser,
    @Body() dto: CreateSaleRequestDto,
  ): Promise<void> {
    await this.createSale.execute({
      customerId: dto.customerId,
      sellerId: currentUser.id,
      kilograms: dto.kilograms,
      pricePerKilogram: dto.pricePerKilogram,
    });
  }

  @Get('/pending')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar ventas pendientes de pago' })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({ status: 200, description: 'Lista de ventas pendientes' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findPending(@Query() query: PaginatedQueryDto) {
    return this.findPendingSales.execute(query.page, query.limit);
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
  @ApiResponse({ status: 200, description: 'Lista de ventas del cliente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findByCustomer(
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Query() query: PaginatedQueryDto,
  ) {
    return this.findSalesByCustomer.execute(
      customerId,
      query.page,
      query.limit,
    );
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
  @ApiResponse({ status: 200, description: 'Lista de ventas del vendedor' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findBySeller(
    @Param('sellerId', ParseUUIDPipe) sellerId: string,
    @Query() query: PaginatedQueryDto,
  ) {
    return this.findSalesBySeller.execute(sellerId, query.page, query.limit);
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
    return this.findSaleById.execute(id);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas las ventas paginadas' })
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({ status: 200, description: 'Lista de ventas' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async getAllPaginated(@Query() query: PaginatedQueryDto) {
    return this.getAllSalesPaginated.execute(query.page, query.limit);
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
  @ApiBody({ type: UpdateSaleRequestDto })
  @ApiResponse({ status: 204, description: 'Venta actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSaleRequestDto,
  ): Promise<void> {
    await this.updateSale.execute(id, {
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
    await this.markSaleAsPaid.execute(id);
  }
}
