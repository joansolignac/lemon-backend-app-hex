import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare readonly id: string;

  @ApiProperty({
    example: 'ADMINISTRADOR',
    enum: ['ADMINISTRADOR', 'SUPERVISOR'],
  })
  declare readonly role: string;

  @ApiProperty({ example: 'JUAN PEREZ' })
  declare readonly name: string;

  @ApiProperty({ example: 'juan@example.com' })
  declare readonly email: string;

  @ApiProperty({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE'] })
  declare readonly status: string;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  declare readonly createdAt: string;

  @ApiProperty({ example: '2025-05-10T14:22:00.000Z' })
  declare readonly updatedAt: string;
}
