import { ApiProperty } from '@nestjs/swagger';

export class MetricsTopCustomerDto {
  @ApiProperty({ example: 'María López', description: 'Nombre del cliente' })
  declare readonly customerName: string;

  @ApiProperty({ example: '12345678', description: 'Número de documento' })
  declare readonly numDocument: string;

  @ApiProperty({ example: 18, description: 'Cantidad de ventas' })
  declare readonly totalSales: number;

  @ApiProperty({ example: 270.5, description: 'Kilogramos totales pedidos' })
  declare readonly totalKilograms: number;

  @ApiProperty({ example: 945.0, description: 'Monto total (S/)' })
  declare readonly totalAmount: number;
}

export class MetricsSummaryResponseDto {
  @ApiProperty({ example: 120, description: 'Cantidad total de ventas' })
  declare readonly totalSales: number;

  @ApiProperty({
    example: 1350.5,
    description: 'Kilogramos totales de limón vendidos',
  })
  declare readonly totalKilograms: number;

  @ApiProperty({ example: 4500.75, description: 'Monto total de ventas (S/)' })
  declare readonly totalAmount: number;

  @ApiProperty({
    type: [MetricsTopCustomerDto],
    description: 'Top clientes por monto',
  })
  declare readonly topCustomers: MetricsTopCustomerDto[];
}
