import { ApiProperty } from '@nestjs/swagger';
import { MetricsSummaryResponseDto } from './metrics-summary.response.dto';

export class MetricsTopSellerDto {
  @ApiProperty({ example: 'Carlos Ríos', description: 'Nombre del vendedor' })
  declare readonly sellerName: string;

  @ApiProperty({ example: 34, description: 'Cantidad de ventas realizadas' })
  declare readonly totalSales: number;

  @ApiProperty({ example: 510.0, description: 'Kilogramos totales vendidos' })
  declare readonly totalKilograms: number;

  @ApiProperty({ example: 1785.0, description: 'Monto total vendido (S/)' })
  declare readonly totalAmount: number;
}

export class AdminMetricsSummaryResponseDto extends MetricsSummaryResponseDto {
  @ApiProperty({
    type: [MetricsTopSellerDto],
    description: 'Top vendedores por monto',
  })
  declare readonly topSellers: MetricsTopSellerDto[];
}
