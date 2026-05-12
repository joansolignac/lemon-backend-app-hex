import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerCreateDto {
  @ApiProperty({
    example: 'JUAN PEREZ',
    description: 'Nombre completo del cliente',
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
    example: 'DNI',
    description: 'Tipo de documento',
    enum: ['DNI', 'RUC'],
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly typeDocument: string;

  @ApiProperty({
    example: '12345678',
    description: 'Numero de documento del cliente',
  })
  @IsString()
  @IsNotEmpty()
  declare readonly numDocument: string;

  @ApiProperty({
    example: '987654321',
    description: 'Telefono del cliente',
  })
  @IsString()
  @IsNotEmpty()
  declare readonly phone: string;

  @ApiPropertyOptional({
    example: 'juan@example.com',
    description: 'Correo electronico del cliente',
  })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string | null =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email: string | null;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Direccion del cliente',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  declare readonly address: string;
}
