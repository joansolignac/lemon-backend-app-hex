import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare readonly id: string;

  @ApiProperty({ example: 'JUAN PEREZ' })
  declare readonly name: string;

  @ApiProperty({ example: 'DNI', enum: ['DNI', 'RUC'] })
  declare readonly typeDocument: string;

  @ApiProperty({ example: '12345678' })
  declare readonly numDocument: string;

  @ApiProperty({ example: '987654321' })
  declare readonly phone: string;

  @ApiPropertyOptional({ example: 'juan@example.com' })
  declare readonly email: string | null;

  @ApiProperty({ example: 'Av. Siempre Viva 123' })
  declare readonly address: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE'] })
  declare readonly status: string;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  declare readonly createdAt: string;

  @ApiProperty({ example: '2025-05-10T14:22:00.000Z' })
  declare readonly updatedAt: string;
}
