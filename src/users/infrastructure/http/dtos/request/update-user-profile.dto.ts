import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toUpperCase() : value,
  )
  declare readonly name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  declare readonly email?: string;
}
