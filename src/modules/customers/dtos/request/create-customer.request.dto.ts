import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeDocument } from '@prisma/client';

export class CreateCustomerRequestDto {
  @ApiProperty({ example: 'JUAN PEREZ', maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly name: string;

  @ApiProperty({ example: 'DNI', enum: TypeDocument })
  @IsEnum(TypeDocument)
  declare readonly typeDocument: TypeDocument;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  declare readonly numDocument: string;

  @ApiProperty({ example: '987654321' })
  @IsString()
  @IsNotEmpty()
  declare readonly phone: string;

  @ApiPropertyOptional({ example: 'juan@example.com' })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string | null =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email: string | null;

  @ApiProperty({ example: 'Av. Siempre Viva 123', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  declare readonly address: string;
}
