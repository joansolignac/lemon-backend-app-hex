import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { UseAuth } from '../auth/decorators/use-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthCurrentUser } from '../../common/interfaces/auth-current-user.interface';
import { MetricsQueryDto } from './dtos/request/metrics-query.dto';
import { AdminMetricsQueryDto } from './dtos/request/admin-metrics-query.dto';
import { MetricsSummaryResponseDto } from './dtos/response/metrics-summary.response.dto';
import { AdminMetricsSummaryResponseDto } from './dtos/response/admin-metrics-summary.response.dto';
import { GetSupervisorMetricsSummaryFeature } from './features/get-supervisor-metrics-summary.feature';
import { GetAdminMetricsSummaryFeature } from './features/get-admin-metrics-summary.feature';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly getSupervisorMetricsSummary: GetSupervisorMetricsSummaryFeature,
    private readonly getAdminMetricsSummary: GetAdminMetricsSummaryFeature,
  ) {}

  @Get('summary')
  @UseAuth(Role.ADMINISTRADOR, Role.SUPERVISOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Resumen de métricas del supervisor',
    description:
      'Retorna totales de ventas, kilogramos y top clientes filtrados a las ventas del usuario autenticado. Filtros de fecha: date | startDate+endDate | month+year | year.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumen de métricas del supervisor',
    type: MetricsSummaryResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos' })
  async supervisorSummary(
    @CurrentUser() currentUser: AuthCurrentUser,
    @Query() query: MetricsQueryDto,
  ): Promise<MetricsSummaryResponseDto> {
    return this.getSupervisorMetricsSummary.execute(currentUser.id, query);
  }

  @Get('admin/summary')
  @UseAuth(Role.ADMINISTRADOR)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Resumen de métricas global (solo administrador)',
    description:
      'Retorna totales globales, top clientes y top vendedores. Los parámetros top y topSellers controlan cuántos registros mostrar (3, 4 o 5). Filtros de fecha: date | startDate+endDate | month+year | year.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumen global de métricas',
    type: AdminMetricsSummaryResponseDto,
  })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permisos' })
  async adminSummary(
    @Query() query: AdminMetricsQueryDto,
  ): Promise<AdminMetricsSummaryResponseDto> {
    return this.getAdminMetricsSummary.execute(query);
  }
}
