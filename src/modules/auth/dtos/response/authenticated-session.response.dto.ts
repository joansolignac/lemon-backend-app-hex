import { ApiProperty } from '@nestjs/swagger';

class SessionUserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  declare readonly id: string;

  @ApiProperty({ example: 'JUAN PEREZ' })
  declare readonly fullName: string;

  @ApiProperty({ example: 'juan@example.com' })
  declare readonly email: string;

  @ApiProperty({
    example: 'ADMINISTRADOR',
    enum: ['ADMINISTRADOR', 'SUPERVISOR'],
  })
  declare readonly role: string;

  @ApiProperty({ example: true })
  declare readonly isActive: boolean;
}

export class AuthenticatedSessionResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  declare readonly accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  declare readonly refreshToken: string;

  @ApiProperty({ type: SessionUserResponseDto })
  declare readonly user: SessionUserResponseDto;
}
