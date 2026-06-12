import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordRequestDto {
  @ApiProperty({
    example: 'NewSecureP@ssw0rd',
    description: 'Nueva contrasena del usuario',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  declare readonly password: string;
}
