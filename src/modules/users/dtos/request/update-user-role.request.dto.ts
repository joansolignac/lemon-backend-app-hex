import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserRoleRequestDto {
  @ApiProperty({
    example: 'SUPERVISOR',
    description: 'Nuevo rol del usuario',
    enum: Role,
  })
  @IsEnum(Role)
  declare readonly role: Role;
}
