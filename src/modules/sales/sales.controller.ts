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
  ApiBody,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { UseAuth } from '../auth/decorators/use-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthCurrentUser } from '../../common/interfaces/auth-current-user.interface';
import { ListSalesQueryDto } from './dtos/request/list-sales.query.dto';
import { CreateSaleRequestDto } from './dtos/request/create-sale.request.dto';
import { UpdateSaleRequestDto } from './dtos/request/update-sale.request.dto';
import { SalePaginatedResponseDto } from './dtos/response/sale-paginated.response.dto';
import { CreateSaleFeature } from './features/create-sale.feature';
import { FindSalesFeature } from './features/find-sales.feature';
import { UpdateSaleFeature } from './features/update-sale.feature';
import { MarkSaleAsPaidFeature } from './features/mark-sale-as-paid.feature';

@ApiTags('Sales')
@UseAuth(Role.ADMINISTRADOR, Role.SUPERVISOR)
@Controller('sales')
export class SalesController {
  constructor(
    private readonly createSale: CreateSaleFeature,
    private readonly findSales: FindSalesFeature,
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

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar ventas',
    description:
      'Lista ventas con filtros opcionales. Filtros de fecha mutuamente excluyentes: date | startDate+endDate | month+year | year.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de ventas paginada',
    type: SalePaginatedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async findAll(
    @Query() query: ListSalesQueryDto,
  ): Promise<SalePaginatedResponseDto> {
    return this.findSales.execute({
      search: query.search,
      status: query.status,
      date: query.date,
      startDate: query.startDate,
      endDate: query.endDate,
      month: query.month,
      year: query.year,
      page: query.page,
      limit: query.limit,
    });
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
