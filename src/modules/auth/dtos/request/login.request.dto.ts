import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electronico del usuario',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  declare readonly email: string;

  @ApiProperty({
    example: 'SecureP@ssw0rd',
    description: 'Contrasena del usuario',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : value,
  )
  declare readonly password: string;
}
