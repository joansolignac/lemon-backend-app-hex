import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID unico del cliente',
  })
  declare readonly id: string;

  @ApiProperty({
    example: 'JUAN PEREZ',
    description: 'Nombre del cliente',
  })
  declare readonly name: string;

  @ApiProperty({
    example: 'DNI',
    description: 'Tipo de documento',
    enum: ['DNI', 'RUC'],
  })
  declare readonly typeDocument: string;

  @ApiProperty({
    example: '12345678',
    description: 'Numero de documento',
  })
  declare readonly numDocument: string;

  @ApiProperty({
    example: '987654321',
    description: 'Telefono del cliente',
  })
  declare readonly phone: string;

  @ApiPropertyOptional({
    example: 'juan@example.com',
    description: 'Correo electronico del cliente',
  })
  declare readonly email: string | null;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Direccion del cliente',
  })
  declare readonly address: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Estado del cliente',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  declare readonly status: string;

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
