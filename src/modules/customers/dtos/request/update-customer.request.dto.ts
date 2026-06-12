import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerRequestDto {
  @ApiPropertyOptional({ example: 'JUAN PEREZ', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly name?: string;

  @ApiPropertyOptional({ example: '987654321' })
  @IsOptional()
  @IsString()
  declare readonly phone?: string;

  @ApiPropertyOptional({ example: 'juan@example.com' })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string | null =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email?: string | null;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 123', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  declare readonly address?: string;
}
