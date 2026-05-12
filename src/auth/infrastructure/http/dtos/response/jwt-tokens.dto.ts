import { ApiProperty } from '@nestjs/swagger';

export class JwtTokensDto {
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
}
