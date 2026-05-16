import { ApiProperty } from '@nestjs/swagger';

class SessionUserDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID unico del usuario',
  })
  declare readonly id: string;

  @ApiProperty({
    example: 'JUAN PEREZ',
    description: 'Nombre completo del usuario',
  })
  declare readonly fullName: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electronico del usuario',
  })
  declare readonly email: string;

  @ApiProperty({
    example: 'ADMINISTRADOR',
    description: 'Rol del usuario',
    enum: ['ADMINISTRADOR', 'SUPERVISOR'],
  })
  declare readonly role: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario esta activo',
  })
  declare readonly isActive: boolean;
}

export class AuthenticatedSessionDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT de acceso',
  })
  declare readonly accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT de refresh',
  })
  declare readonly refreshToken: string;

  @ApiProperty({
    type: SessionUserDto,
    description: 'Informacion del usuario autenticado',
  })
  declare readonly user: SessionUserDto;
}
