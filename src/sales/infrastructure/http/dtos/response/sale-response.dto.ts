import { ApiProperty } from '@nestjs/swagger';

export class SaleResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID unico de la venta',
  })
  declare readonly id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'ID del cliente',
  })
  declare readonly customerId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'ID del vendedor',
  })
  declare readonly sellerId: string;

  @ApiProperty({
    example: 15.5,
    description: 'Kilogramos vendidos',
  })
  declare readonly kilograms: number;

  @ApiProperty({
    example: 3.5,
    description: 'Precio por kilogramo',
  })
  declare readonly pricePerKilogram: number;

  @ApiProperty({
    example: 54.25,
    description: 'Monto total',
  })
  declare readonly totalAmount: number;

  @ApiProperty({
    example: 'PENDIENTE',
    description: 'Estado de pago',
    enum: ['PAGADO', 'PENDIENTE'],
  })
  declare readonly paymentStatus: string;

  @ApiProperty({
    example: '2025-01-15T10:30:00.000Z',
    description: 'Fecha de creacion',
  })
  declare readonly createdAt: string;

  @ApiProperty({
    example: '2025-05-10T14:22:00.000Z',
    description: 'Fecha de ultima actualizacion',
  })
  declare readonly updatedAt: string;
}
