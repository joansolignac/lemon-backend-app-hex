import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserProfileRequestDto {
  @ApiPropertyOptional({
    example: 'JUAN PEREZ ACTUALIZADO',
    description: 'Nombre completo del usuario',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly name?: string;

  @ApiPropertyOptional({
    example: 'juan.nuevo@example.com',
    description: 'Correo electronico del usuario',
  })
  @IsOptional()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email?: string;
}
