import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID unico del usuario',
  })
  declare readonly id: string;

  @ApiProperty({
    example: 'ADMINISTRADOR',
    description: 'Rol del usuario',
    enum: ['ADMINISTRADOR', 'SUPERVISOR'],
  })
  declare readonly role: string;

  @ApiProperty({
    example: 'JUAN PEREZ',
    description: 'Nombre del usuario',
  })
  declare readonly name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electronico del usuario',
  })
  declare readonly email: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Estado del usuario',
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
