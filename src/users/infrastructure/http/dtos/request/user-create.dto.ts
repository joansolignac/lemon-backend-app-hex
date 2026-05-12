import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    example: 'ADMINISTRADOR',
    description: 'Rol del usuario',
    enum: ['ADMINISTRADOR', 'SUPERVISOR'],
  })
  @IsString()
  @IsNotEmpty()
  declare readonly role: string;

  @ApiProperty({
    example: 'JUAN PEREZ',
    description: 'Nombre completo del usuario',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly name: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electronico del usuario',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email: string;

  @ApiProperty({
    example: 'SecureP@ssw0rd',
    description: 'Contrasena del usuario',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  declare readonly password: string;
}
